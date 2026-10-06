'use client';

import React from 'react';
import { motion } from 'motion/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';

interface PaginationProps {
  page: number;
  totalPages: number;
  activeFilter: string;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  activeFilter,
  onPageChange,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useI18n();

  if (totalPages <= 1) return null;

  function buildHref(targetPage: number): string {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', String(targetPage));
    if (activeFilter && activeFilter !== 'all') {
      params.set('type', activeFilter);
    } else {
      params.delete('type');
    }
    return `${pathname}?${params.toString()}`;
  }

  const handleClick = (e: React.MouseEvent, targetPage: number) => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(targetPage);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', buildHref(targetPage));
      }
    }
  };

  // Generate page window: always show first, last, and ±2 around current
  function getPageNumbers(): (number | '...')[] {
    const delta = 2;
    const range: number[] = [];
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    const pages: (number | '...')[] = [1];
    if (range[0] > 2) pages.push('...');
    pages.push(...range);
    if (range[range.length - 1] < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  }

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Property pagination"
      className="flex items-center justify-center gap-1.5 mt-12 select-none"
    >
      {/* Prev */}
      {page > 1 ? (
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={(e) => handleClick(e, page - 1)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#19322F] bg-white border border-[#19322F]/10 rounded-lg hover:border-[#006655] hover:text-[#006655] transition-colors shadow-sm cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('common.previous')}
        </motion.button>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#19322F]/30 bg-white/50 border border-[#19322F]/5 rounded-lg cursor-not-allowed">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('common.previous')}
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p, idx) =>
          p === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-10 h-10 min-w-[40px] min-h-[40px] aspect-square flex-shrink-0 flex items-center justify-center text-sm text-[#5C706D]"
            >
              &hellip;
            </span>
          ) : p === page ? (
            <motion.span
              key={p}
              layoutId="activePageBadge"
              aria-current="page"
              className="w-10 h-10 min-w-[40px] min-h-[40px] aspect-square flex-shrink-0 flex items-center justify-center text-sm font-semibold text-white bg-[#006655] rounded-lg shadow-md shadow-[#006655]/25"
            >
              {p}
            </motion.span>
          ) : (
            <motion.button
              type="button"
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleClick(e, p as number)}
              className="w-10 h-10 min-w-[40px] min-h-[40px] aspect-square flex-shrink-0 flex items-center justify-center text-sm font-medium text-[#19322F] bg-white border border-[#19322F]/10 rounded-lg hover:border-[#006655] hover:text-[#006655] transition-colors shadow-sm cursor-pointer"
            >
              {p}
            </motion.button>
          )
        )}
      </div>

      {/* Next */}
      {page < totalPages ? (
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={(e) => handleClick(e, page + 1)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#19322F] bg-white border border-[#19322F]/10 rounded-lg hover:border-[#006655] hover:text-[#006655] transition-colors shadow-sm cursor-pointer"
        >
          {t('common.next')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#19322F]/30 bg-white/50 border border-[#19322F]/5 rounded-lg cursor-not-allowed">
          {t('common.next')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </nav>
  );
}
