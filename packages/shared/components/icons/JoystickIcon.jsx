import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const JoystickIcon = ({ fill, className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 8.66554C11.2473 8.23328 11.75 7.42535 11.75 6.5C11.75 5.11929 10.6307 4 9.25 4C7.86929 4 6.75 5.11929 6.75 6.5C6.75 7.42535 7.25275 8.23328 8 8.66554V17.5H5.575C4.70515 17.5 4 17.9096 4 18.75C4 19.5904 4.70515 20 5.575 20H18.175C19.0448 20 19.75 19.5904 19.75 18.75C19.75 17.9096 19.0448 17.5 18.175 17.5H17.23C17.23 16.4915 16.3838 15.6739 15.34 15.6739C14.2962 15.6739 13.45 16.4915 13.45 17.5H10.5V8.66554Z"
        fill={fill}
      />
    </svg>

  )
}

JoystickIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

JoystickIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
}


export default JoystickIcon
