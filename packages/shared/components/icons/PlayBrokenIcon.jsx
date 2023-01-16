
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M181.936 275.812L193.801 221.073L65.1234 246.463C51.9202 249.069 39.8582 238.422 40.812 224.997L46.6877 142.295L0 141.769V370.7C0 378.774 8.88969 383.699 15.7473 379.424L181.936 275.812ZM0 106.055L63.3357 106.769L63.3455 106.769L68.3424 106.826L68.3346 107.443C77.5795 109.881 84.1709 118.623 83.4606 128.621L77.8523 207.559L209.73 181.537C224.141 178.693 236.74 191.527 233.629 205.883L224.18 249.475L305.156 198.99C311.619 194.961 311.614 185.559 305.146 181.537L15.7372 1.57002C8.87913 -2.69461 0 2.23091 0 10.2999V106.055Z"
        fill={color}
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
