// ============================================================
// AYLA AVATAR COMPONENT
// صورة شخصية مشتركة
// ============================================================

import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'away' | 'busy';
  border?: boolean;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const statusColors: Record<string, string> = {
  online: 'bg-[#22c55e]',
  offline: 'bg-[#6b7280]',
  away: 'bg-[#f59e0b]',
  busy: 'bg-[#ef4444]',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = '?',
  size = 'md',
  status,
  border = false,
  className = '',
  ...props
}) => {
  const hasImage = src && src.trim() !== '';
  const initials = getInitials(name);

  return (
    <div className="relative inline-block" {...props}>
      <div
        className={`
          ${sizeStyles[size]}
          rounded-full overflow-hidden
          flex items-center justify-center
          font-semibold
          ${hasImage ? '' : 'bg-gradient-to-br from-[#c9a227] to-[#b8941f] text-[#1a0f0a]'}
          ${border ? 'ring-2 ring-[#c9a227] ring-offset-2 ring-offset-[#1a0f0a]' : ''}
          ${className}
        `}
      >
        {hasImage ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            w-3 h-3 rounded-full border-2 border-[#1a0f0a]
            ${statusColors[status]}
          `}
        />
      )}
    </div>
  );
};

Avatar.displayName = 'AylaAvatar';
export default Avatar;
