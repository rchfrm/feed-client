import React from 'react'

function PencilIcon(props) {
  const name = 'Pencil'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      width={props.width}
      viewBox="0 0 600 600"
    >
      <title>{name}</title>
      <rect
        fill={props.fill}
        x="91.8"
        y="268.2"
        width="360"
        height="120"
        transform="translate(-152.435 288.331)rotate(-45)"
      />
      <rect
        fill={props.fill}
        x="402.9"
        y="107.1"
        width="120"
        height="60"
        transform="translate(693.3 561.354)rotate(-135)"
      />
      <polygon
        fill={props.fill}
        points="73.5 526.6 102.1 413 187 497.9 73.5 526.6"
      />
    </svg>
  )
}

export default PencilIcon
