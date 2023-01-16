import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const ArrowHeadIcon = ({ fill, className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      width="500"
      height="388"
      viewBox="0 0 500 388"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M250.251 0H500L250.251 388L0 0H250.251Z"
        fill={fill}
      />
    </svg>
  )
}

ArrowHeadIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ArrowHeadIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
  style: null,
}


export default ArrowHeadIcon
