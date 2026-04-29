import { useState, useCallback, useRef } from 'react'

/**
 * useToast
 * A lightweight toast notification hook.
 * Usage:
 *   const { toasts, showToast } = useToast()
 *   showToast('Lead saved!', 'success')
 */
export function useToast() {
  const [toasts, setToasts] = useState([])
  const timerRef = useRef({})

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])

    timerRef.current[id] = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
      delete timerRef.current[id]
    }, duration)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id])
      delete timerRef.current[id]
    }
  }, [])

  return { toasts, showToast, dismissToast }
}
