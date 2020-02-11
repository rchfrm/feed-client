import React from 'react';

function YouTubeIcon(props) {
  const name = "YouTube";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width={props.width}
      name={name}
    >
      <title>{name}</title>

      <path
        fill={props.fill}
        d="M489.7,129.7c-5.8-21.4-22.7-38.3-44.1-44.1C406.5,75.4,250,75.4,250,75.4s-156.5,0-195.6,10.3
        c-21.4,5.8-38.3,22.7-44.1,44.1C0,168.9,0,250,0,250s0,81.5,10.3,120.3c5.8,21.4,22.7,38.3,44.1,44.1
        C93.5,424.6,250,424.6,250,424.6s156.5,0,195.6-10.3c21.4-5.8,38.3-22.7,44.1-44.1C500,331.1,500,250,500,250S500,168.9,489.7,129.7
        z M199.8,325.4V175.5l130.1,75L199.8,325.4z"
      />

    </svg>
  )
}

export default YouTubeIcon;

