// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'
// IMPORT HELPERS
// IMPORT STYLES

function Checkbox({ color, selected, width }) {
  const bgColor = selected ? color : brandColors.greyLight

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${width}px`,
        backgroundColor: bgColor,
        border: `1px solid ${brandColors.offwhite}`,
        borderRadius: 3,
      }}
    />
  )
}

export default Checkbox
