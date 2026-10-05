import React from 'react';

export type BadgeVariant = 'exclusive' | 'new-arrival' | 'sale' | 'rent' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'exclusive':
      case 'new-arrival':
        return 'bg-white/90 backdrop-blur-sm text-[#19322F] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm';
      case 'sale':
        return 'bg-[#19322F]/90 text-white text-xs font-bold px-2 py-1 rounded shadow-sm';
      case 'rent':
        return 'bg-[#006655]/90 text-white text-xs font-bold px-2 py-1 rounded shadow-sm';
      default:
        return 'bg-white/80 text-[#19322F] text-xs font-medium px-2.5 py-1 rounded-full';
    }
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${getVariantStyles()} ${className}`}>
      {children}
    </div>
  );
}
