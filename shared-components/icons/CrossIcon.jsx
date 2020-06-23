import React from 'react'

function CrossIcon({ data, width, fill }) {
  const name = 'Cross'
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
        y="270"
        width="600"
        height="60"
        transform="translate(300 724.264)rotate(-135)"
        data-item={data}
      />
      <rect
        fill={fill}
        y="270"
        width="600"
        height="60"
        transform="translate(-124.264 300)rotate(-45)"
        data-item={data}
      />
    </svg>
  )
}

export default CrossIcon
