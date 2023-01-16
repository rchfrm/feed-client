import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const CommentIcon = ({
  fillBubble,
  fillDot,
  className,
  style,
}) => {
  return (
    <svg
      className={className}
      style={style}
      width="510"
      height="379"
      viewBox="0 0 510 379"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fillBubble}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69 0C30.8924 0 0 30.8924 0 69V236.915C0 275.023 30.8924 305.915 69.0001 305.915H238.671L221.654 368.737C221.473 369.407 221.381 370.098 221.381 370.791C221.38 377.394 229.031 381.053 234.171 376.907L322.192 305.915H440.859C478.966 305.915 509.859 275.023 509.859 236.915V69C509.859 30.8924 478.966 0 440.859 0H69Z"
      />
      <circle
        fill={fillDot}
        cx="135.963"
        cy="152.958"
        r="33.9906"
      />
      <circle
        fill={fillDot}
        cx="254.936"
        cy="152.957"
        r="33.9906"
      />
      <circle
        fill={fillDot}
        cx="373.891"
        cy="152.957"
        r="33.9906"
      />
    </svg>
  )
}

CommentIcon.propTypes = {
  fillBubble: PropTypes.string,
  fillDot: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

CommentIcon.defaultProps = {
  fillBubble: brandColors.green,
  fillDot: brandColors.offwhite,
  className: null,
  style: null,
}


export default CommentIcon


