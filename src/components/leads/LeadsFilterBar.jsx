import React, { memo } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { STATUSES, SOURCES, PRODUCTS } from '../../utils/mockData'

function LeadsFilterBar({
  search, onSearch,
  statusFilter, onStatusFilter,
  sourceFilter, onSourceFilter,
  productFilter, onProductFilter,
  onReset,
  totalShown, totalAll,
}) {
  const hasFilter = search || statusFilter !== 'All' || sourceFilter !== 'All' || productFilter !== ''

  return (
    <div className="flex flex-wrap items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-surface-secondary/50">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Search leads…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="form-field pl-8 pr-3 py-2 text-xs"
        />
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-1.5">
        <Filter size={13} className="text-ink-muted flex-shrink-0" />
        <select
          value={statusFilter}
          onChange={e => onStatusFilter(e.target.value)}
          className="form-field py-2 text-xs w-auto min-w-[130px]"
        >
          <option value="All">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Source filter */}
      <select
        value={sourceFilter}
        onChange={e => onSourceFilter(e.target.value)}
        className="form-field py-2 text-xs w-auto min-w-[120px]"
      >
        <option value="All">All Sources</option>
        {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select className="form-field py-2 text-xs w-auto min-w-[120px]" 
      value={productFilter}
      onChange={e => onProductFilter(e.target.value)}
      >
        <option value="">All Products</option>
        {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      {/* Reset */}
      {hasFilter && (
        <button onClick={onReset} className="btn-ghost text-xs gap-1 text-red-500 hover:text-red-600 hover:bg-red-50">
          <X size={12} />
          Clear
        </button>
      )}

      {/* Count */}
      <span className="ml-auto text-xs text-ink-muted font-medium whitespace-nowrap">
        {totalShown} / {totalAll} leads
      </span>
    </div>
  )
}

export default memo(LeadsFilterBar)
