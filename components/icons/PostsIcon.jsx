import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

const { green, bgColor } = brandColors

const PostsIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="384"
      height="384"
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="192" cy="192" r="192" fill={green} />
      <path
        d="M286.966 174.298C286.747 149.21 276.646 125.227 258.862 107.567C241.077 89.9077 217.047 80 192 80C166.953 80 142.916 89.9077 125.119 107.567C107.321 125.227 97.2032 149.21 96.9662 174.298L96.9193 305H286.919L286.966 174.298Z"
        fill={bgColor}
      />
      <path d="M82 163L192 221.5L302 163" stroke={green} strokeWidth="37" />
    </svg>

  )
}

PostsIcon.propTypes = {
  className: PropTypes.string,
}

PostsIcon.defaultProps = {
  className: '',
}


export default PostsIcon
