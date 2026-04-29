import React, { useMemo } from 'react'
import { Users, Flame, Thermometer, Phone, TrendingUp } from 'lucide-react'
import { useLeads }          from '../context/LeadsContext'
import StatCard              from '../components/ui/StatCard'
import RecentLeads           from '../components/dashboard/RecentLeads'
import SourceBreakdown       from '../components/dashboard/SourceBreakdown'

// ── Stat card config ───────────────────────────────────────────────────────────
function buildCards(stats, total) {
  return [
    {
      label:      'Total Leads',
      value:      stats.total,
      icon:       Users,
      iconColor:  'text-brand-500',
      iconBg:     'bg-brand-50',
      trend:      12,
      progress:   Math.min(100, Math.round((stats.total / 20) * 100)),
      accentColor:'#6366f1',
    },
    {
      label:      'Hot Leads',
      value:      stats.hot,
      icon:       Flame,
      iconColor:  'text-red-500',
      iconBg:     'bg-red-50',
      trend:      8,
      progress:   total ? Math.round((stats.hot / total) * 100) : 0,
      accentColor:'#ef4444',
    },
    {
      label:      'Warm Leads',
      value:      stats.warm,
      icon:       Thermometer,
      iconColor:  'text-orange-500',
      iconBg:     'bg-orange-50',
      trend:      -3,
      progress:   total ? Math.round((stats.warm / total) * 100) : 0,
      accentColor:'#f97316',
    },
    {
      label:      'Callback',
      value:      stats.callback,
      icon:       Phone,
      iconColor:  'text-emerald-500',
      iconBg:     'bg-emerald-50',
      trend:      5,
      progress:   total ? Math.round((stats.callback / total) * 100) : 0,
      accentColor:'#10b981',
    },
  ]
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { leads, stats } = useLeads()
  const cards = useMemo(() => buildCards(stats, stats.total), [stats])

  return (
    <div className="page-animate space-y-7">

      {/* ── Stat cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={card.label} style={{ animationDelay: `${i * 60}ms` }}>
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* ── Main content row ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* Recent leads */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-ink">Recent Leads</h2>
              <p className="text-xs text-ink-muted mt-0.5">Latest additions to your pipeline</p>
            </div>
          </div>
          <RecentLeads leads={leads} />
        </div>

        {/* Source breakdown */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-brand-400" />
            <h2 className="text-sm font-semibold text-ink">Lead Sources</h2>
          </div>
          <SourceBreakdown leads={leads} />
        </div>
      </div>
    </div>
  )
}
