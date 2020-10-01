import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const JoystickIcon = ({ fill, className }) => {
  return (
    <svg
      className={className}
      width="334"
      height="384"
      viewBox="0 0 334 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="271" width="334" height="113" rx="30" fill={fill} />
      <rect x="205" y="241" width="62" height="59" rx="10" fill={fill} />
      <rect width="311" height="56" rx="28" transform="matrix(-4.37114e-08 1 1 4.37114e-08 85 18)" fill={fill} />
      <path d="M180 78C180 114.451 150.451 144 114 144C77.5492 144 48 114.451 48 78C48 41.5492 77.5492 12 114 12C150.451 12 180 41.5492 180 78Z" fill={fill} />
    </svg>
  )
}

JoystickIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

JoystickIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
}


export default JoystickIcon
