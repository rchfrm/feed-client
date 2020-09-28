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
      <rect width="318" height="56" rx="28" transform="matrix(-4.37114e-08 1 1 4.37114e-08 85 11)" fill={fill} />
      <path d="M184 82C184 121.212 152.212 153 113 153C73.7878 153 42 121.212 42 82C42 42.7878 73.7878 11 113 11C152.212 11 184 42.7878 184 82Z" fill={fill} />
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
