import React from 'react'
import PropTypes from 'prop-types'

import FunnelAudience from '@/app/FunnelAudience'
import FunnelAudienceHot from '@/app/FunnelAudienceHot'

const FunnelView = ({
  funnelData,
  audienceTypes,
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
        {audienceTypes.map((audience, index) => {
          const { slug } = audience
          const nextAudience = audienceTypes[index + 1] || {}
          const { ads, status } = funnelData[slug]
          const audienceAds = ads ? Object.values(ads) : []
          return (
            <FunnelAudience
              key={slug}
              audience={audience}
              nextAudience={nextAudience}
              audienceAds={audienceAds}
              audienceIndex={index}
              totalAudiences={audienceTypes.length}
              tournamentStatus={status}
              activeFunnelId={activeFunnelId}
            />
          )
        })}
        {/* HOT (coming soon) */}
        <FunnelAudienceHot />
      </div>
    </div>
  )
}

FunnelView.propTypes = {
  funnelData: PropTypes.object.isRequired,
  audienceTypes: PropTypes.array.isRequired,
  activeFunnelId: PropTypes.string.isRequired,
  className: PropTypes.string,
  classNameInner: PropTypes.string,
}

FunnelView.defaultProps = {
  className: null,
  classNameInner: null,
}

export default FunnelView
