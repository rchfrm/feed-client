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

function Error({ error, success }) {
  if (error) {
    return (
      <p className="error">{error.message}</p>
    )
  }

  if (success) {
    return (
      <p className="success">{success}</p>
    )
  }

  return null
}

export default Error
