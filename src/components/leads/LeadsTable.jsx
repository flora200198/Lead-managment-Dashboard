

// import React, { memo, useState } from 'react'
// import {
//   ArrowUpDown,
//   ArrowUp,
//   ArrowDown,
//   Edit2,
//   X,
//   Save,
// } from 'lucide-react'

// import Badge from '../ui/Badge'
// import Avatar from '../ui/Avatar'
// import EmptyState from '../ui/EmptyState'

// import { formatDateShort, truncate } from '../../utils/helpers'
// import { Link } from 'react-router-dom'

// // ── Column config ──────────────────────────────────────────────────────────────
// const COLUMNS = [
//   { key: 'name', label: 'Name', sortable: true },
//   { key: 'phone', label: 'Phone', sortable: false },
//   { key: 'project', label: 'Project', sortable: true },
//   { key: 'product', label: 'Product', sortable: true },
//   { key: 'source', label: 'Source', sortable: true },
//   { key: 'status', label: 'Status', sortable: true },
//   { key: 'value', label: 'Value', sortable: false },
//   { key: 'createdAt', label: 'Added', sortable: true },
//   { key: 'actions', label: '', sortable: false },
// ]

// function SortIcon({ col, sortKey, sortDir }) {
//   if (!col.sortable) return null

//   if (sortKey !== col.key) {
//     return <ArrowUpDown size={12} className="text-gray-300" />
//   }

//   return sortDir === 'asc'
//     ? <ArrowUp size={12} className="text-brand-500" />
//     : <ArrowDown size={12} className="text-brand-500" />
// }

// function Th({ col, sortKey, sortDir, onSort }) {
//   return (
//     <th
//       className={`
//         px-4 py-3 text-left text-[11px] font-semibold
//         text-ink-muted uppercase tracking-wider
//         ${
//           col.sortable
//             ? 'cursor-pointer select-none hover:text-ink transition-colors'
//             : ''
//         }
//       `}
//       onClick={() => col.sortable && onSort(col.key)}
//     >
//       <div className="flex items-center gap-1">
//         {col.label}
//         <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
//       </div>
//     </th>
//   )
// }

// function LeadRow({ lead }) {
//   const [showEditor, setShowEditor] = useState(false)
//   const [newNote, setNewNote] = useState('')

//   // local notes state
//   const [notesHistory, setNotesHistory] = useState(
//     Array.isArray(lead.notes) ? lead.notes : []
//   )

//   const handleSaveNote = () => {
//     if (!newNote.trim()) return

//     const updated = [
//       ...notesHistory,
//       {
//         text: newNote.trim(),
//         createdAt: new Date().toISOString(),
//       },
//     ]

//     setNotesHistory(updated)

//     // optional → persist to backend/localStorage/context
//     lead.notes = updated

//     setNewNote('')
//     setShowEditor(false)
//   }

//   const latestNote =
//     notesHistory?.[notesHistory.length - 1]?.text || 'No remarks'

//   return (
//     <>
//       <tr
//         className="
//           border-t border-gray-50
//           hover:bg-surface-secondary/60
//           hover:shadow-sm
//           transition-all
//           group
//           relative
//         "
//       >
//         {/* Name */}
//         <td className="px-4 py-3">
//           <div className="flex items-center gap-2.5">
//             <Avatar name={lead.name} size="sm" />

//             <div>
//               <p className="text-sm font-medium text-ink leading-none">
//                 {lead.name}
//               </p>

//               <p className="text-[11px] text-ink-muted mt-0.5 font-mono">
//                 {lead.phone}
//               </p>
//             </div>
//           </div>
//         </td>

//         {/* Phone */}
//         <td className="px-4 py-3 hidden xl:table-cell">
//           <span className="font-mono text-xs text-ink-secondary">
//             {lead.phone}
//           </span>
//         </td>

