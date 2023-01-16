import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const PencilIcon = ({ className, fill, style }) => {
  const name = 'Pencil'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name={name}
      viewBox="0 0 600 600"
      className={className}
      style={style}
    >
      <title>{name}</title>
      <rect
        fill={fill}
        x="91.8"
        y="268.2"
        width="360"
        height="120"
        transform="translate(-152.435 288.331)rotate(-45)"
      />
      <rect
        fill={fill}
        x="402.9"
        y="107.1"
        width="120"
        height="60"
        transform="translate(693.3 561.354)rotate(-135)"
      />
      <polygon
        fill={fill}
        points="73.5 526.6 102.1 413 187 497.9 73.5 526.6"
      />
    </svg>
  )
}

PencilIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

PencilIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
  style: null,
}


export default PencilIcon
