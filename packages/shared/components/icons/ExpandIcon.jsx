import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const ExpandIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect x="0.5" y="1.07001" width="29" height="29" rx="3.5" fill="#F4F4F4" />
      <path d="M20.3334 13.5325L19.2185 14.57L15.0001 10.6436L10.7816 14.57L9.66675 13.5325L15.0001 8.57001L20.3334 13.5325Z" fill={fill} />
      <path d="M20.3334 17.6075L19.2185 16.57L15.0001 20.4964L10.7816 16.57L9.66675 17.6075L15.0001 22.57L20.3334 17.6075Z" fill={fill} />
      <rect x="0.5" y="1.07001" width="29" height="29" rx="3.5" stroke={fill} />
    </svg>
  )
}

ExpandIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ExpandIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}

export default ExpandIcon
