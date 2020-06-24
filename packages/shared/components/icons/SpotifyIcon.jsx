import React from 'react'

function SpotifyIcon({ width, fill }) {
  const name = 'Spotify'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      viewBox="0 0 170 170"
      width={width}
    >
      <path
        fill={fill}
        d="M85 1C39 1 1 39 1 85c0 46 38 84 84 84 46 0 84-37 84-84C169 39 131 1 85 1zM123 122c-1 3-5 3-7 2 -20-12-44-15-74-8 -3 1-6-1-6-4 -1-3 1-6 4-6 32-7 59-4 81 9C124 116 125 120 123 122zM134 99c-2 3-6 4-9 2 -22-14-57-18-83-10 -3 1-7-1-8-4 -1-3 1-7 4-8 30-9 68-5 94 11C135 92 136 96 134 99zM135 76c-27-16-71-17-97-10 -4 1-8-1-10-5 -1-4 1-8 5-10 30-9 79-7 110 11 4 2 5 7 3 11C143 77 138 78 135 76z"
      />
    </svg>
  )
}

export default SpotifyIcon
