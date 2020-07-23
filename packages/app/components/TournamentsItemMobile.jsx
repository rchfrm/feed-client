import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemAdMobile from '@/app/TournamentsItemAdMobile'
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
      <div className="sm:grid grid-cols-12 gap-4">
        <div className="col-span-5">
          {/* FIRST AD */}
          <TournamentsItemAdMobile
            title="Ad A"
            adPost={adA}
            winner
            isAdPair
            streakWinner={streakResultA}
          />
          {/* SECOND AD */}
          {isAdPair && (
            <>
              {/* "VS" TEXT */}
              <div className="col-span-12 mt-4 mb-4 text-center">
                <p className={['w-24 mb-0'].join(' ')}>
                  <em><strong>vs</strong></em>
                </p>
              </div>
              <TournamentsItemAdMobile
                title="Ad B"
                adPost={adB}
                secondary
                isAdPair
                streakWinner={streakResultB}
              />
            </>
          )}
        </div>
        {/* METRICS */}
        <TournamentsItemMetricsTable
          adMetrics={adMetrics}
          isAdPair={isAdPair}
          className="col-span-7 flex items-center"
        />
      </div>
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
