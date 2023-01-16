import React from 'react'
import brandColors from '@/constants/brandColors'

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
