import React from 'react';

function CrossIcon(props) {
  const name = "Cross";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      data-item={props.data}
      width={props.width}
      viewBox="0 0 600 600"
    >
      <title>{name}</title>
      <rect
        fill={props.fill}
        y="270"
        width="600"
        height="60"
        transform="translate(300 724.264)rotate(-135)"
        data-item={props.data}
      />
      <rect
        fill={props.fill}
        y="270"
        width="600"
        height="60"
        transform="translate(-124.264 300)rotate(-45)"
        data-item={props.data}
      />
    </svg>
  )
}

export default CrossIcon;