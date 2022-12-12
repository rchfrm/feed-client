import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const ArrowLine = ({
  fill,
  strokeWidth,
  lineLength,
  hideCap,
  className,
  style,
}) => {
  const height = lineLength + 1
  return (
    <svg
      className={className}
      style={style}
      width="14"
      height={height}
      viewBox={`0 0 14 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* CAP */}
      {! hideCap && (
        <>
          <path d="M7 1L1.5 8" stroke={fill} strokeWidth={strokeWidth} strokeLinecap="round" />
          <path d="M7 1L12.5 8" stroke={fill} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      )}
      {/* LINE */}
      <line x1="7" y1="1" x2="7" y2={lineLength} stroke={fill} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

ArrowLine.propTypes = {
  fill: PropTypes.string,
  strokeWidth: PropTypes.number,
  lineLength: PropTypes.number,
  hideCap: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

ArrowLine.defaultProps = {
  fill: brandColors.textColor,
  strokeWidth: 2,
  lineLength: 44,
  hideCap: false,
  className: null,
  style: null,
}


export default ArrowLine
