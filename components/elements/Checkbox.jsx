// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '../../constants/brandColors'
// IMPORT HELPERS
// IMPORT STYLES

function Checkbox(props) {
  const bgColor = props.selected ? props.color : brandColors.greyLight

  return (
    <div
      style={{
        width: `${props.width}px`,
        height: `${props.width}px`,
        backgroundColor: bgColor,
        border: `1px solid ${brandColors.white}`,
        borderRadius: 3,
      }}
    />
  )
}

export default Checkbox
