import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const PostsIcon = ({ className, fill }) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 0H8C5.79086 0 4 1.79086 4 4V6H7V4C7 3.44772 7.44772 3 8 3H18C18.5523 3 19 3.44772 19 4V6H22V4C22 1.79086 20.2091 0 18 0Z"
        fill={fill}
      />
      <path
        d="M20 5H6C3.79086 5 2 6.79086 2 9V11H5V9C5 8.44772 5.44772 8 6 8H20C20.5523 8 21 8.44772 21 9V11H24V9C24 6.79086 22.2091 5 20 5Z"
        fill={fill}
      />
      <path
        d="M0 13C0 11.3431 1.34315 10 3 10H23C24.6569 10 26 11.3431 26 13V23C26 24.6569 24.6569 26 23 26H3C1.34315 26 0 24.6569 0 23V13Z"
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
