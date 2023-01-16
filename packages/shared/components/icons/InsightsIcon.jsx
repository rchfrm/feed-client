import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const InsightsIcon = ({ className, fill }) => {
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
        d="M12 4C12.5523 4 13 4.44772 13 5V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V5C11 4.44772 11.4477 4 12 4ZM17 8C17.5523 8 18 8.44772 18 9V19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V9C16 8.44772 16.4477 8 17 8ZM7 12C7.55228 12 8 12.4477 8 13V19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V13C6 12.4477 6.44772 12 7 12Z"
        fill={fill}
      />
    </svg>
  )
}

InsightsIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

InsightsIcon.defaultProps = {
  className: '',
  fill: black,
}

export default InsightsIcon
