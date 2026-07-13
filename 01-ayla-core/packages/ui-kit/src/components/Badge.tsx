// ============================================================
// AYLA BADGE COMPONENT
// شارة/وسم مشتركة
// ============================================================

import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pill?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#3d2b1f] text-[#a89b8c] border-[rgba(201,162,39,0.3)]',
  primary: 'bg-[rgba(201,162,39,0.2)] text-[#c9a227] border-[rgba(201,162,39,0.4)]',
  success: 'bg-[rgba(34,197,94,0.2)] text-[#22c55e] border-[rgba(34,197,94,0.4)]',
  warning: 'bg-[rgba(245,158,11,0.2)] text-[#f59e0b] border-[rgba(245,158,11,0.4)]',
  error: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444] border-[rgba(239,68,68,0.4)]',
  info: 'bg-[rgba(59,130,246,0.2)] text-[#3b82f6] border-[rgba(59,130,246,0.4)]',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  pill = true,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium
        border rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${pill ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`w-2 h-2 rounded-full ${
            variant === 'primary' ? 'bg-[#c9a227]' :
            variant === 'success' ? 'bg-[#22c55e]' :
            variant === 'warning' ? 'bg-[#f59e0b]' :
            variant === 'error' ? 'bg-[#ef4444]' :
            variant === 'info' ? 'bg-[#3b82f6]' :
            'bg-[#a89b8c]'
          }`}
        />
      )}
      {children}
    </span>
  );
};

Badge.displayName = 'AylaBadge';
export default Badge;
