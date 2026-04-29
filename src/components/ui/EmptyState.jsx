import React, { memo } from 'react'
import { SearchX } from 'lucide-react'

function EmptyState({ title = 'No results', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-14 h-14 bg-surface-tertiary rounded-2xl flex items-center justify-center mb-4">
        <SearchX size={24} className="text-ink-muted" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-ink mb-1">{title}</p>
      {description && <p className="text-xs text-ink-muted max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export default memo(EmptyState)
