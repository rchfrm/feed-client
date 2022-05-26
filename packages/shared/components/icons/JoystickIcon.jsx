import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const JoystickIcon = ({ fill, className }) => {
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="4.5" r="4.5" fill={fill} />
      <circle cx="17.75" cy="18.75" r="3.25" fill={fill} />
      <rect x="6" width="4" height="25" rx="2" fill={fill} />
      <rect y="19" width="25" height="6" rx="3" fill={fill} />
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
