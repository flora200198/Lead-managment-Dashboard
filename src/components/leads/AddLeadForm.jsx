import React, { useState, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Building2, Zap, FileText, CheckCircle2 } from 'lucide-react'
import FormInput  from '../ui/FormInput'
import { useLeads } from '../../context/LeadsContext'
import { ToastContext } from '../../layouts/AppLayout'
import { STATUSES, SOURCES, PROJECTS } from '../../utils/mockData'

// ── Initial form state ─────────────────────────────────────────────────────────
const INITIAL = {
  name: '', phone: '', project: '', source: '',
  status: 'Hot', value: '', notes: '',
}

// ── Validation ─────────────────────────────────────────────────────────────────
function validate(form) {
  const errors = {}
  if (!form.name.trim())    errors.name    = 'Full name is required'
  if (!form.phone.trim())   errors.phone   = 'Phone number is required'
  if (!form.project)        errors.project = 'Please select a project'
  if (!form.source)         errors.source  = 'Please select a lead source'
  return errors
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function FormSection({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-brand-100">
        <div className="w-6 h-6 rounded-lg bg-brand-50 flex items-center justify-center">
          <Icon size={13} className="text-brand-500" />
        </div>
        <h3 className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  )
}

// ── Main form ──────────────────────────────────────────────────────────────────
export default function AddLeadForm() {
  const [form,    setForm]    = useState(INITIAL)
  const [errors,  setErrors]  = useState({})
  const [submitting, setSubmitting] = useState(false)

  const { addLead }  = useLeads()
  const showToast    = useContext(ToastContext)
  const navigate     = useNavigate()

  const handleChange = useCallback((field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    try {
      // ── In production: replace with await leadsApi.create(form) ──────────
      await new Promise(r => setTimeout(r, 400)) // simulate network
      addLead(form)
      showToast?.('Lead created successfully!', 'success')
      navigate('/leads')
    } catch (err) {
      showToast?.(err.message || 'Failed to create lead', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const f = (field) => ({
    id:       field,
    value:    form[field],
    onChange: handleChange(field),
    error:    errors[field],
  })

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-8">

        {/* Contact */}
        <FormSection icon={Users} title="Contact Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Full Name"    placeholder="e.g. Arjun Mehta"         required {...f('name')} />
            <FormInput label="Phone Number" placeholder="e.g. +91 98xxx xxxxx"     required type="tel" {...f('phone')} />
          </div>
        </FormSection>

        {/* Project & Source */}
        <FormSection icon={Building2} title="Project & Source">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Project" type="select" options={PROJECTS} required {...f('project')} />
            <FormInput label="Lead Source" type="select" options={SOURCES} required {...f('source')} />
          </div>
        </FormSection>

        {/* Classification */}
        <FormSection icon={Zap} title="Lead Classification">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Status"     type="select" options={STATUSES} {...f('status')} />
            <FormInput label="Deal Value" placeholder="e.g. ₹75L or 1.2Cr"        type="text" {...f('value')} />
          </div>
        </FormSection>

        {/* Notes */}
        <FormSection icon={FileText} title="Notes">
          <FormInput
            label="Remarks"
            type="textarea"
            placeholder="Add any remarks, follow-up context, or special requirements…"
            hint="Optional — visible only to your team"
            {...f('notes')}
          />
        </FormSection>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/leads')}
            className="btn-secondary"
            disabled={submitting}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <CheckCircle2 size={15} />
                Save Lead
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
