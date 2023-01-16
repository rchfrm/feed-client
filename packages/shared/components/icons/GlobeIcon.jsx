import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const GlobeIcon = ({
  fill,
  className,
  style,
  title,
  width,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      width={width}
      name={title}
      className={className}
      style={style}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{title}</title>
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12"
      />
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      />

    </svg>
  )
}

GlobeIcon.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number,
}

GlobeIcon.defaultProps = {
  fill: brandColors.black,
  title: 'Website',
  className: '',
  style: null,
  width: null,
}

export default GlobeIcon
