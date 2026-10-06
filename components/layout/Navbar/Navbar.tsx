'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { SITE_CONFIG } from '@/config/site.config';
import { MOCK_USER } from '@/data/mocks/user.mock';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { NavLinks } from './NavLinks';
import { useI18n } from '@/lib/i18n';

export function Navbar() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<string>('buy');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#EEF6F6]/95 backdrop-blur-md border-b border-[#19322F]/10 w-full max-w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-lg bg-[#19322F] flex items-center justify-center transition-transform group-hover:scale-105 flex-shrink-0">
              <Icon name="apartment" className="text-white text-lg" />
            </div>
            <span className="text-lg sm:text-xl font-semibold tracking-tight text-[#19322F]">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <NavLinks activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Right Action Icons & Avatar */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Language Selector Dropdown */}
            <LanguageSelector />

            {/* Desktop Only Icons */}
            <button
              type="button"
              aria-label={t('nav.searchAria')}
              className="hidden sm:flex w-9 h-9 min-w-[36px] min-h-[36px] rounded-full aspect-square items-center justify-center flex-shrink-0 text-[#19322F] hover:text-[#006655] hover:bg-[#006655]/10 transition-colors cursor-pointer"
            >
              <Icon name="search" className="text-lg" />
            </button>
            <button
              type="button"
              aria-label={t('nav.notificationsAria')}
              className="hidden sm:flex w-9 h-9 min-w-[36px] min-h-[36px] rounded-full aspect-square items-center justify-center flex-shrink-0 text-[#19322F] hover:text-[#006655] hover:bg-[#006655]/10 transition-colors relative cursor-pointer"
            >
              <Icon name="notifications_none" className="text-lg" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#EEF6F6]"></span>
            </button>
            <button
              type="button"
              aria-label={t('nav.profileAria')}
              className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#19322F]/10 ml-1 cursor-pointer"
            >
              <div className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full aspect-square overflow-hidden ring-2 ring-transparent hover:ring-[#006655] transition-all flex-shrink-0">
                <Image
                  src={MOCK_USER.avatarUrl}
                  alt={MOCK_USER.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* Mobile menu hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 min-w-[36px] min-h-[36px] rounded-full aspect-square flex items-center justify-center flex-shrink-0 text-[#19322F] hover:text-[#006655] hover:bg-[#006655]/10 transition-colors cursor-pointer"
              aria-label={t('nav.openMenuAria')}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden border-t border-[#19322F]/10 bg-white/95 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 w-full ${
          mobileMenuOpen ? 'max-h-96 py-3' : 'max-h-0 py-0'
        }`}
      >
        <div className="px-4 space-y-3">
          {/* User Profile Bar in Mobile Drawer */}
          <div className="flex items-center justify-between pb-3 border-b border-[#19322F]/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full aspect-square overflow-hidden ring-2 ring-[#006655]/20 flex-shrink-0">
                <Image
                  src={MOCK_USER.avatarUrl}
                  alt={MOCK_USER.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#19322F] truncate">{MOCK_USER.name}</p>
                <p className="text-xs text-[#5C706D] truncate">{MOCK_USER.email || 'user@luxeestate.com'}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label={t('nav.notificationsAria')}
              className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full aspect-square flex items-center justify-center flex-shrink-0 text-[#19322F] hover:text-[#006655] hover:bg-[#006655]/10 transition-colors relative cursor-pointer"
            >
              <Icon name="notifications_none" className="text-lg" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>

          <NavLinks
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setMobileMenuOpen(false);
            }}
            isMobile
          />
        </div>
      </div>
    </nav>
  );
}
