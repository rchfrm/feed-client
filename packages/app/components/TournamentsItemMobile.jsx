import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemAd from '@/app/TournamentsItemAd'
import TournamentsItemMetricsTable from '@/app/TournamentsItemMetricsTable'

const TournamentsItemMobile = ({
  adA,
  adB,
  adMetrics,
  isAdPair,
  streakResults,
}) => {
  const [streakResultA, streakResultB] = streakResults
  return (
    <>
      <div>
        {/* FIRST AD */}
        <TournamentsItemAd title="Ad A" adPost={adA} winner isAdPair streakWinner={streakResultA} />
        {/* SECOND AD */}
        {isAdPair && (
          <>
            {/* "VS" TEXT */}
            <p className={['w-24 mt-4 mb-4 text-center'].join(' ')}>
              <em><strong>vs</strong></em>
            </p>
            <TournamentsItemAd title="Ad B" adPost={adB} secondary isAdPair streakWinner={streakResultB} />
          </>
        )}
      </div>
      {/* METRICS */}
      <TournamentsItemMetricsTable
        adMetrics={adMetrics}
        isAdPair={isAdPair}
      />
    </>
  )
}

TournamentsItemMobile.propTypes = {
  adA: PropTypes.object.isRequired,
  adB: PropTypes.object,
  adMetrics: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
  streakResults: PropTypes.array.isRequired,
}

TournamentsItemMobile.defaultProps = {
  adB: {},
}

export default TournamentsItemMobile
