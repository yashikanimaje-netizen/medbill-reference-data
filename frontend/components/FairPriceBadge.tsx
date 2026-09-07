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
  let styleClasses = '';
  let icon = '';

  switch (status) {
    case 'fair':
      displayLabel = displayLabel || '✓ FAIRLY CHARGED';
      styleClasses = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      icon = '✓';
      break;
    case 'moderate':
      displayLabel = displayLabel || '⚠️ MODERATELY OVERCHARGED';
      styleClasses = 'bg-amber-50 text-amber-700 border border-amber-200';
      icon = '⚠️';
      break;
    case 'overpriced':
    default:
      displayLabel = displayLabel || '🚨 HEAVILY OVERCHARGED';
      styleClasses = 'bg-rose-50 text-rose-700 border border-rose-200';
      icon = '🚨';
      break;
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-bold',
    md: 'text-[11px] px-2.5 py-1 font-bold tracking-wide',
    lg: 'text-xs px-3 py-1.5 font-black tracking-wide'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border uppercase ${styleClasses} ${sizeClasses}`}
      role="status"
      aria-label={`Billing status: ${displayLabel}`}
    >
      {showIcon && <span>{icon}</span>}
      <span>{displayLabel}</span>
    </span>
  );
};
