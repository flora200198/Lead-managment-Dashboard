/**
 * utils/helpers.js
 * Pure helper functions — no React imports.
 */

/** Returns 1–2 uppercase initials from a full name */
export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

/** Deterministic colour from a string (for avatars, etc.) */
const AVATAR_COLORS = [
  '#6366f1', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#14b8a6',
]

export function getAvatarColor(name = '') {
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0)
  return AVATAR_COLORS[code % AVATAR_COLORS.length]
}

/** Format an ISO date string to a readable date */
export function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  })
}

/** Format ISO to short date e.g. "Apr 28" */
export function formatDateShort(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'short',
  })
}

/** Truncate a string to maxLen characters */
export function truncate(str = '', maxLen = 30) {
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str
}

/** Status badge style map */
export const STATUS_STYLES = {
  Hot:      { badge: 'bg-red-50 text-red-700 ring-1 ring-red-200',    dot: 'bg-red-500'   },
  Warm:     { badge: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200', dot: 'bg-orange-400' },
  Callback: { badge: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200', dot: 'bg-emerald-500' },
  New:      { badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200', dot: 'bg-blue-500'  },
}

export const STATUS_ICONS = {
  Hot:      '🔥',
  Warm:     '☀️',
  Callback: '📞',
  New:      '✨',
}

/** Source icon map */
export const SOURCE_ICONS = {
  Website:   '🌐',
  Referral:  '🤝',
  Facebook:  'f',
  Instagram: '📸',
  'Walk-in': '🚶',
  Google:    'G',
  Others:    '•',
}
