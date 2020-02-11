import React from 'react'

function ArchFormLogo(props) {
  const name = 'archForm'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      width={props.width}
      viewBox="0 0 599.8 700.9"
    >
      <title>{name}</title>
      <path
        fill={props.fill}
        d="M269.9 135.8c0-74.5-60.4-135-135-135S0 61.3 0 135.8v184.7h269.9V135.8z"
      />
      <path
        fill={props.fill}
        d="M269.9 515.5c0-74.5-60.4-135-135-135S0 441 0 515.5v185.3h269.9V515.5z"
      />
      <path
        fill={props.fill}
        d="M599.8 700.9H329.9V515.5c0-74.5 60.4-135 135-135v-60h-135V135.8c0-74.5 60.4-135 135-135s135 60.4 135 135V700.9z"
      />
    </svg>
  )
}

export default ArchFormLogo
