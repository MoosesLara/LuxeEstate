'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';

interface PaginationProps {
  page: number;
  totalPages: number;
  activeFilter: string;
}

export function Pagination({ page, totalPages, activeFilter }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useI18n();

  if (totalPages <= 1) return null;

  function buildHref(targetPage: number): string {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(targetPage));
    if (activeFilter && activeFilter !== 'all') {
      params.set('type', activeFilter);
    } else {
      params.delete('type');
    }
    return `${pathname}?${params.toString()}`;
  }

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
      className="flex items-center justify-center gap-1 mt-12"
    >
      {/* Prev */}
      {page > 1 ? (
        <Link
          href={buildHref(page - 1)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#19322F] bg-white border border-[#19322F]/10 rounded-lg hover:border-[#006655] hover:text-[#006655] transition-all hover:shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('common.previous')}
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#19322F]/30 bg-white/50 border border-[#19322F]/5 rounded-lg cursor-not-allowed select-none">
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
              className="w-10 h-10 flex items-center justify-center text-sm text-[#5C706D]"
            >
              &hellip;
            </span>
          ) : p === page ? (
            <span
              key={p}
              aria-current="page"
              className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-white bg-[#006655] rounded-lg shadow-md shadow-[#006655]/20"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(p)}
              className="w-10 h-10 flex items-center justify-center text-sm font-medium text-[#19322F] bg-white border border-[#19322F]/10 rounded-lg hover:border-[#006655] hover:text-[#006655] transition-all hover:shadow-sm"
            >
              {p}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {page < totalPages ? (
        <Link
          href={buildHref(page + 1)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#19322F] bg-white border border-[#19322F]/10 rounded-lg hover:border-[#006655] hover:text-[#006655] transition-all hover:shadow-sm"
        >
          {t('common.next')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#19322F]/30 bg-white/50 border border-[#19322F]/5 rounded-lg cursor-not-allowed select-none">
          {t('common.next')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </nav>
  );
}
