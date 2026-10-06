'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';

interface AboutHomeCardProps {
  title: string;
  location: string;
  description?: string;
}

export function AboutHomeCard({
  title,
  location,
  description,
}: AboutHomeCardProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultDesc1 = t('propertyDetails.aboutParagraph1', { location });
  const defaultDesc2 = t('propertyDetails.aboutParagraph2');
  const additionalDesc = t('propertyDetails.aboutParagraph3');

  return (
    <div className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-[#006655]/5">
      <h2 className="text-lg font-semibold mb-4 text-[#19322F]">
        {t('propertyDetails.aboutTitle')}
      </h2>
      <div className="prose prose-slate max-w-none text-[#19322F]/70 leading-relaxed space-y-4 text-base">
        <p>{defaultDesc1}</p>
        <p>{defaultDesc2}</p>
        {isExpanded && <p className="animate-fadeIn">{additionalDesc}</p>}
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-[#006655] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer group"
      >
        <span>{isExpanded ? t('common.showLess') : t('common.readMore')}</span>
        <span className="material-icons text-sm transition-transform group-hover:translate-x-0.5">
          {isExpanded ? 'expand_less' : 'arrow_forward'}
        </span>
      </button>
    </div>
  );
}
