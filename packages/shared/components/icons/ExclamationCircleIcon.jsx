import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const ExclamationCircleIcon = ({ color, className, style }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
        fill={color}
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12 14C11.4477 14 11 13.5523 11 13L11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7L13 13C13 13.5523 12.5523 14 12 14Z"
        fill={color}
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5Z"
        fill={color}
      />
    </svg>
  )
}

ExclamationCircleIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ExclamationCircleIcon.defaultProps = {
  color: brandColors.black,
  className: null,
  style: null,
}

export default ExclamationCircleIcon
