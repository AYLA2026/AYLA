'use client';

import React, { forwardRef } from 'react';
import { tokens } from '@ayla/design-tokens';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, size = 'md', variant = 'default', className = '', style, ...props }, ref) => {
    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`, fontSize: tokens.typography.fontSize.sm, height: '36px' },
      md: { padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`, fontSize: tokens.typography.fontSize.base, height: '44px' },
      lg: { padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`, fontSize: tokens.typography.fontSize.lg, height: '52px' },
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        background: tokens.colors.background.tertiary,
        border: `1px solid ${error ? tokens.colors.state.error : tokens.colors.border.DEFAULT}`,
      },
      filled: {
        background: tokens.colors.background.elevated,
        border: `1px solid ${error ? tokens.colors.state.error : 'transparent'}`,
      },
    };

    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: tokens.spacing[2],
              color: tokens.colors.text.primary,
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.medium,
              fontFamily: tokens.typography.fontFamily.arabic,
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          {leftIcon && (
            <div
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: tokens.colors.text.muted,
                zIndex: 1,
              }}
            >
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`ayla-input ayla-input-${size} ayla-input-${variant} ${className}`}
            style={{
              width: '100%',
              borderRadius: tokens.borderRadius.lg,
              color: tokens.colors.text.primary,
              fontFamily: tokens.typography.fontFamily.arabic,
              outline: 'none',
              transition: `all ${tokens.transitions.DEFAULT}`,
              ...sizeStyles[size],
              ...variantStyles[variant],
              paddingLeft: leftIcon ? '40px' : sizeStyles[size].padding,
              paddingRight: rightIcon ? '40px' : sizeStyles[size].padding,
              ...style,
            }}
            {...props}
          />
          {rightIcon && (
            <div
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: tokens.colors.text.muted,
              }}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            style={{
              margin: `${tokens.spacing[1]} 0 0`,
              color: tokens.colors.state.error,
              fontSize: tokens.typography.fontSize.sm,
              fontFamily: tokens.typography.fontFamily.arabic,
            }}
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            style={{
              margin: `${tokens.spacing[1]} 0 0`,
              color: tokens.colors.text.muted,
              fontSize: tokens.typography.fontSize.sm,
              fontFamily: tokens.typography.fontFamily.arabic,
            }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
