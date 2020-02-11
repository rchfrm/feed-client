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
import './error.css'

function Error(props) {
  if (props.error) {
    return (
      <p className="error">{props.error.message}</p>
    )
  }

  if (props.success) {
    return (
      <p className="success">{props.success}</p>
    )
  }

  return null
}

export default Error
