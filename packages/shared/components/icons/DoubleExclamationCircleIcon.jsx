import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const DoubleExclamationCircleIcon = ({ color, className, style }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M7.5 13.9453C11.0596 13.9453 13.9453 11.0596 13.9453 7.5C13.9453 3.94035 11.0596 1.05469 7.5 1.05469C3.94035 1.05469 1.05469 3.94035 1.05469 7.5C1.05469 11.0596 3.94035 13.9453 7.5 13.9453ZM7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill={color} />
      <path d="M5.55997 8.68796V4.07996H6.68317V8.68796H5.55997ZM6.12637 10.9344C5.88317 10.9344 5.67837 10.8544 5.51197 10.6944C5.35197 10.5344 5.27197 10.3296 5.27197 10.08C5.27197 9.83676 5.35197 9.63516 5.51197 9.47516C5.67837 9.31516 5.88317 9.23516 6.12637 9.23516C6.36957 9.23516 6.57117 9.31516 6.73117 9.47516C6.89117 9.63516 6.97117 9.83996 6.97117 10.0896C6.97117 10.3392 6.89117 10.544 6.73117 10.704C6.57117 10.8576 6.36957 10.9344 6.12637 10.9344Z" fill={color} />
      <path d="M8.31622 8.68796V4.07996H9.43942V8.68796H8.31622ZM8.88262 10.9344C8.63942 10.9344 8.43462 10.8544 8.26822 10.6944C8.10822 10.5344 8.02822 10.3296 8.02822 10.08C8.02822 9.83676 8.10822 9.63516 8.26822 9.47516C8.43462 9.31516 8.63942 9.23516 8.88262 9.23516C9.12582 9.23516 9.32742 9.31516 9.48742 9.47516C9.64742 9.63516 9.72742 9.83996 9.72742 10.0896C9.72742 10.3392 9.64742 10.544 9.48742 10.704C9.32742 10.8576 9.12582 10.9344 8.88262 10.9344Z" fill={color} />
    </svg>
  )
}

DoubleExclamationCircleIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

DoubleExclamationCircleIcon.defaultProps = {
  color: brandColors.textColor,
  className: null,
  style: null,
}

export default DoubleExclamationCircleIcon
