import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const SwitchIcon = ({
  fill,
  className,
  style,
}) => {
  return (
    <svg
      width="441"
      height="537"
      viewBox="0 0 441 537"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M215.383 122.168L145.411 122.157L253.498 230.244C262.13 238.877 262.135 252.868 253.503 261.5C244.87 270.132 230.875 270.132 222.242 261.5L114.157 153.415L114.168 223.383C114.159 235.58 104.264 245.474 92.0674 245.484C79.8562 245.489 69.947 235.58 69.947 223.364L69.9518 101.789C69.9493 95.2421 72.7935 89.3598 77.3137 85.3127C81.3619 80.7914 87.2469 77.9444 93.7936 77.947L215.364 77.947C227.58 77.947 237.484 87.8514 237.484 100.067C237.484 112.254 227.584 122.154 215.383 122.168Z"
        fill={fill}
      />
      <path
        d="M321.109 317.832L321.121 387.805L213.034 279.717C204.401 271.085 190.41 271.08 181.778 279.713C173.145 288.345 173.145 302.341 181.778 310.973L289.863 419.058L219.895 419.047C207.698 419.057 197.804 428.951 197.794 441.148C197.789 453.359 207.698 463.268 219.914 463.268L341.489 463.263C348.036 463.266 353.918 460.422 357.965 455.902C362.486 451.853 365.333 445.968 365.331 439.422L365.331 317.852C365.331 305.636 355.426 295.731 343.21 295.731C331.023 295.731 321.124 305.631 321.109 317.832Z"
        fill={fill}
      />
    </svg>
  )
}

SwitchIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

SwitchIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
}


export default SwitchIcon
