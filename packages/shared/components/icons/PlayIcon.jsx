import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const PlayIcon = ({ color, className }) => {
  return (
    <svg
      className={className}
      width="310"
      height="381"
      viewBox="0 0 310 381"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M0 370.7V10.2999C0 2.23091 8.87913 -2.69461 15.7372 1.57002L305.146 181.537C311.614 185.559 311.619 194.961 305.156 198.99L15.7473 379.424C8.88969 383.699 0 378.774 0 370.7Z"
      />
    </svg>

  )
}

PlayIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
}

PlayIcon.defaultProps = {
  color: brandColors.black,
  className: '',
}


export default PlayIcon
