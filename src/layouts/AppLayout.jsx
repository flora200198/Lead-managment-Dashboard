import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar  from './Navbar'
import ToastContainer from '../components/ui/ToastContainer'
import { useToast } from '../hooks/useToast'
import { Outlet } from "react-router-dom";

// Context so any child can fire toasts without prop-drilling
export const ToastContext = React.createContext(null)

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toasts, showToast, dismissToast } = useToast()

  return (
    <ToastContext.Provider value={showToast}>
      <div className="flex h-screen overflow-hidden bg-surface-secondary">

        {/* ── Mobile overlay ─────────────────────────────────────── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ────────────────────────────────────────────── */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* ── Main column ────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(o => !o)} />

          <main className="flex-1 overflow-y-auto px-5 py-6 md:px-8">
            {/* {children} */}
            <Outlet />
          </main>
        </div>

        {/* ── Toast notifications ─────────────────────────────────── */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    </ToastContext.Provider>
  )
}
