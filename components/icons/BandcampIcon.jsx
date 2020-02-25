import React from 'react'

function BandcampIcon(props) {
  const name = 'Bandcamp'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 418.83 246.11"
      width={props.width}
      name={name}
    >
      <title>{name}</title>

      <polygon
        fill={props.fill}
        points="285.5 246.11 0 246.11 133.32 0 418.83 0 285.5 246.11"
      />

    </svg>
  )
}

export default BandcampIcon
