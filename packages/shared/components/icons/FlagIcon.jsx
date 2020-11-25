import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const FlagIcon = ({
  fill,
  className,
  title,
  style,
}) => {
  return (
    <svg
      width="260"
      height="384"
      viewBox="0 0 260 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      title={title}
      className={className}
      style={style}
    >
      <path
        d="M16 15.7522V214.248C92.0878 258.815 168.176 178.304 244.264 206.737C251.501 209.442 260 204.527 260 196.801V18.6181C260 16.843 259.025 15.1711 257.47 14.316C176.98 -29.9262 96.49 62.8973 16 15.7522Z"
        fill={fill}
      />
      <rect
        y="10.5459"
        width="44"
        height="373.454"
        rx="22"
        fill={fill}
      />
    </svg>
  )
}

FlagIcon.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

FlagIcon.defaultProps = {
  fill: brandColors.black,
  title: 'Flag',
  className: '',
  style: null,
}

export default FlagIcon
