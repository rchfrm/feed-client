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

function Tile({ id, isArrayLengthOne, selected, readOnly, children }) {
  return (
    <li
      key={id}
      id={id}
      className={`tile ${isArrayLengthOne ? 'singular' : ''} ${selected ? 'selected' : 'deselected'} ${readOnly ? 'readonly' : ''}`}
    >
      {children}
    </li>
  )
}

export default Tile
