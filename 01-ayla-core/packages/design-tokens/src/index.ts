// ============================================================
// AYLA DESIGN TOKENS
// مستوحاة من هوية Ayla Digital Solutions
// الخلفية البنية الداكنة + الذهبي الفاخر
// ============================================================

export const colors = {
  // الخلفيات
  background: {
    primary: '#1a0f0a',      // بني داكن جداً - خلفية رئيسية
    secondary: '#2d1f16',    // بني داكن - cards
    tertiary: '#3d2b1f',     // بني متوسط - hover
    elevated: '#4a3525',     // بني فاتح - elevated surfaces
    overlay: 'rgba(26, 15, 10, 0.8)',
  },

  // الذهبي (اللون الأساسي)
  gold: {
    50: '#faf6e9',
    100: '#f0e6c4',
    200: '#e8d5a3',
    300: '#d4b76a',
    400: '#c9a227',
    500: '#b8941f',
    600: '#9a7a1a',
    700: '#7a6015',
    800: '#5c4810',
    900: '#3d300b',
  },

  // النصوص
  text: {
    primary: '#f5f0e8',      // أبيض كريمي - نص رئيسي
    secondary: '#a89b8c',    // بيج داكن - نص ثانوي
    muted: '#7a6b5c',        // بيج معتم - placeholder
    inverse: '#1a0f0a',      // بني داكن - نص على خلفية ذهبية
  },

  // الحالات
  state: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // حدود
  border: {
    light: 'rgba(201, 162, 39, 0.2)',
    DEFAULT: 'rgba(201, 162, 39, 0.4)',
    strong: 'rgba(201, 162, 39, 0.6)',
  },
} as const;

// ============================================================
// الخطوط
// ============================================================
export const typography = {
  fontFamily: {
    arabic: '"Noto Sans Arabic", "Cairo", sans-serif',
    english: '"Inter", "Poppins", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============================================================
// المسافات (Spacing)
// ============================================================
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// ============================================================
// الظلال (Shadows)
// ============================================================
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.4)',
  md: '0 6px 12px rgba(0, 0, 0, 0.5)',
  lg: '0 10px 25px rgba(0, 0, 0, 0.6)',
  xl: '0 20px 40px rgba(0, 0, 0, 0.7)',
  gold: '0 4px 20px rgba(201, 162, 39, 0.3)',
  'gold-lg': '0 8px 30px rgba(201, 162, 39, 0.4)',
} as const;

// ============================================================
// الحدود الدائرية (Border Radius)
// ============================================================
export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  full: '9999px',
} as const;

// ============================================================
// الانتقالات (Transitions)
// ============================================================
export const transitions = {
  fast: '150ms ease-in-out',
  DEFAULT: '250ms ease-in-out',
  slow: '350ms ease-in-out',
  bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ============================================================
// Z-Index
// ============================================================
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  toast: 700,
} as const;

// ============================================================
// تصدير الكل
// ============================================================
export const tokens = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  zIndex,
} as const;

export type Tokens = typeof tokens;
export default tokens;
