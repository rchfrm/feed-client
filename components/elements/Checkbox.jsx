// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
// IMPORT STYLES

function Checkbox(props) {
  const bgColour = props.selected ? props.colour : brandColours.lightGrey.hex

  return (
    <div
      style={{
        width: `${props.width}px`,
        height: `${props.width}px`,
        backgroundColor: bgColour,
        border: `1px solid ${brandColours.white.hex}`,
        borderRadius: 3,
      }}
    />
  )
}

export default Checkbox
