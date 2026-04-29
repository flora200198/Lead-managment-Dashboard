import React from 'react'
import { Link }      from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import AddLeadForm   from '../components/leads/AddLeadForm'

export default function AddLead() {
  return (
    <div className="page-animate max-w-2xl mx-auto">

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <Link
        to="/leads"
        className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors mb-5"
      >
        <ChevronLeft size={14} />
        Back to Leads
      </Link>

      {/* ── Form card ───────────────────────────────────────────────────────── */}
      <div className="card p-6 md:p-8">
        <div className="mb-7">
          <h1 className="text-base font-semibold text-ink">Create New Lead</h1>
          <p className="text-xs text-ink-muted mt-1">
            Fill in the details below — fields marked <span className="text-red-400">*</span> are required.
          </p>
        </div>
        <AddLeadForm />
      </div>
    </div>
  )
}
