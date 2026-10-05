'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface FavoriteButtonProps {
  initialFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
  className?: string;
  size?: 'sm' | 'md';
  shape?: 'circle' | 'rounded';
}

export function FavoriteButton({
  initialFavorite = false,
  onToggle,
  className = '',
  size = 'md',
  shape = 'circle',
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    if (onToggle) onToggle(nextState);
  };

  // Fixed 1:1 dimensions to guarantee a 100% perfect circle without any oval distortion
  const sizeClasses =
    size === 'sm'
      ? 'w-9 h-9 min-w-[36px] min-h-[36px]'
      : 'w-10 h-10 min-w-[40px] min-h-[40px]';

  const shapeClasses =
    shape === 'rounded' ? 'rounded-lg' : 'rounded-full aspect-square';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm select-none ${sizeClasses} ${shapeClasses} ${
        isFavorite
          ? 'bg-[#006655] text-white'
          : 'bg-white/90 text-[#19322F] hover:bg-[#006655] hover:text-white'
      } ${className}`}
    >
      <Icon
        name={isFavorite ? 'favorite' : 'favorite_border'}
        className={size === 'sm' ? 'text-lg' : 'text-xl'}
      />
    </button>
  );
}
