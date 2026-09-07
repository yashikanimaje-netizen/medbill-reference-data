import React from 'react';

export interface FairPriceBadgeProps {
  status: 'fair' | 'moderate' | 'overpriced';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const FairPriceBadge: React.FC<FairPriceBadgeProps> = ({
  status,
  label,
  size = 'md',
  showIcon = true
}) => {
  let displayLabel = label;
  let bgClass = '';
  let textClass = '';
  let icon = '';

  switch (status) {
    case 'fair':
      displayLabel = displayLabel || '✓ FAIRLY CHARGED';
      bgClass = 'bg-emerald-600';
      textClass = 'text-white';
      icon = '✓';
      break;
    case 'moderate':
      displayLabel = displayLabel || '⚠️ MODERATELY OVERCHARGED';
      bgClass = 'bg-amber-500';
      textClass = 'text-white';
      icon = '⚠️';
      break;
    case 'overpriced':
    default:
      displayLabel = displayLabel || '🚨 HEAVILY OVERCHARGED';
      bgClass = 'bg-rose-600';
      textClass = 'text-white';
      icon = '🚨';
      break;
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-bold',
    md: 'text-[11px] px-2.5 py-1 font-black tracking-wide',
    lg: 'text-xs px-3 py-1.5 font-black tracking-wide'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md shadow-sm uppercase ${bgClass} ${textClass} ${sizeClasses}`}
      role="status"
      aria-label={`Billing status: ${displayLabel}`}
    >
      {showIcon && <span>{icon}</span>}
      <span>{displayLabel}</span>
    </span>
  );
};
