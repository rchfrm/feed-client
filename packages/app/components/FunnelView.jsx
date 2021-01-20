import React from 'react'
import PropTypes from 'prop-types'

import FunnelHeat from '@/app/FunnelHeat'

const FunnelView = ({
  funnel,
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
        return (
          <FunnelHeat
            key={slug}
            heatSlug={slug}
            nextHeatSlug={nextHeat.slug}
            heatAds={[]}
            heatIndex={index}
            totalHeats={funnelHeats.length}
          />
        )
      })}
    </div>
  )
}

FunnelView.propTypes = {
  funnel: PropTypes.object.isRequired,
  funnelHeats: PropTypes.array.isRequired,
  className: PropTypes.string,
}

FunnelView.defaultProps = {
  className: null,
}

export default FunnelView
