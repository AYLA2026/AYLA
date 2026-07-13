// ============================================================
// AYLA TABLE COMPONENT
// جدول بيانات مشترك
// ============================================================

import React from 'react';
import type { TableColumn, TablePagination, TableSort } from '@ayla/types';

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: TablePagination;
  sort?: TableSort;
  onSort?: (sort: TableSort) => void;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  emptyMessageAr?: string;
  selectable?: boolean;
  selectedIds?: string[];
  onSelect?: (id: string) => void;
  onSelectAll?: () => void;
  rowClassName?: (row: T) => string;
  onRowClick?: (row: T) => void;
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  pagination,
  sort,
  onSort,
  onPageChange,
  onLimitChange,
  isLoading = false,
  emptyMessage = 'No data available',
  emptyMessageAr = 'لا توجد بيانات',
  selectable = false,
  selectedIds = [],
  onSelect,
  onSelectAll,
  rowClassName,
  onRowClick,
}: TableProps<T>) {
  const allSelected = data.length > 0 && data.every(row => selectedIds.includes(String(row.id)));
  const someSelected = data.some(row => selectedIds.includes(String(row.id))) && !allSelected;

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSort) return;
    const newSort: TableSort = {
      column: column.key,
      direction: sort?.column === column.key && sort.direction === 'asc' ? 'desc' : 'asc',
    };
    onSort(newSort);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[rgba(201,162,39,0.2)] bg-[#2d1f16]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(201,162,39,0.2)] bg-[#1a0f0a]">
              {selectable && (
                <th className="px-4 py-3 w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={el => { if (el) el.indeterminate = someSelected; }}
                    onChange={onSelectAll}
                    className="w-4 h-4 rounded border-[rgba(201,162,39,0.4)] bg-transparent text-[#c9a227] focus:ring-[#c9a227]"
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`
                    px-4 py-3 text-right text-sm font-semibold text-[#a89b8c]
                    ${column.sortable ? 'cursor-pointer hover:text-[#c9a227] select-none' : ''}
                    ${column.width ? '' : 'whitespace-nowrap'}
                  `}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-1 justify-end">
                    {column.headerAr || column.header}
                    {column.sortable && sort?.column === column.key && (
                      <span className="text-[#c9a227]">
                        {sort.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-[#c9a227] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[#a89b8c]">جاري التحميل...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center">
                  <div className="text-[#7a6b5c]">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>{emptyMessageAr}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={String(row.id) || index}
                  className={`
                    border-b border-[rgba(201,162,39,0.1)]
                    hover:bg-[rgba(201,162,39,0.05)]
                    transition-colors
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${rowClassName ? rowClassName(row) : ''}
                  `}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(String(row.id))}
                        onChange={() => onSelect?.(String(row.id))}
                        className="w-4 h-4 rounded border-[rgba(201,162,39,0.4)] bg-transparent text-[#c9a227] focus:ring-[#c9a227]"
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td key={column.key} className="px-4 py-3 text-sm text-[#f5f0e8]">
                      {column.render
                        ? column.render(row as T)
                        : String((row as Record<string, unknown>)[column.key] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(201,162,39,0.2)]">
          <div className="text-sm text-[#7a6b5c]">
            عرض {((pagination.page - 1) * pagination.limit) + 1} إلى {Math.min(pagination.page * pagination.limit, pagination.total)} من {pagination.total}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="px-3 py-1.5 rounded-lg text-sm text-[#a89b8c] hover:text-[#f5f0e8] hover:bg-[rgba(201,162,39,0.1)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              السابق
            </button>
            <span className="text-sm text-[#a89b8c]">
              صفحة {pagination.page} من {Math.ceil(pagination.total / pagination.limit)}
            </span>
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
              className="px-3 py-1.5 rounded-lg text-sm text-[#a89b8c] hover:text-[#f5f0e8] hover:bg-[rgba(201,162,39,0.1)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Table.displayName = 'AylaTable';
export default Table;
