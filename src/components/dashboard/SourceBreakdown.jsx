import React, { memo, useMemo } from 'react'
import { SOURCES } from '../../utils/mockData'

const BAR_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

function SourceBreakdown({ leads }) {
  const data = useMemo(() => {
    const counts = SOURCES.map((src, i) => ({
      name:  src,
      count: leads.filter(l => l.source === src).length,
      color: BAR_COLORS[i % BAR_COLORS.length],
    }))
    return counts.filter(d => d.count > 0).sort((a, b) => b.count - a.count)
  }, [leads])

  const max = data[0]?.count || 1

  return (
    <div className="space-y-3">
      {data.length === 0 && (
        <p className="text-xs text-ink-muted text-center py-8">No data yet</p>
      )}
      {data.map(d => (
        <div key={d.name}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-ink-secondary">{d.name}</span>
            <span className="text-xs font-semibold text-ink font-mono">{d.count}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(d.count / max) * 100}%`, background: d.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(SourceBreakdown)
