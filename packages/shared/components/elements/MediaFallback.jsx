// IMPORT PACKAGES
import React from 'react'

import BrokenImageIcon from '@/icons/BrokenImageIcon'

function MediaFallback({ className, brokenImageColor }) {
  return (
    <div className={['media--fallback', className].join(' ')}>
      <BrokenImageIcon className="icon" circleFill={brokenImageColor} />
    </div>
  )
}

export default MediaFallback
