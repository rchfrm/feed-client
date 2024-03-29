import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const { black } = brandColors

const HeartIcon = ({
  fill,
  className,
  style,
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 20 18"
      width="20"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M10 1.52765C7.64418 -0.583106 4.02125 -0.506535 1.75736 1.75736C-0.585786 4.1005 -0.585786 7.8995 1.75736 10.2426L8.58579 17.0711C9.36684 17.8521 10.6332 17.8521 11.4142 17.0711L18.2426 10.2426C20.5858 7.8995 20.5858 4.1005 18.2426 1.75736C15.9787 -0.506535 12.3558 -0.583106 10 1.52765ZM8.82843 3.17157L9.29289 3.63604C9.68342 4.02656 10.3166 4.02656 10.7071 3.63604L11.1716 3.17157C12.7337 1.60948 15.2663 1.60948 16.8284 3.17157C18.3905 4.73367 18.3905 7.26633 16.8284 8.82843L10 15.6569L3.17157 8.82843C1.60948 7.26633 1.60948 4.73367 3.17157 3.17157C4.73367 1.60948 7.26633 1.60948 8.82843 3.17157Z"
        fill={fill}
      />
    </svg>
  )
}

HeartIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

HeartIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
}

export default HeartIcon
