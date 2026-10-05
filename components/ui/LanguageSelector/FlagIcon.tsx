import React from 'react';
import { Locale } from '@/config/i18n.config';

interface FlagIconProps {
  locale: Locale | string;
  className?: string;
  size?: number;
}

export function FlagIcon({ locale, className = '', size = 18 }: FlagIconProps) {
  const width = size;
  const height = Math.round((size * 2) / 3);

  switch (locale) {
    case 'es':
      // Spain flag: Red (1/4), Yellow (2/4), Red (1/4)
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 750 500"
          className={`rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.4)] flex-shrink-0 inline-block overflow-hidden ${className}`}
          aria-hidden="true"
        >
          <rect width="750" height="500" fill="#AA151B" />
          <rect width="750" height="250" y="125" fill="#F1BF00" />
          {/* Subtle Spanish coat of arms silhouette */}
          <circle cx="210" cy="250" r="45" fill="#AA151B" opacity="0.85" />
          <circle cx="210" cy="250" r="32" fill="#F1BF00" />
        </svg>
      );

    case 'en':
      // USA flag: 13 stripes + blue canton with stars representation
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 760 400"
          className={`rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.4)] flex-shrink-0 inline-block overflow-hidden ${className}`}
          aria-hidden="true"
        >
          <rect width="760" height="400" fill="#B22234" />
          <path
            d="M0,31H760M0,92H760M0,154H760M0,215H760M0,277H760M0,338H760"
            stroke="#FFFFFF"
            strokeWidth="31"
          />
          <rect width="304" height="215" fill="#3C3B6E" />
          {/* 5-star grid pattern representation */}
          <g fill="#FFFFFF" opacity="0.9">
            <circle cx="45" cy="35" r="8" />
            <circle cx="105" cy="35" r="8" />
            <circle cx="165" cy="35" r="8" />
            <circle cx="225" cy="35" r="8" />
            <circle cx="75" cy="70" r="8" />
            <circle cx="135" cy="70" r="8" />
            <circle cx="195" cy="70" r="8" />
            <circle cx="45" cy="105" r="8" />
            <circle cx="105" cy="105" r="8" />
            <circle cx="165" cy="105" r="8" />
            <circle cx="225" cy="105" r="8" />
            <circle cx="75" cy="140" r="8" />
            <circle cx="135" cy="140" r="8" />
            <circle cx="195" cy="140" r="8" />
            <circle cx="45" cy="175" r="8" />
            <circle cx="105" cy="175" r="8" />
            <circle cx="165" cy="175" r="8" />
            <circle cx="225" cy="175" r="8" />
          </g>
        </svg>
      );

    case 'fr':
      // France flag: Blue, White, Red vertical stripes
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 900 600"
          className={`rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.4)] flex-shrink-0 inline-block overflow-hidden ${className}`}
          aria-hidden="true"
        >
          <rect width="300" height="600" fill="#002395" />
          <rect width="300" height="600" x="300" fill="#FFFFFF" />
          <rect width="300" height="600" x="600" fill="#ED2939" />
        </svg>
      );

    default:
      return (
        <span className="text-xs font-bold uppercase tracking-wider text-[#19322F]">
          {locale}
        </span>
      );
  }
}
