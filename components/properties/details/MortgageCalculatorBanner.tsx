'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';

interface MortgageCalculatorBannerProps {
  price: number;
}

export function MortgageCalculatorBanner({ price }: MortgageCalculatorBannerProps) {
  const { t } = useI18n();
  const [showModal, setShowModal] = useState(false);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanYears, setLoanYears] = useState(30);

  // Calculate monthly mortgage payment
  const downPayment = (price * downPaymentPercent) / 100;
  const principal = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanYears * 12;

  const monthlyPayment =
    monthlyRate > 0
      ? (principal *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : principal / numberOfPayments;

  const formattedPayment = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(monthlyPayment));

  return (
    <>
      <div className="bg-[#006655]/5 p-6 rounded-xl border border-[#006655]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 min-w-[48px] min-h-[48px] bg-white rounded-full aspect-square text-[#006655] shadow-sm flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl">calculate</span>
          </div>
          <div>
            <h3 className="font-semibold text-[#19322F]">
              {t('mortgage.title')}
            </h3>
            <p className="text-sm text-[#19322F]/60">
              {t('mortgage.subtitle', {
                payment: formattedPayment,
                percent: downPaymentPercent,
              })}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="whitespace-nowrap px-4 py-2 bg-white border border-[#19322F]/10 rounded-lg text-sm font-semibold hover:border-[#006655] hover:text-[#006655] transition-colors text-[#19322F] cursor-pointer shadow-sm active:scale-95"
        >
          {t('mortgage.calculateButton')}
        </button>
      </div>

      {/* Interactive Mortgage Calculator Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#006655]/10 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="material-icons text-[#006655]">calculate</span>
                <h3 className="font-bold text-lg text-[#19322F]">
                  {t('mortgage.modalTitle')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close calculator"
                className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full aspect-square flex items-center justify-center flex-shrink-0 text-slate-400 hover:text-[#19322F] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span className="material-icons text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#19322F]/70 uppercase">
                  {t('mortgage.homePriceLabel')}
                </label>
                <div className="text-2xl font-bold text-[#19322F] mt-0.5">
                  ${price.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#19322F]/70 mb-1">
                  <span>{t('mortgage.downPaymentLabel')}: {downPaymentPercent}%</span>
                  <span>${Math.round(downPayment).toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#006655] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#19322F]/70 mb-1">
                  <span>{t('mortgage.interestRateLabel')}</span>
                  <span>{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="10.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#006655] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#19322F]/70 mb-1 block">
                  {t('mortgage.loanTermLabel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLoanYears(15)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                      loanYears === 15
                        ? 'bg-[#006655] text-white border-[#006655]'
                        : 'bg-white text-[#19322F] border-slate-200 hover:border-[#006655]'
                    }`}
                  >
                    {t('mortgage.term15Years')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoanYears(30)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                      loanYears === 30
                        ? 'bg-[#006655] text-white border-[#006655]'
                        : 'bg-white text-[#19322F] border-slate-200 hover:border-[#006655]'
                    }`}
                  >
                    {t('mortgage.term30Years')}
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#19322F]/60">{t('mortgage.monthlyPaymentLabel')}</span>
                  <div className="text-3xl font-extrabold text-[#006655]">
                    {formattedPayment}
                    <span className="text-sm font-normal text-[#19322F]/60">{t('common.perMonth')}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-[#006655] hover:bg-[#005544] text-white rounded-lg font-semibold text-sm transition-all cursor-pointer"
                >
                  {t('common.done')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
