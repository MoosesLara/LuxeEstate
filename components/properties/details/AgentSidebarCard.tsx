'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PropertyAgent } from '@/types/property.types';
import { useI18n } from '@/lib/i18n';

interface AgentSidebarCardProps {
  priceFormatted: string;
  pricePeriod?: string;
  location: string;
  agent?: PropertyAgent;
}

export function AgentSidebarCard({
  priceFormatted,
  pricePeriod,
  location,
  agent,
}: AgentSidebarCardProps) {
  const { t } = useI18n();

  const currentAgent: PropertyAgent = agent || {
    name: 'Sarah Jenkins',
    title: t('agent.topRatedBadge'),
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
    rating: t('agent.topRatedBadge'),
    phone: '+1 (555) 234-5678',
    email: 'sarah.jenkins@luxeestate.com',
  };

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactModalOpen(false);
      setScheduleModalOpen(false);
    }, 1500);
  };

  const displayPeriod = pricePeriod === '/month' ? t('common.perMonth') : pricePeriod;
  const agentRating = currentAgent.rating?.toLowerCase().includes('top')
    ? t('agent.topRatedBadge')
    : currentAgent.rating || t('agent.topRatedBadge');

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#006655]/5">
        {/* Price & Address Header */}
        <div className="mb-4">
          <h1 className="text-4xl font-display font-light text-[#19322F] mb-2 tracking-tight">
            {priceFormatted}
            {displayPeriod && (
              <span className="text-xl font-normal text-[#19322F]/60 ml-1">
                {displayPeriod}
              </span>
            )}
          </h1>
          <p className="text-[#19322F]/60 font-medium flex items-center gap-1 text-sm">
            <span className="material-icons text-[#006655] text-sm">location_on</span>
            <span>{location}</span>
          </p>
        </div>

        <div className="h-px bg-slate-100 my-6" />

        {/* Agent Profile Block */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
            <Image
              src={currentAgent.avatarUrl}
              alt={currentAgent.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-[#19322F]">{currentAgent.name}</h3>
            <div className="flex items-center gap-1 text-xs text-[#006655] font-medium">
              <span className="material-icons text-[14px]">star</span>
              <span>{agentRating}</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              aria-label={t('agent.chatAria')}
              title={t('agent.sendMessage')}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full aspect-square flex items-center justify-center flex-shrink-0 bg-[#006655]/10 text-[#006655] hover:bg-[#006655] hover:text-white transition-colors cursor-pointer shadow-sm active:scale-95"
            >
              <span className="material-icons text-[18px]">chat</span>
            </button>
            <a
              href={`tel:${currentAgent.phone || '+15552345678'}`}
              aria-label={t('agent.callAria')}
              title={t('agent.callAgent')}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full aspect-square flex items-center justify-center flex-shrink-0 bg-[#006655]/10 text-[#006655] hover:bg-[#006655] hover:text-white transition-colors cursor-pointer shadow-sm active:scale-95"
            >
              <span className="material-icons text-[18px]">call</span>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setScheduleModalOpen(true)}
            className="w-full bg-[#006655] hover:bg-[#005544] text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-[#006655]/20 flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]"
          >
            <span className="material-icons text-xl group-hover:scale-110 transition-transform">
              calendar_today
            </span>
            <span>{t('agent.scheduleVisitButton')}</span>
          </button>
          <button
            type="button"
            onClick={() => setContactModalOpen(true)}
            className="w-full bg-transparent border border-[#19322F]/10 hover:border-[#006655] text-[#19322F]/80 hover:text-[#006655] py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span className="material-icons text-xl">mail_outline</span>
            <span>{t('agent.contactAgentButton')}</span>
          </button>
        </div>
      </div>

      {/* Schedule / Contact Modal */}
      {(scheduleModalOpen || contactModalOpen) && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#006655]/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-[#19322F]">
                {scheduleModalOpen ? t('agent.scheduleModalTitle') : t('agent.contactModalTitle')}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setScheduleModalOpen(false);
                  setContactModalOpen(false);
                }}
                aria-label="Close modal"
                className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full aspect-square flex items-center justify-center flex-shrink-0 text-slate-400 hover:text-[#19322F] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span className="material-icons text-lg">close</span>
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-2">
                <span className="material-icons text-5xl text-[#006655]">check_circle</span>
                <p className="font-bold text-lg text-[#19322F]">{t('agent.successTitle')}</p>
                <p className="text-sm text-[#19322F]/60">
                  {t('agent.successMessage', { agent: currentAgent.name })}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#19322F]/70 block mb-1">
                    {t('agent.yourNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('agent.yourNamePlaceholder')}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#006655]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#19322F]/70 block mb-1">
                    {t('agent.emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t('agent.emailPlaceholder')}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#006655]"
                  />
                </div>
                {scheduleModalOpen && (
                  <div>
                    <label className="text-xs font-semibold text-[#19322F]/70 block mb-1">
                      {t('agent.preferredDateLabel')}
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#006655]"
                    />
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold text-[#19322F]/70 block mb-1">
                    {t('agent.messageLabel')}
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={
                      scheduleModalOpen
                        ? t('agent.defaultScheduleMessage', { agent: currentAgent.name })
                        : t('agent.defaultContactMessage', { agent: currentAgent.name })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#006655]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#006655] hover:bg-[#005544] text-white py-3 rounded-lg font-semibold text-sm transition-all shadow-md cursor-pointer"
                >
                  {t('agent.sendInquiryButton')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
