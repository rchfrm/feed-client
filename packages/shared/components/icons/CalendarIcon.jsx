import React from 'react'

function CalendarIcon({ width, fill }) {
  const name = 'Calendar'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      width={width}
      viewBox="0 0 600 600"
    >
      <title>{name}</title>
      <rect
        fill={fill}
        y="60"
        width="600"
        height="120"
      />
      <rect
        fill={fill}
        x="-210"
        y="330"
        width="480"
        height="60"
        transform="translate(389.987 330.004)rotate(90)"
      />
      <rect
        fill={fill}
        x="330"
        y="330"
        width="480"
        height="60"
        transform="translate(930.004 -210.013)rotate(90)"
      />
      <rect
        fill={fill}
        y="540"
        width="600"
        height="60"
      />
      <rect
        fill={fill}
        x="120"
        width="60"
        height="60"
        transform="translate(179.991 -119.991)rotate(90)"
      />
      <rect
        fill={fill}
        x="420"
        width="60"
        height="60"
        transform="translate(480.009 -420.009)rotate(90)"
      />
      <rect
        fill={fill}
        x="300"
        y="300"
        width="180"
        height="180"
        transform="translate(780.004 -0.013)rotate(90)"
      />
    </svg>
  )
}

export default CalendarIcon
