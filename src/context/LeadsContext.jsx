import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { MOCK_LEADS } from '../utils/mockData'

const LeadsContext = createContext(null)

export function LeadsProvider({ children }) {
  const [leads, setLeads]     = useState(MOCK_LEADS)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // ── Derived stats (memoised to avoid recomputation on every render) ─────────
  const stats = useMemo(() => ({
    total:    leads.length,
    hot:      leads.filter(l => l.status === 'Hot').length,
    warm:     leads.filter(l => l.status === 'Warm').length,
    callback: leads.filter(l => l.status === 'Callback').length,
  }), [leads])

  // ── Actions ──────────────────────────────────────────────────────────────────
  const addLead = useCallback((leadData) => {
    const newLead = {
      ...leadData,
      _id:       `local_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setLeads(prev => [newLead, ...prev])
    return newLead
  }, [])

  const updateLead = useCallback((id, updates) => {
    setLeads(prev => prev.map(l => l._id === id ? { ...l, ...updates } : l))
  }, [])

  const deleteLead = useCallback((id) => {
    setLeads(prev => prev.filter(l => l._id !== id))
  }, [])

  const value = useMemo(() => ({
    leads,
    stats,
    loading,
    error,
    addLead,
    updateLead,
    deleteLead,
  }), [leads, stats, loading, error, addLead, updateLead, deleteLead])

  return (
    <LeadsContext.Provider value={value}>
      {children}
    </LeadsContext.Provider>
  )
}


export function useLeads() {
  const ctx = useContext(LeadsContext)
  if (!ctx) throw new Error('useLeads must be used inside <LeadsProvider>')
  return ctx
}
