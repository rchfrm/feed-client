import React from 'react'

function CrossIcon({ fill, className }) {
  const name = 'Cross'
  return (
    <svg
      width="416"
      height="367"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{name}</title>
      <rect
        fill={fill}
        y="270"
        width="600"
        height="60"
        transform="translate(300 724.264)rotate(-135)"
      />
      <rect
        fill={fill}
        y="270"
        width="600"
        height="60"
        transform="translate(-124.264 300)rotate(-45)"
      />
    </svg>
  )
}

export default CrossIcon
