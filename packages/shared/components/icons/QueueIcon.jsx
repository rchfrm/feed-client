
import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const QueueIcon = ({ color, className, style }) => {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <circle cx="12.3927" cy="4.79746" r="4.29746" fill={color} stroke="#F4F4F4" />
      <circle cx="8.59434" cy="8.59507" r="4.29746" fill={color} stroke="#F4F4F4" />
      <circle cx="4.79746" cy="12.2025" r="4.29746" fill={color} stroke="#F4F4F4" />
    </svg>
  )
}

QueueIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

QueueIcon.defaultProps = {
  color: brandColors.textColor,
  className: null,
  style: null,
}

export default QueueIcon
