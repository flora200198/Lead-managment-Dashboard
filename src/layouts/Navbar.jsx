import React, { memo, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, Bell, Search, Plus } from 'lucide-react'
import { ToastContext } from './AppLayout'

const ROUTE_META = {
  '/dashboard': { title: 'Dashboard',  sub: 'Welcome back, Rohit 👋' },
  '/leads':     { title: 'All Leads',  sub: 'Manage and track your pipeline' },
  '/leads/add': { title: 'Add Lead',   sub: 'Create a new lead record' },
}

function Navbar({ onMenuClick }) {
  const location = useLocation()
  const meta     = ROUTE_META[location.pathname] ?? { title: 'LeadFlow', sub: '' }

  return (
    <header className="flex-shrink-0 h-[60px] bg-white border-b border-gray-100 flex items-center px-5 md:px-8 gap-4 z-10">

      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-lg text-ink-secondary hover:bg-surface-tertiary transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-ink leading-none">{meta.title}</h1>
        <p className="text-xs text-ink-muted mt-0.5 hidden sm:block">{meta.sub}</p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Quick add shortcut */}
        <Link
          to="/leads/add"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-medium rounded-lg transition-colors"
        >
          <Plus size={13} />
          New Lead
        </Link>

        {/* Notification */}
        <div className="relative">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-ink-secondary hover:bg-surface-tertiary transition-colors">
            <Bell size={15} />
          </button>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-[11px] font-semibold text-white cursor-pointer">
          RS
        </div>
      </div>
    </header>
  )
}

export default memo(Navbar)
