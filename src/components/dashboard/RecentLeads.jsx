import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Avatar          from '../ui/Avatar'
import Badge           from '../ui/Badge'
import { formatDateShort, truncate } from '../../utils/helpers'

function RecentLeads({ leads }) {
  const recent = leads.slice(0, 6)

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-2 text-left text-[11px] font-semibold text-ink-muted uppercase tracking-wider">Name</th>
            <th className="pb-2 text-left text-[11px] font-semibold text-ink-muted uppercase tracking-wider hidden sm:table-cell">Project</th>
            <th className="pb-2 text-left text-[11px] font-semibold text-ink-muted uppercase tracking-wider">Status</th>
            <th className="pb-2 text-right text-[11px] font-semibold text-ink-muted uppercase tracking-wider hidden md:table-cell">Added</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {recent.map(lead => (
            <tr key={lead._id} className="hover:bg-surface-secondary/60 transition-colors">
              <td className="py-2.5 pr-3">
                <div className="flex items-center gap-2">
                  <Avatar name={lead.name} size="sm" />
                  <span className="text-sm font-medium text-ink">{lead.name}</span>
                </div>
              </td>
              <td className="py-2.5 pr-3 hidden sm:table-cell">
                <span className="text-xs text-ink-secondary">{truncate(lead.project, 22)}</span>
              </td>
              <td className="py-2.5 pr-3">
                <Badge status={lead.status} showDot={false} />
              </td>
              <td className="py-2.5 text-right hidden md:table-cell">
                <span className="text-xs text-ink-muted">{formatDateShort(lead.createdAt)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <Link to="/leads" className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-500 hover:text-brand-700 transition-colors">
          View all leads <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

export default memo(RecentLeads)
