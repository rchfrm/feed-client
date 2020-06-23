
import React from 'react'

function ThreeDotsIcon({ height, fill }) {
  const name = 'Context'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 300"
      height={height}
    >
      <title>{name}</title>

      <rect
        y="120"
        width="60"
        height="60"
        transform="translate(60 300) rotate(180)"
        fill={fill}
      />

      <rect
        width="60"
        height="60"
        transform="translate(60 60) rotate(180)"
        fill={fill}
      />

      <rect
        y="240"
        width="60"
        height="60"
        transform="translate(60 540) rotate(180)"
        fill={fill}
      />

    </svg>
  )
}

export default ThreeDotsIcon
