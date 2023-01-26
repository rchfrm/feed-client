import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const FolderIcon = ({ fill, className }) => {
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
        d="M2 6C2 4.89543 2.89543 4 4 4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289L11.4142 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM8.58579 6L4 6V18H20V8H11C10.7348 8 10.4804 7.89464 10.2929 7.70711L8.58579 6Z"
        fill={fill}
      />
    </svg>
  )
}

FolderIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

FolderIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
}


export default FolderIcon