//         {/* Project */}
//         <td className="px-4 py-3">
//           <span
//             className="text-sm text-ink-secondary"
//             title={lead.project}
//           >
//             {truncate(lead.project, 26)}
//           </span>
//         </td>

//         {/* Product */}
//         <td className="px-4 py-3">
//           <span
//             className="text-sm text-ink-secondary"
//             title={lead.product}
//           >
//             {truncate(lead.product, 26)}
//           </span>
//         </td>

//         {/* Source */}
//         <td className="px-4 py-3 hidden md:table-cell">
//           <span className="text-xs font-medium text-ink-secondary bg-surface-tertiary px-2 py-0.5 rounded-md">
//             {lead.source}
//           </span>
//         </td>

//         {/* Status */}
//         <td className="px-4 py-3">
//           <Badge status={lead.status} />
//         </td>

//         {/* Value */}
//         <td className="px-4 py-3 hidden sm:table-cell">
//           <span className="font-mono text-sm font-semibold text-ink">
//             {lead.value || '—'}
//           </span>
//         </td>

//         {/* Date */}
//         <td className="px-4 py-3 hidden lg:table-cell">
//           <span className="text-xs text-ink-muted">
//             {formatDateShort(lead.createdAt)}
//           </span>
//         </td>

//         {/* Actions */}
//         <td className="px-4 py-3 text-right relative">
//           <div className="flex items-center justify-end gap-2">

//             {/* Hover Notes */}
//             <div
//               className="
//                 absolute right-24 top-1/2 -translate-y-1/2 z-40
//                 w-72 rounded-xl border border-gray-200
//                 bg-white shadow-2xl p-3
//                 text-left
//                 opacity-0 invisible
//                 group-hover:opacity-100
//                 group-hover:visible
//                 transition-all duration-200
//                 pointer-events-none
//               "
//             >
//               <p className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider mb-1">
//                 Latest Remark
//               </p>

//               <p className="text-xs leading-relaxed text-ink-secondary whitespace-pre-wrap">
//                 {latestNote}
//               </p>
//             </div>

//             {/* Edit Button */}
//             <button
//               onClick={() => setShowEditor(true)}
//               className="
//                 inline-flex items-center gap-1.5
//                 px-2.5 py-1.5 rounded-lg
//                 text-xs font-medium
//                 text-brand-600 bg-brand-50
//                 hover:bg-brand-100
//                 transition-colors
//                 opacity-0 group-hover:opacity-100
//               "
//             >
//               <Edit2 size={12} />
//               Edit
//             </button>

//           </div>
//         </td>
//       </tr>

//       {/* ── Popup Modal ───────────────────────────────────────── */}
//       {showEditor && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">

//           <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-100">

//             {/* Header */}
//             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//               <div>
//                 <h3 className="text-lg font-semibold text-ink">
//                   Lead Remarks
//                 </h3>

//                 <p className="text-xs text-ink-muted mt-0.5">
//                   {lead.name}
//                 </p>
//               </div>

//               <button
//                 onClick={() => setShowEditor(false)}
//                 className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
//               >
//                 <X size={16} />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="p-5">

//               {/* Add Note */}
//               <div className="mb-5">
//                 <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
//                   Add New Remark
//                 </label>

//                 <textarea
//                   value={newNote}
//                   onChange={(e) => setNewNote(e.target.value)}
//                   placeholder="Type new remark..."
//                   className="
//                     w-full min-h-[110px]
//                     rounded-xl border border-gray-200
//                     px-4 py-3 text-sm
//                     focus:outline-none
//                     focus:ring-2 focus:ring-brand-200
//                     resize-none
//                   "
//                 />
//               </div>

//               {/* History */}
//               <div>
//                 <h4 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
//                   Remarks History
//                 </h4>

//                 <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">

//                   {notesHistory.length === 0 && (
//                     <div className="text-sm text-ink-muted text-center py-6 border border-dashed border-gray-200 rounded-xl">
//                       No remarks yet
//                     </div>
//                   )}

