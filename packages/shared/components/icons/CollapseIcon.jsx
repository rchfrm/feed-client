import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const CollapseIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect width="30" height="30" rx="4" fill="#F4F4F4" />
      <path d="M8 7.55624L9.6723 6L16 11.8896L22.3277 6L24 7.55624L16 15L8 7.55624Z" fill={fill} />
      <path d="M8 24.4438L9.6723 26L16 20.1104L22.3277 26L24 24.4438L16 17L8 24.4438Z" fill={fill} />
      <rect x="1" y="1" width="30" height="30" rx="3" stroke={fill} strokeWidth="2" />
    </svg>
  )
}

CollapseIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

CollapseIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}

export default CollapseIcon
