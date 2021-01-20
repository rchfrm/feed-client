import React from 'react'
import PropTypes from 'prop-types'

import FunnelHeat from '@/app/FunnelHeat'

const FunnelView = ({
  funnelData,
  funnelHeats,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {funnelHeats.map(({ slug }, index) => {
        const nextHeat = funnelHeats[index + 1] || {}
        const { ads } = funnelData[slug]
        const heatAds = Object.values(ads)
        return (
          <FunnelHeat
            key={slug}
            heatSlug={slug}
            nextHeatSlug={nextHeat.slug}
            heatAds={heatAds}
            heatIndex={index}
            totalHeats={funnelHeats.length}
          />
        )
      })}
    </div>
  )
}

FunnelView.propTypes = {
  funnelData: PropTypes.object.isRequired,
  funnelHeats: PropTypes.array.isRequired,
  className: PropTypes.string,
}

FunnelView.defaultProps = {
  className: null,
}

export default FunnelView
