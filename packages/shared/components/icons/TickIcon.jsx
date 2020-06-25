import React from 'react'

function TickIcon({
  data,
  width,
  fill,
}) {
  const name = 'Tick'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      data-item={data}
      width={width}
      viewBox="0 0 600 600"
    >
      <title>{name}</title>
      <rect
        fill={fill}
        x="62.8"
        y="353.1"
        width="200.7"
        height="60"
        transform="translate(7.574 769.265)rotate(-135)"
        data-item={data}
      />
      <rect
        fill={fill}
        x="127"
        y="268"
        width="441.4"
        height="60"
        transform="translate(804.217 262.796)rotate(135)"
        data-item={data}
      />
    </svg>
  )
}

export default TickIcon
