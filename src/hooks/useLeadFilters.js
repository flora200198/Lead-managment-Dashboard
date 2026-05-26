import { useState, useMemo } from 'react'

/**
 * useLeadFilters
 * Encapsulates filtering + search logic for the Leads table.
 * Keeps the Leads page component thin.
 */
export function useLeadFilters(leads = []) {
  const [search,     setSearch]     = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [productFilter, setProductFilter] = useState('')
  const [sortKey,    setSortKey]    = useState('createdAt')
  const [sortDir,    setSortDir]    = useState('desc')

  const filtered = useMemo(() => {
    let result = [...leads]

    if (statusFilter !== 'All') {
      result = result.filter(l => l.status === statusFilter)
    }

    if (sourceFilter !== 'All') {
      result = result.filter(l => l.source === sourceFilter)
    }

      if (productFilter) {
      result = result.filter(l => l.product === productFilter)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(l =>
        l.name.toLowerCase().includes(q)    ||
        l.phone.toLowerCase().includes(q)   ||
        l.project.toLowerCase().includes(q) ||
        l.source.toLowerCase().includes(q)
      )
    }

    result.sort((a, b) => {
      let va = a[sortKey] ?? ''
      let vb = b[sortKey] ?? ''
      if (typeof va === 'string') va = va.toLowerCase()
      if (typeof vb === 'string') vb = vb.toLowerCase()
      if (va < vb) return sortDir === 'asc' ? -1 :  1
      if (va > vb) return sortDir === 'asc' ?  1 : -1
      return 0
    })

    return result
  }, [leads, search, statusFilter, sourceFilter, productFilter, sortKey, sortDir])

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const resetFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setSourceFilter('All')
    setProductFilter('')
  }

  return {
    filtered,
    search, setSearch,
    statusFilter, setStatusFilter,
    sourceFilter, setSourceFilter,
    productFilter, setProductFilter,
    sortKey, sortDir, toggleSort,
    resetFilters,
  }
}
