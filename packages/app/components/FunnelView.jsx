import React from 'react'
import PropTypes from 'prop-types'

import FunnelAudience from '@/app/FunnelAudience'
// import FunnelAudienceHot from '@/app/FunnelAudienceHot'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/funnelCopy'

const FunnelView = ({
  funnelData,
  audienceTypes,
  activeFunnelId,
  className,
  classNameInner,
}) => {
  const hasNoActiveAds = React.useMemo(() => {
    if (!funnelData) return true
    return Object.values(funnelData).every(({ ads }) => !ads)
  }, [funnelData])

  if (!funnelData) return null

  // HANDLE NO ACTIVE ADS
  if (hasNoActiveAds) {
    return (
      <div className="bg-grey-1 p-5 rounded-dialogue mb-8">
        <MarkdownText className="mb-0" markdown={copy.noActiveAds(activeFunnelId)} />
      </div>
    )
  }

  // Create array of <FunnelAudience /> components
  const validAudienceTypes = activeFunnelId === 'stories'
    ? audienceTypes.filter(audience => audience.storiesValid)
    : audienceTypes

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <div className={classNameInner}>
        {validAudienceTypes.map((audience, index) => {
          const { slug } = audience
          const nextAudience = validAudienceTypes[index + 1] || {}
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
        {/* <FunnelAudienceHot /> */}
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
