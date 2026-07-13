// ============================================================
// AYLA SHARED TYPES
// أنواع TypeScript المشتركة لكل المنصات
// ============================================================

// ============================================================
// المستخدم
// ============================================================
export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  metadata?: Record<string, unknown>;
}

export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'manager' 
  | 'operator' 
  | 'customer' 
  | 'provider' 
  | 'driver' 
  | 'technician';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

// ============================================================
// المصادقة
// ============================================================
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================================
// الردود API
// ============================================================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  meta?: ApiMeta;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ============================================================
// الصفحات والتنقل
// ============================================================
export interface NavItem {
  id: string;
  label: string;
  labelAr: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  roles?: UserRole[];
  badge?: number;
  isExternal?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// ============================================================
// الجداول
// ============================================================
export interface TableColumn<T = unknown> {
  key: string;
  header: string;
  headerAr: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface TablePagination {
  page: number;
  limit: number;
  total: number;
}

export interface TableSort {
  column: string;
  direction: 'asc' | 'desc';
}

export interface TableFilter {
  column: string;
  value: string | string[] | number | boolean;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in';
}

// ============================================================
// الإشعارات
// ============================================================
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

// ============================================================
// الإعدادات
// ============================================================
export interface AppConfig {
  platformId: string;
  platformName: string;
  platformNameAr: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  features: PlatformFeature[];
  settings: AppSettings;
}

export interface AppSettings {
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  theme: 'dark' | 'light' | 'system';
  notifications: boolean;
  soundEffects: boolean;
  autoLogout: number;
}

export interface PlatformFeature {
  id: string;
  name: string;
  nameAr: string;
  isEnabled: boolean;
  isPremium: boolean;
  config?: Record<string, unknown>;
}

// ============================================================
// الموقع الجغرافي
// ============================================================
export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
  city: string;
  region: string;
  country: string;
  postalCode?: string;
  location?: GeoLocation;
  isDefault: boolean;
  notes?: string;
}

// ============================================================
// الملفات
// ============================================================
export interface UploadedFile {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
  uploadedBy: string;
}

// ============================================================
// الأدوار والصلاحيات
// ============================================================
export interface Permission {
  id: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  conditions?: Record<string, unknown>;
}

export interface Role {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  permissions: Permission[];
  isSystem: boolean;
}

// ============================================================
// الإحصائيات
// ============================================================
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  growthRate: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

// ============================================================
// المنصات
// ============================================================
export type PlatformId = 
  | 'maintenance' 
  | 'food' 
  | 'ride' 
  | 'home-services'
  | 'fleet' 
  | 'warehouse' 
  | 'procurement' 
  | 'hr'
  | 'projects' 
  | 'bi' 
  | 'smart-city' 
  | 'medical' 
  | 'clinic' 
  | 'pharmacy';

export interface PlatformInfo {
  id: PlatformId;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  color: string;
  isActive: boolean;
  url: string;
}

// ============================================================
// الأخطاء
// ============================================================
export class AylaError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'AylaError';
  }
}

export const ErrorCodes = {
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
  AUTH_FORBIDDEN: 'AUTH_FORBIDDEN',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMIT: 'RATE_LIMIT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

export type ErrorCode = keyof typeof ErrorCodes;
