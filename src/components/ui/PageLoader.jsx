import React from 'react'
import { Loader2 } from 'lucide-react'

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-ink-muted animate-fade-in">
      <Loader2 size={28} className="animate-spin text-brand-400" strokeWidth={1.5} />
      <p className="text-sm font-medium">Loading…</p>
    </div>
  )
}
