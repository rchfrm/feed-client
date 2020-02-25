import React from 'react'

function MenuIcon(props) {
  const name = 'Menu'
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
        y="274"
        width="441.4"
        height="60"
        transform="translate(441.388 608.063)rotate(180)"
      />
      <rect
        fill={props.fill}
        x="-0.5"
        y="94"
        width="600"
        height="60"
        transform="translate(599.081 248.063)rotate(180)"
      />
      <rect
        fill={props.fill}
        x="-0.5"
        y="454"
        width="600"
        height="60"
        transform="translate(599.081 968.063)rotate(180)"
      />
    </svg>
  )
}

export default MenuIcon
