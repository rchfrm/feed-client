import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const LockIcon = ({ fill, className, style }) => {
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
        d="M12 4C13.6477 4 15 5.35228 15 7V10H9V7C9 5.35228 10.3523 4 12 4ZM17 10V7C17 4.24772 14.7523 2 12 2C9.24771 2 7 4.24772 7 7V10H6C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12C20 10.8954 19.1046 10 18 10H17ZM6 12H18V20H6V12Z"
        fill={fill}
      />
    </svg>
  )
}

LockIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

LockIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}

export default LockIcon
