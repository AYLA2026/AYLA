'use client';

import React from 'react';
import { tokens } from '@ayla/design-tokens';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Card({
  children,
  title,
  subtitle,
  icon,
  headerAction,
  footer,
  padding = 'md',
  border = true,
  hover = false,
  glow = false,
  className = '',
  style,
  onClick,
}: CardProps) {
  const paddingStyles: Record<string, string> = {
    none: '0',
    sm: tokens.spacing[3],
    md: tokens.spacing[5],
    lg: tokens.spacing[6],
  };

  return (
    <div
      className={`ayla-card ${hover ? 'ayla-card-hover' : ''} ${className}`}
      onClick={onClick}
      style={{
        background: tokens.colors.background.secondary,
        borderRadius: tokens.borderRadius.xl,
        border: border ? `1px solid ${tokens.colors.border.light}` : 'none',
        boxShadow: glow ? tokens.shadows.gold : tokens.shadows.DEFAULT,
        overflow: 'hidden',
        transition: `all ${tokens.transitions.DEFAULT}`,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {(title || icon || headerAction) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${tokens.spacing[4]} ${paddingStyles[padding]}`,
            borderBottom: subtitle || children ? `1px solid ${tokens.colors.border.light}` : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing[3] }}>
            {icon && (
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: tokens.borderRadius.lg,
                  background: `linear-gradient(135deg, ${tokens.colors.gold[500]}20, ${tokens.colors.gold[400]}10)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: tokens.colors.gold[400],
                  fontSize: '20px',
                }}
              >
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3
                  style={{
                    margin: 0,
                    color: tokens.colors.text.primary,
                    fontSize: tokens.typography.fontSize.lg,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    fontFamily: tokens.typography.fontFamily.arabic,
                  }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  style={{
                    margin: '4px 0 0',
                    color: tokens.colors.text.secondary,
                    fontSize: tokens.typography.fontSize.sm,
                    fontFamily: tokens.typography.fontFamily.arabic,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerAction}
        </div>
      )}
      <div style={{ padding: paddingStyles[padding] }}>{children}</div>
      {footer && (
        <div
          style={{
            padding: `${tokens.spacing[3]} ${paddingStyles[padding]}`,
            borderTop: `1px solid ${tokens.colors.border.light}`,
            background: 'rgba(0,0,0,0.2)',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
