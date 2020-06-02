// IMPORT PACKAGES
import React from 'react'

function MediaFallback({ className }) {
  return <img src="/images/fallback.png" alt="Media not found" className={className} />
}

export default MediaFallback
