import React from 'react'
import PropTypes from 'prop-types'

import FunnelHeatAd from '@/app/FunnelHeatAd'

const FunnelHeatAds = ({
  heatAds,
  className,
}) => {
  // NO ADS
  if (!heatAds.length) {
    return (
      <p className="mb-10">
        <strong>There are currently no ads running for this audience.</strong>
      </p>
    )
  }

  const isSingleAd = heatAds.length === 1
  // Get scores into array
  const adScores = heatAds.map(({ engagement_score = 0 }) => {
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
        <FunnelHeatAd
          adData={heatAds[0]}
          score={adScores[0]}
          winner
        />
      ) : (
        // DOUBLE AD
        <>
          <FunnelHeatAd
            adData={heatAds[0]}
            score={adScores[0]}
            winner={adScores[0] > adScores[1]}
            className={[
              // 'flex flex-grow justify-center',
            ].join(' ')}
          />
          <p className="mb-0">
            <strong><em>vs</em></strong>
          </p>
          <FunnelHeatAd
            adData={heatAds[1]}
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

FunnelHeatAds.propTypes = {
  heatAds: PropTypes.array.isRequired,
  className: PropTypes.string,
}

FunnelHeatAds.defaultProps = {
  className: null,
}



export default FunnelHeatAds
