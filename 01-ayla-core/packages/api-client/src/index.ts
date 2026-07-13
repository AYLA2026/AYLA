// ============================================================
// AYLA API CLIENT
// HTTP Client موحد لكل منصات Ayla
// ============================================================

import type { ApiResponse, ApiError } from '@ayla/types';

// ============================================================
// إعدادات الـ API
// ============================================================
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

const DEFAULT_API_CONFIG: ApiClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

let apiConfig: ApiClientConfig = { ...DEFAULT_API_CONFIG };

export function configureApi(config: Partial<ApiClientConfig>): void {
  apiConfig = { ...apiConfig, ...config };
}

// ============================================================
// أنواع الطلبات
// ============================================================
export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
}

export interface RequestInterceptor {
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onResponse?: <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;
  onError?: (error: ApiError) => ApiError | Promise<ApiError>;
}

// ============================================================
// Interceptors
// ============================================================
const requestInterceptors: RequestInterceptor[] = [];

export function addInterceptor(interceptor: RequestInterceptor): () => void {
  requestInterceptors.push(interceptor);
  return () => {
    const index = requestInterceptors.indexOf(interceptor);
    if (index > -1) requestInterceptors.splice(index, 1);
  };
}

// ============================================================
// بناء الـ URL
// ============================================================
function buildURL(url: string, params?: Record<string, string | number | boolean | undefined>): string {
  const fullURL = url.startsWith('http') ? url : `${apiConfig.baseURL}${url}`;

  if (!params) return fullURL;

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `${fullURL}?${queryString}` : fullURL;
}

// ============================================================
// تنفيذ الطلب
// ============================================================
async function executeRequest<T>(config: RequestConfig): Promise<ApiResponse<T>> {
  let requestConfig = { ...config };

  // تطبيق الـ interceptors
  for (const interceptor of requestInterceptors) {
    if (interceptor.onRequest) {
      requestConfig = await interceptor.onRequest(requestConfig);
    }
  }

  const url = buildURL(requestConfig.url, requestConfig.params);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestConfig.timeout || apiConfig.timeout);

  if (requestConfig.signal) {
    requestConfig.signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch(url, {
      method: requestConfig.method || 'GET',
      headers: {
        ...apiConfig.headers,
        ...requestConfig.headers,
      },
      body: requestConfig.data ? JSON.stringify(requestConfig.data) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let data: ApiResponse<T>;
    try {
      data = await response.json();
    } catch {
      data = {
        success: response.ok,
        data: null as unknown as T,
        message: response.statusText,
      };
    }

    if (!response.ok) {
      const error: ApiError = {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: data.message || response.statusText,
        },
      };

      for (const interceptor of requestInterceptors) {
        if (interceptor.onError) {
          await interceptor.onError(error);
        }
      }

      throw new ApiRequestError(
        error.error.message,
        response.status,
        error.error.code
      );
    }

    for (const interceptor of requestInterceptors) {
      if (interceptor.onResponse) {
        data = await interceptor.onResponse(data);
      }
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiRequestError) throw error;

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiRequestError('Request timeout', 408, 'TIMEOUT');
      }
      throw new ApiRequestError(error.message, 0, 'NETWORK_ERROR');
    }

    throw new ApiRequestError('Unknown error', 0, 'UNKNOWN');
  }
}

// ============================================================
// إعادة المحاولة
// ============================================================
async function requestWithRetry<T>(config: RequestConfig): Promise<ApiResponse<T>> {
  const maxRetries = config.retries ?? apiConfig.retries ?? 0;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await executeRequest<T>(config);
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxRetries) {
        const delay = (apiConfig.retryDelay || 1000) * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

// ============================================================
// خطأ الطلب
// ============================================================
export class ApiRequestError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

// ============================================================
// دوال الـ HTTP
// ============================================================
export async function get<T>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<ApiResponse<T>> {
  return requestWithRetry<T>({ url, method: 'GET', ...config });
}

export async function post<T>(url: string, data?: unknown, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<ApiResponse<T>> {
  return requestWithRetry<T>({ url, method: 'POST', data, ...config });
}

export async function put<T>(url: string, data?: unknown, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<ApiResponse<T>> {
  return requestWithRetry<T>({ url, method: 'PUT', data, ...config });
}

export async function patch<T>(url: string, data?: unknown, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<ApiResponse<T>> {
  return requestWithRetry<T>({ url, method: 'PATCH', data, ...config });
}

export async function del<T>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<ApiResponse<T>> {
  return requestWithRetry<T>({ url, method: 'DELETE', ...config });
}

// ============================================================
// Upload Files
// ============================================================
export async function uploadFile<T>(
  url: string,
  file: File,
  fieldName: string = 'file',
  onProgress?: (progress: number) => void,
  config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  formData.append(fieldName, file);

  const fullURL = url.startsWith('http') ? url : `${apiConfig.baseURL}${url}`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          onProgress((event.loaded / event.total) * 100);
        }
      });
    }

    xhr.addEventListener('load', () => {
      try {
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } catch {
        resolve({
          success: xhr.status >= 200 && xhr.status < 300,
          data: xhr.responseText as unknown as T,
        });
      }
    });

    xhr.addEventListener('error', () => {
      reject(new ApiRequestError('Upload failed', 0, 'UPLOAD_ERROR'));
    });

    xhr.open('POST', fullURL);

    const headers = { ...apiConfig.headers, ...config?.headers };
    Object.entries(headers).forEach(([key, value]) => {
      if (key !== 'Content-Type') {
        xhr.setRequestHeader(key, value);
      }
    });

    xhr.send(formData);
  });
}

// ============================================================
// Download Files
// ============================================================
export async function downloadFile(url: string, filename?: string): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(downloadUrl);
}

// ============================================================
// Cancel Token
// ============================================================
export function createCancelToken(): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
}

// ============================================================
// React Query Integration (TanStack Query)
// ============================================================
export function createQueryKey(...parts: (string | number | undefined)[]): string[] {
  return ['ayla', ...parts.filter(Boolean).map(String)];
}

// ============================================================
// تصدير الكل
// ============================================================
export const api = {
  configure: configureApi,
  get,
  post,
  put,
  patch,
  delete: del,
  uploadFile,
  downloadFile,
  addInterceptor,
  createCancelToken,
  createQueryKey,
};

export default api;
