import React from 'react'
import { Link }              from 'react-router-dom'
import { Plus, Download }    from 'lucide-react'
import { useLeads }          from '../context/LeadsContext'
import { useLeadFilters }    from '../hooks/useLeadFilters'
import LeadsTable            from '../components/leads/LeadsTable'
import LeadsFilterBar        from '../components/leads/LeadsFilterBar'

export default function Leads() {
  const { leads } = useLeads()

  const {
    filtered,
    search,       setSearch,
    statusFilter, setStatusFilter,
    sourceFilter, setSourceFilter,
    sortKey, sortDir, toggleSort,
    resetFilters,
  } = useLeadFilters(leads)

  return (
    <div className="page-animate space-y-5">

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-ink">All Leads</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            {filtered.length} of {leads.length} leads
            {statusFilter !== 'All' && ` · Status: ${statusFilter}`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="btn-secondary text-xs hidden sm:inline-flex" title="Export CSV (coming soon)" disabled>
            <Download size={13} />
            Export
          </button>
          <Link to="/leads/add" className="btn-primary text-xs">
            <Plus size={13} />
            Add Lead
          </Link>
        </div>
      </div>

      {/* ── Table card ──────────────────────────────────────────────────────── */}
      <div className="card overflow-hidden">
        <LeadsFilterBar
          search={search}           onSearch={setSearch}
          statusFilter={statusFilter} onStatusFilter={setStatusFilter}
          sourceFilter={sourceFilter} onSourceFilter={setSourceFilter}
          onReset={resetFilters}
          totalShown={filtered.length}
          totalAll={leads.length}
        />
        <LeadsTable
          leads={filtered}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={toggleSort}
        />
      </div>
    </div>
  )
}
