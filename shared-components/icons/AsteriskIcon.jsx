import React from 'react'

function AsteriskIcon({ width, fill, className }) {
  const name = 'Asterisk'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      width={width}
      className={className || ''}
    >
      <title>{name}</title>

      <rect
        y="240"
        width="600"
        height="120"
        transform="translate(600 0) rotate(90)"
        fill={fill}
      />

      <rect
        y="240"
        width="600"
        height="120"
        transform="translate(600 600) rotate(-180)"
        fill={fill}
      />

      <rect
        y="240"
        width="600"
        height="120"
        transform="translate(724.26 300) rotate(135)"
        fill={fill}
      />

      <rect
        y="240"
        width="600"
        height="120"
        transform="translate(300 724.26) rotate(-135)"
        fill={fill}
      />

    </svg>
  )
}

export default AsteriskIcon
