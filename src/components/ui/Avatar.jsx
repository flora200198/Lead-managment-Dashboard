import React, { memo } from 'react'
import { getInitials, getAvatarColor } from '../../utils/helpers'

/**
 * Avatar
 * Shows initials with a deterministic background colour.
 * size: 'sm' | 'md' | 'lg'
 */
const SIZE = {
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
}

function Avatar({ name = '', size = 'md', className = '' }) {
  return (
    <div
      className={`${SIZE[size]} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 ${className}`}
      style={{ background: getAvatarColor(name) }}
      title={name}
    >
      {getInitials(name)}
    </div>
  )
}

export default memo(Avatar)
