import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const ClipboardIcon = ({ fill, className }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3H18C19.1046 3 20 3.89543 20 5V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V5C4 3.89543 4.89543 3 6 3H8ZM8 5H6V20H18V5H16V6C16 6.55228 15.5523 7 15 7H9C8.44772 7 8 6.55228 8 6V5ZM14 4H10V5H14V4Z"
        fill={fill}
      />
    </svg>
  )
}

ClipboardIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

ClipboardIcon.defaultProps = {
  fill: brandColors.black,
  className: '',
}


export default ClipboardIcon
