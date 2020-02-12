// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS

function PageHeader(props) {
  const punctuation = props.punctuation || '.'

  return (
    <div className="page-header">
      <h1>{props.heading + punctuation}</h1>
    </div>
  )
}

export default PageHeader
