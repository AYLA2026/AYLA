'use client';

import React from 'react';
import { tokens } from '@ayla/design-tokens';

// ============================================================
// Button - زر Ayla
// ============================================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  glow?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  glow = false,
  disabled,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing[2],
    borderRadius: tokens.borderRadius.lg,
    fontFamily: tokens.typography.fontFamily.arabic,
    fontWeight: tokens.typography.fontWeight.semibold,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: `all ${tokens.transitions.DEFAULT}`,
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    border: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || loading ? 0.6 : 1,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`, fontSize: tokens.typography.fontSize.sm, height: '32px' },
    md: { padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`, fontSize: tokens.typography.fontSize.base, height: '40px' },
    lg: { padding: `${tokens.spacing[3]} ${tokens.spacing[5]}`, fontSize: tokens.typography.fontSize.lg, height: '48px' },
    xl: { padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`, fontSize: tokens.typography.fontSize.xl, height: '56px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${tokens.colors.gold[500]}, ${tokens.colors.gold[400]})`,
      color: tokens.colors.text.inverse,
      boxShadow: glow ? tokens.shadows.gold : 'none',
    },
    secondary: {
      background: tokens.colors.background.tertiary,
      color: tokens.colors.text.primary,
      border: `1px solid ${tokens.colors.border.DEFAULT}`,
    },
    outline: {
      background: 'transparent',
      color: tokens.colors.gold[400],
      border: `2px solid ${tokens.colors.gold[400]}`,
    },
    ghost: {
      background: 'transparent',
      color: tokens.colors.text.primary,
    },
    danger: {
      background: tokens.colors.state.error,
      color: '#fff',
    },
    gold: {
      background: 'transparent',
      color: tokens.colors.gold[400],
      border: `1px solid ${tokens.colors.gold[400]}`,
    },
  };

  const hoverStyles: Record<string, React.CSSProperties> = {
    primary: { background: `linear-gradient(135deg, ${tokens.colors.gold[400]}, ${tokens.colors.gold[300]})`, transform: 'translateY(-1px)', boxShadow: tokens.shadows.gold },
    secondary: { background: tokens.colors.background.elevated, borderColor: tokens.colors.gold[400] },
    outline: { background: 'rgba(201, 162, 39, 0.1)' },
    ghost: { background: 'rgba(201, 162, 39, 0.1)', color: tokens.colors.gold[400] },
    danger: { background: '#dc2626' },
    gold: { background: 'rgba(201, 162, 39, 0.15)' },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      className={`ayla-button ayla-button-${variant} ayla-button-${size} ${className}`}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(isHovered && !disabled && !loading ? hoverStyles[variant] : {}),
        ...style,
      }}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {loading && (
        <span
          style={{
            width: size === 'sm' ? '14px' : size === 'md' ? '16px' : '20px',
            height: size === 'sm' ? '14px' : size === 'md' ? '16px' : '20px',
            border: `2px solid ${variant === 'primary' ? 'rgba(255,255,255,0.3)' : tokens.colors.gold[400]}`,
            borderTopColor: variant === 'primary' ? '#fff' : tokens.colors.gold[200],
            borderRadius: '50%',
            animation: 'ayla-spin 0.8s linear infinite',
            display: 'inline-block',
          }}
        />
      )}
      {!loading && leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  );
}
