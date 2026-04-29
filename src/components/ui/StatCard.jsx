import React, { memo } from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

/**
 * StatCard
 * Props:
 *   label      – string
 *   value      – number | string
 *   icon       – Lucide icon component
 *   iconColor  – Tailwind text class
 *   iconBg     – Tailwind bg class
 *   trend      – number (positive = up, negative = down)
 *   trendLabel – string e.g. "vs last month"
 *   progress   – 0–100 (optional progress bar)
 *   accentColor – CSS color string for progress bar
 */
function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = 'text-brand-500',
  iconBg    = 'bg-brand-50',
  trend,
  trendLabel = 'vs last month',
  progress,
  accentColor = '#6366f1',
}) {
  const isPositive = trend >= 0
  const TrendIcon  = isPositive ? ArrowUpRight : ArrowDownRight

  return (
    <div className="card p-5 hover:shadow-card-hover transition-shadow duration-200 animate-slide-up">
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} mb-4`}>
        <Icon size={18} className={iconColor} strokeWidth={2} />
      </div>

      {/* Label & value */}
      <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-semibold text-ink tracking-tight">{value}</p>

      {/* Trend */}
      {trend != null && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          <TrendIcon size={13} />
          <span>{Math.abs(trend)}% {trendLabel}</span>
        </div>
      )}

      {/* Progress bar */}
      {progress != null && (
        <div className="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(progress, 100)}%`, background: accentColor }}
          />
        </div>
      )}
    </div>
  )
}

export default memo(StatCard)
