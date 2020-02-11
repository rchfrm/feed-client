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
import './square-image.css'

function SquareImage(props) {
  const { media } = props
  return (
    <div className="square-image">
      {media}
    </div>
  )
}

export default SquareImage
