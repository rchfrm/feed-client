// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function Error({ error, success, messagePrefix = '' }) {
  if (!error || success) return null
  const { message: errorMessage } = error
  const message = `${messagePrefix}${errorMessage || success}`
  const className = error ? 'error' : 'success'
  return (
    <p className={className}>{message}</p>
  )
}

export default Error
