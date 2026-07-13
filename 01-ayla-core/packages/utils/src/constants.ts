// ============================================================
// AYLA CONSTANTS
// ثوابت مشتركة لكل المنصات
// ============================================================

// ============================================================
// إعدادات التطبيق
// ============================================================
export const APP_CONFIG = {
  name: 'Ayla Digital Solutions',
  nameAr: 'أيلا للحلول الرقمية',
  version: '1.0.0',
  defaultLanguage: 'ar' as const,
  defaultDirection: 'rtl' as const,
  defaultTheme: 'dark' as const,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  supportedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
} as const;

// ============================================================
// حدود الصفحات
// ============================================================
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
  limits: [10, 20, 50, 100],
} as const;

// ============================================================
// حالات الطلب
// ============================================================
export const ORDER_STATUS = {
  pending: { label: 'قيد الانتظار', labelEn: 'Pending', color: '#f59e0b' },
  confirmed: { label: 'تم التأكيد', labelEn: 'Confirmed', color: '#3b82f6' },
  inProgress: { label: 'قيد التنفيذ', labelEn: 'In Progress', color: '#8b5cf6' },
  completed: { label: 'مكتمل', labelEn: 'Completed', color: '#22c55e' },
  cancelled: { label: 'ملغي', labelEn: 'Cancelled', color: '#ef4444' },
  refunded: { label: 'مسترجع', labelEn: 'Refunded', color: '#6b7280' },
} as const;

// ============================================================
// حالات الدفع
// ============================================================
export const PAYMENT_STATUS = {
  pending: { label: 'قيد الانتظار', labelEn: 'Pending' },
  paid: { label: 'مدفوع', labelEn: 'Paid' },
  failed: { label: 'فشل', labelEn: 'Failed' },
  refunded: { label: 'مسترجع', labelEn: 'Refunded' },
  partial: { label: 'جزئي', labelEn: 'Partial' },
} as const;

// ============================================================
// طرق الدفع
// ============================================================
export const PAYMENT_METHODS = {
  cash: { label: 'نقدي', labelEn: 'Cash', icon: 'banknote' },
  card: { label: 'بطاقة', labelEn: 'Card', icon: 'credit-card' },
  wallet: { label: 'محفظة', labelEn: 'Wallet', icon: 'wallet' },
  bank: { label: 'تحويل بنكي', labelEn: 'Bank Transfer', icon: 'landmark' },
  apple_pay: { label: 'Apple Pay', labelEn: 'Apple Pay', icon: 'smartphone' },
  google_pay: { label: 'Google Pay', labelEn: 'Google Pay', icon: 'smartphone' },
} as const;

// ============================================================
// المنصات
// ============================================================
export const PLATFORMS = [
  { id: 'maintenance', name: 'Ayla Maintenance', nameAr: 'أيلا الصيانة', color: '#3b82f6' },
  { id: 'food', name: 'Ayla Food', nameAr: 'أيلا الطعام', color: '#22c55e' },
  { id: 'ride', name: 'Ayla Ride', nameAr: 'أيلا توصيل', color: '#8b5cf6' },
  { id: 'home-services', name: 'Ayla Home', nameAr: 'أيلا الخدمات المنزلية', color: '#f59e0b' },
  { id: 'fleet', name: 'Ayla Fleet', nameAr: 'أيلا الأسطول', color: '#06b6d4' },
  { id: 'warehouse', name: 'Ayla Warehouse', nameAr: 'أيلا المستودعات', color: '#6366f1' },
  { id: 'procurement', name: 'Ayla Procurement', nameAr: 'أيلا المشتريات', color: '#ec4899' },
  { id: 'hr', name: 'Ayla HR', nameAr: 'أيلا الموارد البشرية', color: '#14b8a6' },
  { id: 'projects', name: 'Ayla Projects', nameAr: 'أيلا المشاريع', color: '#f97316' },
  { id: 'bi', name: 'Ayla BI', nameAr: 'أيلا التحليلات', color: '#a855f7' },
  { id: 'smart-city', name: 'Ayla Smart City', nameAr: 'أيلا المدن الذكية', color: '#0ea5e9' },
  { id: 'medical', name: 'Ayla Medical', nameAr: 'أيلا المستشفيات', color: '#ef4444' },
  { id: 'clinic', name: 'Ayla Clinic', nameAr: 'أيلا العيادات', color: '#10b981' },
  { id: 'pharmacy', name: 'Ayla Pharmacy', nameAr: 'أيلا الصيدليات', color: '#f59e0b' },
] as const;

// ============================================================
// Regex Patterns
// ============================================================
export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  saudiPhone: /^(05|5)[0-9]{8}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const;

// ============================================================
// رسائل الخطأ
// ============================================================
export const ERROR_MESSAGES = {
  ar: {
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    invalidPhone: 'رقم الجوال غير صالح',
    minLength: (min: number) => `يجب أن يكون على الأقل ${min} أحرف`,
    maxLength: (max: number) => `يجب أن لا يتجاوز ${max} حرف`,
    passwordMismatch: 'كلمات المرور غير متطابقة',
    invalidPassword: 'كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز خاص',
    unauthorized: 'غير مصرح',
    forbidden: 'غير مسموح',
    notFound: 'الصفحة غير موجودة',
    serverError: 'حدث خطأ في الخادم',
    networkError: 'خطأ في الاتصال',
    timeout: 'انتهت مهلة الطلب',
  },
  en: {
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    invalidPhone: 'Invalid phone number',
    minLength: (min: number) => `Must be at least ${min} characters`,
    maxLength: (max: number) => `Must not exceed ${max} characters`,
    passwordMismatch: 'Passwords do not match',
    invalidPassword: 'Password must contain uppercase, lowercase, number, and special character',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    notFound: 'Page not found',
    serverError: 'Server error occurred',
    networkError: 'Network error',
    timeout: 'Request timeout',
  },
} as const;
