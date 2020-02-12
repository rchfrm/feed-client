// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS

function PageHeader({ punctuation = '.', heading }) {
  return (
    <div className="page-header">
      <h1>{heading + punctuation}</h1>
    </div>
  )
}

export default PageHeader
