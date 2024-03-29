import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const TwitterIcon = ({
  fill,
  className,
  style,
  title,
  width,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 325.08"
      name={title}
      className={className}
      style={style}
      width={width}
    >
      <title>{title}</title>
      <path
        fill={fill}
        d="M125.8,362.54c151,0,233.49-125,233.49-233.49,0-3.56-.07-7.1-.23-10.61A167.11,167.11,0,0,0,400,75.94a163.45,163.45,0,0,1-47.13,12.92A82.39,82.39,0,0,0,389,43.47a164.7,164.7,0,0,1-52.11,19.92A82.13,82.13,0,0,0,197,138.23,233,233,0,0,1,27.84,52.49,82.14,82.14,0,0,0,53.25,162.05a81.58,81.58,0,0,1-37.17-10.27c0,.34,0,.69,0,1.05A82.09,82.09,0,0,0,81.9,233.28a81.88,81.88,0,0,1-37.06,1.41,82.16,82.16,0,0,0,76.66,57A164.67,164.67,0,0,1,19.58,326.82,166.47,166.47,0,0,1,0,325.68a232.28,232.28,0,0,0,125.8,36.86"
        transform="translate(0 -37.46)"
      />
    </svg>
  )
}

TwitterIcon.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number,
}

TwitterIcon.defaultProps = {
  fill: brandColors.twitter.bg,
  title: 'Twitter',
  className: '',
  style: null,
  width: null,
}

export default TwitterIcon
