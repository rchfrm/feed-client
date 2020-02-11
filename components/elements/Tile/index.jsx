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

function Tile(props) {
  return (
    <li
      key={props.id}
      id={props.id}
      className={`tile ${props.isArrayLengthOne ? 'singular' : ''} ${props.selected ? 'selected' : 'deselected'} ${props.readOnly ? 'readonly' : ''}`}
    >
      {props.children}
    </li>
  )
}

export default Tile
