// ============================================================
// AYLA SIDEBAR COMPONENT
// شريط جانبي للتنقل
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavItem } from '@ayla/types';

export interface SidebarProps {
  items: NavItem[];
  userRole?: string;
  logo?: React.ReactNode;
  logoCollapsed?: React.ReactNode;
  isCollapsed?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onItemClick?: (item: NavItem) => void;
  footer?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  userRole,
  logo,
  logoCollapsed,
  isCollapsed: controlledCollapsed,
  onToggle,
  activeItem,
  onItemClick,
  footer,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleCollapse = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const filteredItems = userRole
    ? items.filter(item => !item.roles || item.roles.includes(userRole as any))
    : items;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-[#1a0f0a] border-l border-[rgba(201,162,39,0.2)] flex flex-col fixed right-0 top-0 z-[300]"
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(201,162,39,0.2)]">
        <div className="flex items-center gap-3 overflow-hidden">
          {isCollapsed ? logoCollapsed || logo : logo}
        </div>
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-lg text-[#a89b8c] hover:text-[#c9a227] hover:bg-[rgba(201,162,39,0.1)] transition-colors"
        >
          <motion.svg
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </motion.svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {filteredItems.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              isActive={activeItem === item.id}
              isExpanded={expandedItems.includes(item.id)}
              onToggle={() => toggleExpand(item.id)}
              onClick={() => onItemClick?.(item)}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {footer && (
        <div className="p-4 border-t border-[rgba(201,162,39,0.2)]">
          {footer}
        </div>
      )}
    </motion.aside>
  );
};

interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onClick: () => void;
  depth?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isCollapsed,
  isActive,
  isExpanded,
  onToggle,
  onClick,
  depth = 0,
}) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <button
        onClick={hasChildren ? onToggle : onClick}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
          text-sm font-medium transition-all duration-200
          ${isActive
            ? 'bg-[rgba(201,162,39,0.15)] text-[#c9a227]'
            : 'text-[#a89b8c] hover:text-[#f5f0e8] hover:bg-[rgba(201,162,39,0.08)]'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
        style={{ paddingRight: isCollapsed ? undefined : `${12 + depth * 16}px` }}
      >
        {item.icon && (
          <span className="flex-shrink-0 w-5 h-5">
            {item.icon}
          </span>
        )}
        {!isCollapsed && (
          <>
            <span className="flex-1 text-right truncate">{item.labelAr}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[#c9a227] text-[#1a0f0a] rounded-full">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <motion.svg
                animate={{ rotate: isExpanded ? -90 : 0 }}
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            )}
          </>
        )}
      </button>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && !isCollapsed && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-1 space-y-1"
          >
            {item.children!.map(child => (
              <SidebarItem
                key={child.id}
                item={child}
                isCollapsed={isCollapsed}
                isActive={false}
                isExpanded={false}
                onToggle={() => {}}
                onClick={onClick}
                depth={depth + 1}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

Sidebar.displayName = 'AylaSidebar';
export default Sidebar;
