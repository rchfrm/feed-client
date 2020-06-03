// IMPORT PACKAGES
import React from 'react'

import BrokenImageIcon from '../icons/BrokenImageIcon'

function MediaFallback({ className }) {
  return (
    <div className={['media--fallback', className].join(' ')}>
      <BrokenImageIcon className="icon" />
    </div>
  )
}

export default MediaFallback