//                   {[...notesHistory]
//                     .reverse()
//                     .map((note, index) => (
//                       <div
//                         key={index}
//                         className="
//                           rounded-xl border border-gray-100
//                           bg-surface-secondary/50
//                           p-3
//                         "
//                       >
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="text-[11px] font-semibold text-brand-600">
//                             Remark #{notesHistory.length - index}
//                           </span>

//                           <span className="text-[11px] text-ink-muted">
//                             {new Date(note.createdAt).toLocaleString()}
//                           </span>
//                         </div>

//                         <p className="text-sm text-ink-secondary whitespace-pre-wrap leading-relaxed">
//                           {note.text}
//                         </p>
//                       </div>
//                     ))}
//                 </div>
//               </div>

//             </div>

//             {/* Footer */}
//             <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100">

//               <button
//                 onClick={() => setShowEditor(false)}
//                 className="btn-secondary"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSaveNote}
//                 className="btn-primary inline-flex items-center gap-2"
//               >
//                 <Save size={14} />
//                 Save Remark
//               </button>

//             </div>

//           </div>

//         </div>
//       )}
//     </>
//   )
// }

// // ── Main component ─────────────────────────────────────────────────────────────
// function LeadsTable({ leads, sortKey, sortDir, onSort }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full min-w-[640px]">
//         <thead className="bg-surface-secondary">
//           <tr>
//             {COLUMNS.map(col => (
//               <Th
//                 key={col.key}
//                 col={col}
//                 sortKey={sortKey}
//                 sortDir={sortDir}
//                 onSort={onSort}
//               />
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {leads.length === 0 ? (
//             <tr>
//               <td colSpan={COLUMNS.length}>
//                 <EmptyState
//                   title="No leads found"
//                   description="Try adjusting your filters or add a new lead."
//                   action={
//                     <Link
//                       to="/leads/add"
//                       className="btn-primary text-xs"
//                     >
//                       + Add Lead
//                     </Link>
//                   }
//                 />
//               </td>
//             </tr>
//           ) : (
//             leads.map(lead => (
//               <LeadRow
//                 key={lead._id}
//                 lead={lead}
//               />
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default memo(LeadsTable)

import React, { memo, useState } from 'react'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit2,
  X,
  Save,
  CheckCircle2,
} from 'lucide-react'

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

const STATUS_OPTIONS = [
  'Hot',
  'Warm',
  'Cold',
  'Closed',
  'Lost',
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
        ${
          col.sortable
            ? 'cursor-pointer select-none hover:text-ink transition-colors'
            : ''
        }
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
  const [showEditor, setShowEditor] = useState(false)
  const [newNote, setNewNote] = useState('')

  const [currentStatus, setCurrentStatus] = useState(
    lead.status || 'Hot'
  )

  // ── Notes History ─────────────────────────────────────────────
  const initialNotes = (() => {

    if (Array.isArray(lead.notes)) {
      return lead.notes
    }

    if (typeof lead.notes === 'string' && lead.notes.trim()) {
      return [
        {
          text: lead.notes,
          createdAt: lead.createdAt || new Date().toISOString(),
        },
      ]
    }

    return []

  })()

  const [notesHistory, setNotesHistory] = useState(initialNotes)

  // ── Status History ────────────────────────────────────────────
  const initialStatusHistory = (() => {

    if (Array.isArray(lead.statusHistory)) {
      return lead.statusHistory
    }

    if (lead.status) {
      return [
        {
          status: lead.status,
          createdAt: lead.createdAt || new Date().toISOString(),
        },
      ]
    }

    return []

  })()

  const [statusHistory, setStatusHistory] = useState(initialStatusHistory)

  // ── Save ──────────────────────────────────────────────────────
  const handleSaveNote = () => {

    const updatedNotes = [...notesHistory]

    if (newNote.trim()) {
      updatedNotes.push({
        text: newNote.trim(),
        createdAt: new Date().toISOString(),
      })
    }

    let updatedStatusHistory = [...statusHistory]

    const latestStatus =
      statusHistory[statusHistory.length - 1]?.status

    if (currentStatus !== latestStatus) {
      updatedStatusHistory.push({
        status: currentStatus,
        createdAt: new Date().toISOString(),
      })
    }

    setNotesHistory(updatedNotes)
    setStatusHistory(updatedStatusHistory)

    // persist locally
    lead.notes = updatedNotes
    lead.status = currentStatus
    lead.statusHistory = updatedStatusHistory

    setNewNote('')
    setShowEditor(false)
  }

  const latestNote =
    notesHistory.length > 0
      ? notesHistory[notesHistory.length - 1].text
      : 'No remarks'

  return (
    <>
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

        {/* Product */}
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

            {/* Hover Popup */}
            <div
              className="
                absolute right-24 top-1/2 -translate-y-1/2 z-40
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
                Latest Remark
              </p>

              <p className="text-xs leading-relaxed text-ink-secondary whitespace-pre-wrap">
                {latestNote}
              </p>
            </div>

            {/* Edit */}
            <button
              onClick={() => setShowEditor(true)}
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
            </button>

          </div>
        </td>
      </tr>

      {/* ── Modal ───────────────────────────────────────────── */}
      {showEditor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div
  className="
    w-full max-w-2xl
    h-[85vh]
    rounded-2xl
    bg-white
    shadow-2xl
    border border-gray-100
    flex flex-col
    overflow-hidden
  "
>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-semibold text-ink">
                  Lead Editor
                </h3>

                <p className="text-xs text-ink-muted mt-0.5">
                  {lead.name}
                </p>
              </div>

              <button
                onClick={() => setShowEditor(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            {/* <div className="p-5"> */}
            <div className="flex-1 overflow-y-auto p-5">

              {/* Status */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
                  Lead Status
                </label>

                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="
                    w-full rounded-xl border border-gray-200
                    px-3 py-2.5 text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-brand-200
                    bg-white
                  "
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Note */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
                  Add New Remark
                </label>

                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Type new remark..."
                  className="
                    w-full min-h-[110px]
                    rounded-xl border border-gray-200
                    px-4 py-3 text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-brand-200
                    resize-none
                  "
                />
              </div>

              {/* Remarks History */}
              <div>
                <h4 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                  Remarks History
                </h4>

                {/* <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1"> */}
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">

                  {notesHistory.length === 0 && (
                    <div className="text-sm text-ink-muted text-center py-6 border border-dashed border-gray-200 rounded-xl">
                      No remarks yet
                    </div>
                  )}

                  {[...notesHistory]
                    .reverse()
                    .map((note, index) => (
                      <div
                        key={index}
                        className="
                          rounded-xl border border-gray-100
                          bg-surface-secondary/50
                          p-3
                        "
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-semibold text-brand-600">
                            Remark #{notesHistory.length - index}
                          </span>

                          <span className="text-[11px] text-ink-muted">
                            {new Date(note.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-sm text-ink-secondary whitespace-pre-wrap leading-relaxed">
                          {note.text}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Status History */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                  Status History
                </h4>

                {/* <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1"> */}
                <div className="space-y-3 max-h-[140px] overflow-y-auto pr-1">

                  {[...statusHistory]
                    .reverse()
                    .map((item, index) => (
                      <div
                        key={index}
                        className="
                          rounded-xl border border-gray-100
                          bg-brand-50/40
                          p-3
                        "
                      >
                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              size={14}
                              className="text-brand-500"
                            />

                            <span className="text-sm font-medium text-ink">
                              {item.status}
                            </span>
                          </div>

                          <span className="text-[11px] text-ink-muted">
                            {new Date(item.createdAt).toLocaleString()}
                          </span>

                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100">

              <button
                onClick={() => setShowEditor(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveNote}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Save size={14} />
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}
    </>
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