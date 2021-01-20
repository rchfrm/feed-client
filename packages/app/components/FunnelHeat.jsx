import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const heatColors = {
  cold: brandColors.blue,
  cool: brandColors.yellow,
  warm: brandColors.red,
  hot: brandColors.red,
}

const FunnelHeat = ({
  heatSlug,
  nextHeatSlug,
  heatAds,
  className,
}) => {
  return (
    <div
      className={[
        'p-5 border-solid border-2',
        className,
      ].join(' ')}
      style={{
        borderColor: heatColors[heatSlug],
      }}
    >
      Heat {heatSlug}<br />
      Next heat {nextHeatSlug}
    </div>
  )
}

FunnelHeat.propTypes = {
  heatSlug: PropTypes.string.isRequired,
  nextHeatSlug: PropTypes.string,
  heatAds: PropTypes.array.isRequired,
  className: PropTypes.string,
}

FunnelHeat.defaultProps = {
  nextHeatSlug: '',
  className: null,
}

export default FunnelHeat
