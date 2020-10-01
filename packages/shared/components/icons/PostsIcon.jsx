import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const PostsIcon = ({ className, fill }) => {
  return (
    <svg
      className={className}
      width="282"
      height="384"
      viewBox="0 0 282 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="58.1504"
        y="67.5"
        width="165.428"
        height="110.859"
        rx="26.5"
        fill={brandColors.bgColor}
        stroke={fill}
        strokeWidth="27"
      />
      <rect
        x="38.1523"
        y="122.606"
        width="205.41"
        height="136.95"
        rx="32"
        fill={brandColors.bgColor}
        stroke={fill}
        strokeWidth="36"
      />
      <rect
        y="170.58"
        width="281.645"
        height="213.42"
        rx="35"
        fill={fill}
      />
    </svg>
  )
}

PostsIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

PostsIcon.defaultProps = {
  className: '',
  fill: black,
}


export default PostsIcon
