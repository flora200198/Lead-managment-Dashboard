import React, { memo } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Edit2 } from 'lucide-react'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import EmptyState from '../ui/EmptyState'
import { formatDateShort, truncate } from '../../utils/helpers'
import { Link } from 'react-router-dom'

// ── Column config ──────────────────────────────────────────────────────────────
const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone', sortable: false },
  { key: 'project', label: 'Project', sortable: true },
  { key: 'product', label: 'Product', sortable: true },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'value', label: 'Value', sortable: false },
  { key: 'createdAt', label: 'Added', sortable: true },
  { key: 'actions', label: '', sortable: false },
]

function SortIcon({ col, sortKey, sortDir }) {
  if (!col.sortable) return null

  if (sortKey !== col.key) {
    return <ArrowUpDown size={12} className="text-gray-300" />
  }

  return sortDir === 'asc'
    ? <ArrowUp size={12} className="text-brand-500" />
    : <ArrowDown size={12} className="text-brand-500" />
}

function Th({ col, sortKey, sortDir, onSort }) {
  return (
    <th
      className={`
        px-4 py-3 text-left text-[11px] font-semibold
        text-ink-muted uppercase tracking-wider
        ${col.sortable
          ? 'cursor-pointer select-none hover:text-ink transition-colors'
          : ''}
      `}
      onClick={() => col.sortable && onSort(col.key)}
    >
      <div className="flex items-center gap-1">
        {col.label}
        <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
      </div>
    </th>
  )
}

function LeadRow({ lead }) {
  return (
    <tr
      className="
        border-t border-gray-50
        hover:bg-surface-secondary/60
        hover:shadow-sm
        transition-all
        group
        relative
      "
    >
      {/* Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Avatar name={lead.name} size="sm" />

          <div>
            <p className="text-sm font-medium text-ink leading-none">
              {lead.name}
            </p>

            <p className="text-[11px] text-ink-muted mt-0.5 font-mono">
              {lead.phone}
            </p>
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="px-4 py-3 hidden xl:table-cell">
        <span className="font-mono text-xs text-ink-secondary">
          {lead.phone}
        </span>
      </td>

      {/* Project */}
      <td className="px-4 py-3">
        <span
          className="text-sm text-ink-secondary"
          title={lead.project}
        >
          {truncate(lead.project, 26)}
        </span>
      </td>

      <td className="px-4 py-3">
        <span
          className="text-sm text-ink-secondary"
          title={lead.product}
        >
          {truncate(lead.product, 26)}
        </span>
      </td>

      {/* Source */}
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-xs font-medium text-ink-secondary bg-surface-tertiary px-2 py-0.5 rounded-md">
          {lead.source}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <Badge status={lead.status} />
      </td>

      {/* Value */}
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="font-mono text-sm font-semibold text-ink">
          {lead.value || '—'}
        </span>
      </td>

      {/* Date */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="text-xs text-ink-muted">
          {formatDateShort(lead.createdAt)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right relative">
        <div className="flex items-center justify-end gap-2">

          {/* Hover Remarks Popup */}
          {lead.notes && (
            <div
              className="
                absolute right-24 top-1/2 -translate-y-1/2 z-50
                w-72 rounded-xl border border-gray-200
                bg-white shadow-2xl p-3
                text-left
                opacity-0 invisible
                group-hover:opacity-100
                group-hover:visible
                transition-all duration-200
                pointer-events-none
              "
            >
              <p className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider mb-1">
                Remarks
              </p>

              <p className="text-xs leading-relaxed text-ink-secondary whitespace-pre-wrap">
                {lead.notes}
              </p>
            </div>
          )}

          {/* Edit Button */}
          <Link
            to={`/leads/edit/${lead._id}`}
            className="
              inline-flex items-center gap-1.5
              px-2.5 py-1.5 rounded-lg
              text-xs font-medium
              text-brand-600 bg-brand-50
              hover:bg-brand-100
              transition-colors
              opacity-0 group-hover:opacity-100
            "
          >
            <Edit2 size={12} />
            Edit
          </Link>

        </div>
      </td>
    </tr>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
function LeadsTable({ leads, sortKey, sortDir, onSort }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead className="bg-surface-secondary">
          <tr>
            {COLUMNS.map(col => (
              <Th
                key={col.key}
                col={col}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={onSort}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length}>
                <EmptyState
                  title="No leads found"
                  description="Try adjusting your filters or add a new lead."
                  action={
                    <Link
                      to="/leads/add"
                      className="btn-primary text-xs"
                    >
                      + Add Lead
                    </Link>
                  }
                />
              </td>
            </tr>
          ) : (
            leads.map(lead => (
              <LeadRow
                key={lead._id}
                lead={lead}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default memo(LeadsTable)