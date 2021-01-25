import React from 'react'
import PropTypes from 'prop-types'

const FunnelHeatDivider = ({
  heatSlug,
  startColor,
  stopColor,
  className,
  style,
}) => {
  return (
    <svg
      width="290"
      height="50"
      viewBox="0 0 290 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      preserveAspectRatio="none"
    >
      <path
        d="M0 0L26.7236 50H263.276L290 0H0Z"
        fill={stopColor}
      />
      <path d="M0 0L26.7236 50H263.276L290 0H0Z" fill={`url(#${heatSlug}-paint0_linear)`} />
      <defs>
        <linearGradient id={`${heatSlug}-paint0_linear`} x1="145" y1="0" x2="145" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor={startColor} />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>

  )
}

FunnelHeatDivider.propTypes = {
  heatSlug: PropTypes.string.isRequired,
  startColor: PropTypes.string.isRequired,
  stopColor: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

FunnelHeatDivider.defaultProps = {
  className: null,
  style: null,
}

export default FunnelHeatDivider
