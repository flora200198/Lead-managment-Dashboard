import React, { memo } from 'react'
import { STATUS_STYLES, STATUS_ICONS } from '../../utils/helpers'

/**
 * Badge
 * Props:
 *   status  – 'Hot' | 'Warm' | 'Callback' | 'New'
 *   showDot – show coloured dot (default true)
 */
function Badge({ status, showDot = true, className = '' }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.New
  return (
    <span className={`badge ${style.badge} ${className}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />}
      {STATUS_ICONS[status]} {status}
    </span>
  )
}

export default memo(Badge)
