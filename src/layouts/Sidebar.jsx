import React, { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, UserPlus, Zap, X,
  TrendingUp, Settings, HelpCircle,
} from 'lucide-react'
import { useLeads } from '../context/LeadsContext'

// ── Nav config ─────────────────────────────────────────────────────────────────
const PRIMARY_NAV = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Leads',     path: '/leads',     icon: Users,     badgeKey: 'total' },
  { label: 'Add Lead',  path: '/leads/add', icon: UserPlus },
]

const SECONDARY_NAV = [
  { label: 'Analytics', path: '/analytics', icon: TrendingUp, disabled: true },
  { label: 'Settings',  path: '/settings',  icon: Settings,   disabled: true },
  { label: 'Help',      path: '/help',       icon: HelpCircle, disabled: true },
]

// ── Sub-components ─────────────────────────────────────────────────────────────
function NavItem({ to, icon: Icon, label, badge, disabled }) {
  if (disabled) {
    return (
      <div className="nav-item opacity-40 cursor-not-allowed select-none">
        <Icon size={16} strokeWidth={1.8} />
        <span className="flex-1">{label}</span>
        <span className="text-[10px] font-medium text-slate-500 bg-slate-700/40 px-1.5 py-0.5 rounded">Soon</span>
      </div>
    )
  }
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
    >
      <Icon size={16} strokeWidth={1.8} />
      <span className="flex-1">{label}</span>
      {badge != null && (
        <span className="text-[10px] font-semibold text-brand-300 bg-brand-500/20 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ isOpen, onClose }) {
  const { stats } = useLeads()
  const badgeMap   = { total: stats.total }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-[220px] flex-shrink-0
         bg-blue-100 flex flex-col transition-transform duration-200
        lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between gap-2 px-5 py-5 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center">
            <Zap size={14} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">LeadFlow</p>
            <p className="text-slate-500 text-[10px] tracking-wider uppercase mt-0.5">CRM</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white p-1">
          <X size={15} />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        <p className="section-title text-slate-600 px-3 mb-2 text-[10px]">Main</p>
        {PRIMARY_NAV.map(item => (
          <NavItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            badge={item.badgeKey ? badgeMap[item.badgeKey] : undefined}
          />
        ))}

        <p className="section-title text-slate-600 px-3 mt-5 mb-2 text-[10px]">Other</p>
        {SECONDARY_NAV.map(item => (
          <NavItem key={item.path} to={item.path} icon={item.icon} label={item.label} disabled={item.disabled} />
        ))}
      </div>

      {/* User card */} 
      <div className="p-3 border-t border-white/[0.07]">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/[0.05] cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
            RS
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-xs font-medium leading-none truncate">Rohit Saxena</p>
            <p className="text-slate-500 text-[10px] mt-0.5 truncate">Sales Manager</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default memo(Sidebar)
