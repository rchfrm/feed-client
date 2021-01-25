import React from 'react'
import PropTypes from 'prop-types'

import FunnelHeat from '@/app/FunnelHeat'
import FunnelHeatHot from '@/app/FunnelHeatHot'

const FunnelView = ({
  funnelData,
  funnelHeats,
  activeFunnelId,
  className,
  classNameInner,
}) => {
  if (!funnelData) return null
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <div className={classNameInner}>
        {funnelHeats.map((heat, index) => {
          const { slug } = heat
          const nextHeat = funnelHeats[index + 1] || {}
          const { ads } = funnelData[slug]
          const heatAds = ads ? Object.values(ads) : []
          return (
            <FunnelHeat
              key={slug}
              heat={heat}
              nextHeatSlug={nextHeat.slug}
              heatAds={heatAds}
              heatIndex={index}
              totalHeats={funnelHeats.length}
              activeFunnelId={activeFunnelId}
            />
          )
        })}
        {/* HOT */}
        <FunnelHeatHot />
      </div>
    </div>
  )
}

FunnelView.propTypes = {
  funnelData: PropTypes.object.isRequired,
  funnelHeats: PropTypes.array.isRequired,
  activeFunnelId: PropTypes.string.isRequired,
  className: PropTypes.string,
  classNameInner: PropTypes.string,
}

FunnelView.defaultProps = {
  className: null,
  classNameInner: null,
}

export default FunnelView
