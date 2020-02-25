import React from 'react'

function ArrowIcon(props) {
  const name = 'Arrow'
  const platform = props.platform || ''
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      width={props.width}
      viewBox="0 0 600 600"
      style={props.style}
      data-platform={platform}
    >
      <title>{name}</title>
      <polygon
        fill={props.fill}
        points="300 600 0 97.3 600 97.3 300 600"
        data-platform={platform}
      />
    </svg>
  )
}

export default ArrowIcon
