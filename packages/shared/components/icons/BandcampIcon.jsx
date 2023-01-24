import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const BandcampIcon = ({
  fill,
  className,
  title,
  style,
  width,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 418.83 246.11"
      width={width}
      name={title}
      className={className}
      style={style}
    >
      <title>{title}</title>
      <polygon
        fill={fill}
        points="285.5 246.11 0 246.11 133.32 0 418.83 0 285.5 246.11"
      />

    </svg>
  )
}

BandcampIcon.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number,
}

BandcampIcon.defaultProps = {
  fill: brandColors.black,
  title: 'Bandcamp',
  className: '',
  style: null,
  width: null,
}

export default BandcampIcon
