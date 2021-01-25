import React from 'react'
import PropTypes from 'prop-types'

import FunnelAudienceAd from '@/app/FunnelAudienceAd'

const FunnelAudienceAds = ({
  audienceAds,
  className,
}) => {
  // NO ADS
  if (!audienceAds.length) {
    return (
      <p className="mb-10">
        <strong>There are currently no ads running for this audience.</strong>
      </p>
    )
  }

  const isSingleAd = audienceAds.length === 1
  // Get scores into array
  const adScores = audienceAds.map(({ engagement_score = 0 }) => {
    return engagement_score
  })
  return (
    <div
      className={[
        className,
        isSingleAd ? 'justify-center' : 'justify-between',
      ].join(' ')}
    >
      {isSingleAd ? (
        // SINGLE AD
        <FunnelAudienceAd
          adData={audienceAds[0]}
          score={adScores[0]}
          winner
        />
      ) : (
        // DOUBLE AD
        <>
          <FunnelAudienceAd
            adData={audienceAds[0]}
            score={adScores[0]}
            winner={adScores[0] > adScores[1]}
            className={[
              // 'flex flex-grow justify-center',
            ].join(' ')}
          />
          <p className="mb-0">
            <strong><em>vs</em></strong>
          </p>
          <FunnelAudienceAd
            adData={audienceAds[1]}
            score={adScores[1]}
            winner={adScores[1] > adScores[0]}
            className={[
              // 'flex flex-grow justify-center',
            ].join(' ')}
          />
        </>
      )}
    </div>
  )
}

FunnelAudienceAds.propTypes = {
  audienceAds: PropTypes.array.isRequired,
  className: PropTypes.string,
}

FunnelAudienceAds.defaultProps = {
  className: null,
}



export default FunnelAudienceAds
