import React from 'react'
import PropTypes from 'prop-types'

import FunnelHeatDivider from '@/app/FunnelHeatDivider'

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
  heatIndex,
  totalHeats,
  className,
}) => {
  const heatColor = heatColors[heatSlug]
  const nextHeatColor = nextHeatSlug ? heatColors[nextHeatSlug] : null
  const basePercetageWidth = 45
  const dividerPercentageWidth = basePercetageWidth - (basePercetageWidth * (heatIndex / totalHeats))
  return (
    <>
      <div
        className={[
          'p-5 border-solid border-4 rounded-dialogue',
          className,
        ].join(' ')}
        style={{
          borderColor: heatColors[heatSlug],
        }}
      >
        Heat {heatSlug}<br />
        Next heat {nextHeatSlug}
      </div>
      {nextHeatSlug && (
        <div>
          <FunnelHeatDivider
            heatSlug={heatSlug}
            startColor={heatColor}
            stopColor={nextHeatColor}
            className="mx-auto"
            style={{ width: `${dividerPercentageWidth}%`, height: '3.5rem' }}
          />
        </div>
      )}
    </>
  )
}

FunnelHeat.propTypes = {
  heatSlug: PropTypes.string.isRequired,
  nextHeatSlug: PropTypes.string,
  heatAds: PropTypes.array.isRequired,
  heatIndex: PropTypes.number.isRequired,
  totalHeats: PropTypes.number.isRequired,
  className: PropTypes.string,
}

FunnelHeat.defaultProps = {
  nextHeatSlug: '',
  className: null,
}

export default FunnelHeat
