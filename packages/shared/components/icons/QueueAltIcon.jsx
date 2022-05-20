import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const QueueAltIcon = ({ color, secondaryColor, className, style }) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <circle cx="12.3927" cy="3.79746" r="3.29746" fill={secondaryColor} stroke={color} strokeDasharray="1 1" />
      <circle cx="8.59434" cy="7.59507" r="3.29746" fill={secondaryColor} stroke={color} strokeDasharray="1 1" />
      <circle cx="8.59434" cy="7.59507" r="4.29746" stroke={secondaryColor} />
      <circle cx="4.79746" cy="11.2025" r="4.29746" fill={color} stroke={secondaryColor} />
    </svg>
  )
}

QueueAltIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

QueueAltIcon.defaultProps = {
  color: brandColors.textColor,
  className: null,
  style: null,
}

export default QueueAltIcon
