import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemTitles from '@/app/TournamentsItemTitles'
import TournamentsItemImages from '@/app/TournamentsItemImages'
import TournamentsItemMetricsRows from '@/app/TournamentsItemMetricsRows'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemDesktop = ({
  adA,
  adB,
  adMetrics,
  isAdPair,
}) => {
  return (
    <div className="flex justify-between col-span-12 h-full" data-name="TournamentsItemDesktop">
      {/* TITLES */}
      <TournamentsItemTitles
        linkA={adA.postLink}
        linkB={adB.postLink}
        isAdPair={isAdPair}
        className={styles.tournamentColumn}
      />
      {/* IMAGES */}
      <TournamentsItemImages
        thumbnailOptionsA={adA.thumbnailOptions}
        thumbnailOptionsB={adB.thumbnailOptions}
        isAdPair={isAdPair}
        className={styles.tournamentColumn}
      />
      {/* METRICS */}
      <TournamentsItemMetricsRows
        adMetrics={adMetrics}
        isAdPair={isAdPair}
      />
    </div>
  )
}

TournamentsItemDesktop.propTypes = {
  adA: PropTypes.object.isRequired,
  adB: PropTypes.object,
  adMetrics: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
}

TournamentsItemDesktop.defaultProps = {
  adB: {},
}


export default TournamentsItemDesktop
