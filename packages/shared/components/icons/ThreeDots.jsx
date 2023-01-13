import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const ThreeDotsIcon = ({ className, style, fill }) => {
  return (
    <svg
      width="16"
      height="3"
      viewBox="0 0 16 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect x="0.570068" y="3" width="3" height="3" rx="1.5" transform="rotate(-90 0.570068 3)" fill={fill} />
      <rect x="6.57007" y="3" width="3" height="3" rx="1.5" transform="rotate(-90 6.57007 3)" fill={fill} />
      <rect x="12.5701" y="3" width="3" height="3" rx="1.5" transform="rotate(-90 12.5701 3)" fill={fill} />
    </svg>
  )
}

ThreeDotsIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  style: PropTypes.object,
}

ThreeDotsIcon.defaultProps = {
  className: '',
  fill: brandColors.textColor,
  style: null,
}

export default ThreeDotsIcon
