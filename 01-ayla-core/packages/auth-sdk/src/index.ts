// ============================================================
// AYLA AUTH SDK
// مكتبة المصادقة الموحدة لكل منصات Ayla
// ============================================================

import type { User, AuthTokens, LoginCredentials, RegisterData, AuthState } from '@ayla/types';

// ============================================================
// إعدادات المصادقة
// ============================================================
export interface AuthConfig {
  apiUrl: string;
  tokenKey: string;
  refreshTokenKey: string;
  autoRefresh: boolean;
  refreshThreshold: number; // ثواني قبل انتهاء التوكن
}

const DEFAULT_CONFIG: AuthConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  tokenKey: 'ayla_access_token',
  refreshTokenKey: 'ayla_refresh_token',
  autoRefresh: true,
  refreshThreshold: 300, // 5 دقائق
};

let config: AuthConfig = { ...DEFAULT_CONFIG };

export function configureAuth(userConfig: Partial<AuthConfig>): void {
  config = { ...config, ...userConfig };
}

// ============================================================
// التخزين
// ============================================================
class TokenStorage {
  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(config.tokenKey);
  }

  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(config.refreshTokenKey);
  }

  static setTokens(tokens: AuthTokens): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(config.tokenKey, tokens.accessToken);
    localStorage.setItem(config.refreshTokenKey, tokens.refreshToken);
  }

  static clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(config.tokenKey);
    localStorage.removeItem(config.refreshTokenKey);
  }
}

// ============================================================
// API Client للمصادقة
// ============================================================
async function authFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${config.apiUrl}${endpoint}`;
  const token = TokenStorage.getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new AylaAuthError(
      error.code || 'AUTH_ERROR',
      error.message || 'Authentication failed',
      response.status
    );
  }

  return response.json();
}

// ============================================================
// أخطاء المصادقة
// ============================================================
export class AylaAuthError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 401
  ) {
    super(message);
    this.name = 'AylaAuthError';
  }
}

// ============================================================
// دوال المصادقة
// ============================================================
export async function login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
  const response = await authFetch<{ user: User; tokens: AuthTokens }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  TokenStorage.setTokens(response.tokens);
  return response;
}

export async function register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
  const response = await authFetch<{ user: User; tokens: AuthTokens }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  TokenStorage.setTokens(response.tokens);
  return response;
}

export async function logout(): Promise<void> {
  try {
    await authFetch('/auth/logout', { method: 'POST' });
  } finally {
    TokenStorage.clearTokens();
  }
}

export async function refreshToken(): Promise<AuthTokens> {
  const refreshToken = TokenStorage.getRefreshToken();
  if (!refreshToken) {
    throw new AylaAuthError('NO_REFRESH_TOKEN', 'No refresh token available');
  }

  const response = await authFetch<{ tokens: AuthTokens }>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

  TokenStorage.setTokens(response.tokens);
  return response.tokens;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await authFetch<{ user: User }>('/auth/me');
    return response.user;
  } catch {
    return null;
  }
}

export async function forgotPassword(email: string): Promise<void> {
  await authFetch('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await authFetch('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  await authFetch('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ oldPassword, newPassword }),
  });
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  const response = await authFetch<{ user: User }>('/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return response.user;
}

export async function uploadAvatar(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('avatar', file);

  const url = `${config.apiUrl}/auth/avatar`;
  const token = TokenStorage.getAccessToken();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new AylaAuthError('UPLOAD_ERROR', 'Failed to upload avatar');
  }

  return response.json();
}

// ============================================================
// التحقق من التوكن
// ============================================================
export function getToken(): string | null {
  return TokenStorage.getAccessToken();
}

export function isAuthenticated(): boolean {
  return !!TokenStorage.getAccessToken();
}

export function hasRole(role: string): boolean {
  // TODO: Implement role checking from token payload
  return false;
}

// ============================================================
// فك تشفير JWT (بدون التحقق من التوقيع)
// ============================================================
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split('.')[1];
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  return Date.now() >= (decoded.exp as number) * 1000;
}

export function getTokenExpiry(token: string): number {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return 0;
  return (decoded.exp as number) * 1000 - Date.now();
}

// ============================================================
// التحديث التلقائي
// ============================================================
let refreshInterval: ReturnType<typeof setInterval> | null = null;

export function startAutoRefresh(): void {
  if (!config.autoRefresh) return;
  if (refreshInterval) return;

  refreshInterval = setInterval(async () => {
    const token = TokenStorage.getAccessToken();
    if (!token) return;

    const expiry = getTokenExpiry(token);
    if (expiry > 0 && expiry < config.refreshThreshold * 1000) {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Auto refresh failed:', error);
        TokenStorage.clearTokens();
      }
    }
  }, 60000); // كل دقيقة
}

export function stopAutoRefresh(): void {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
}

// ============================================================
// React Hook (للاستخدام في المنصات)
// ============================================================
export function useAuth() {
  // هذا placeholder - يتم تنفيذه في كل منصة
  return {
    user: null as User | null,
    isAuthenticated: false,
    isLoading: false,
    login,
    register,
    logout,
    refreshToken,
    getCurrentUser,
  };
}

// ============================================================
// Middleware للـ Next.js
// ============================================================
export function withAuth(handler: Function) {
  return async (req: Request, ...args: unknown[]) => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return handler(req, ...args);
  };
}

// ============================================================
// تصدير الكل
// ============================================================
export { TokenStorage, config as authConfig, DEFAULT_CONFIG };
export default {
  configureAuth,
  login,
  register,
  logout,
  refreshToken,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  uploadAvatar,
  getToken,
  isAuthenticated,
  hasRole,
  decodeToken,
  isTokenExpired,
  getTokenExpiry,
  startAutoRefresh,
  stopAutoRefresh,
};
