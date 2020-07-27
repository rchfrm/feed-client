import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemMetricsRows = ({ adMetrics, isAdPair }) => {
  return (
    <>
      {adMetrics.map(({ dataType, tooltip, a, b }) => {
        const { value: valueA, winner: winnerA } = a
        const { value: valueB, winner: winnerB } = b
        const parentClassName = dataType === 'score' ? styles.postScore : dataType === 'streak' ? styles.postStreak : ''
        const valueClassName = dataType === 'score' || dataType === 'streak'
          ? ['h3', styles.tournamentColumn_item, styles.postScore_number].join(' ')
          : styles.tournamentColumn_item
        return (
          <>
            <div key={dataType} className={[styles.tournamentColumn, parentClassName].join(' ')}>
              <div className={styles.tournamentColumn_title}>
                {a.name}
                {tooltip && (
                  <TooltipButton copy={tooltip} direction="left" buttonClasses={styles.infoTooltip} />
                )}
              </div>
              <p className={[valueClassName, winnerA && styles._winner].join(' ')}>
                <span>{valueA}</span>
              </p>
              {isAdPair && (
                <p className={[valueClassName, winnerB && styles._winner].join(' ')}>
                  <span>{valueB}</span>
                </p>
              )}
            </div>
            {/* LINE */}
            {dataType === 'streak' && (
              <div
                className={['self-stretch', 'bg-green'].join(' ')}
                style={{ width: 2 }}
              />
            )}
          </>
        )
      })}
    </>
  )
}

TournamentsItemMetricsRows.propTypes = {
  adMetrics: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
}


export default TournamentsItemMetricsRows
