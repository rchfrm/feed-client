import React from 'react'

function AsteriskIcon(props) {
  const name = 'Asterisk'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      width={props.width}
    >
      <title>{name}</title>

      <rect
        y="240"
        width="600"
        height="120"
        transform="translate(600 0) rotate(90)"
        fill={props.fill}
      />

      <rect
        y="240"
        width="600"
        height="120"
        transform="translate(600 600) rotate(-180)"
        fill={props.fill}
      />

      <rect
        y="240"
        width="600"
        height="120"
        transform="translate(724.26 300) rotate(135)"
        fill={props.fill}
      />

      <rect
        y="240"
        width="600"
        height="120"
        transform="translate(300 724.26) rotate(-135)"
        fill={props.fill}
      />

    </svg>
  )
}

export default AsteriskIcon
