import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '~/constants/brandColors'

const { black } = brandColors

const ResultsIcon = ({ className, fill }) => {
  return (
    <svg
      className={className}
      width="320"
      height="320"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M149.972 7.63422C153.129 -2.54475 166.871 -2.54473 170.028 7.63424L200.57 106.136C201.982 110.688 206.03 113.77 210.598 113.77H309.436C319.65 113.77 323.897 127.466 315.634 133.756L235.672 194.634C231.976 197.447 230.43 202.434 231.841 206.986L262.384 305.487C265.54 315.666 254.422 324.131 246.159 317.84L166.197 256.963C162.502 254.149 157.498 254.149 153.803 256.963L73.8407 317.84C65.5776 324.131 54.4596 315.666 57.6158 305.487L88.1586 206.986C89.5701 202.434 88.0238 197.447 84.3284 194.634L4.36642 133.756C-3.89672 127.466 0.34999 113.77 10.5638 113.77H109.402C113.97 113.77 118.018 110.688 119.43 106.136L149.972 7.63422Z"
        fill={fill}
      />
    </svg>
  )
}

ResultsIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

ResultsIcon.defaultProps = {
  className: '',
  fill: black,
}


export default ResultsIcon
