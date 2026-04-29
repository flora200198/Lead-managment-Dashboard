import React from 'react'
import { CheckCircle2, AlertCircle, XCircle, X, Info } from 'lucide-react'

const TYPE_STYLES = {
  success: { icon: CheckCircle2, bg: 'bg-emerald-600', ring: 'ring-emerald-500/30' },
  error:   { icon: XCircle,      bg: 'bg-red-600',     ring: 'ring-red-500/30'     },
  warning: { icon: AlertCircle,  bg: 'bg-amber-500',   ring: 'ring-amber-500/30'   },
  info:    { icon: Info,         bg: 'bg-brand-500',   ring: 'ring-brand-500/30'   },
}

function Toast({ toast, onDismiss }) {
  const { icon: Icon, bg, ring } = TYPE_STYLES[toast.type] ?? TYPE_STYLES.success

  return (
    <div className={`flex items-center gap-3 pr-3 pl-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg ring-1 ${bg} ${ring} animate-toast-in`}>
      <Icon size={16} strokeWidth={2} />
      <span className="flex-1">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="opacity-70 hover:opacity-100 transition-opacity ml-1">
        <X size={14} />
      </button>
    </div>
  )
}

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 w-80 max-w-[calc(100vw-3rem)]">
      {toasts.map(t => <Toast key={t.id} toast={t} onDismiss={onDismiss} />)}
    </div>
  )
}
