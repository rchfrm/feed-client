import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemAdScore = ({ score, winner, className }) => {
  return (
    <div
      className={[
        'flex-1 text-left pl-10 sm:pl-12 w-20 xxs:w-24',
        winner && styles._winner,
        styles.postScore,
      ].join(' ')}
    >
      <div className="inline-block text-center">
        <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>score</p>
        <p className={['mb-0', 'h3', styles.postScore_number].join(' ')}>{score}</p>
      </div>
    </div>
  )
}

TournamentsItemAdScore.propTypes = {
  score: PropTypes.string.isRequired,
  winner: PropTypes.bool,
}

TournamentsItemAdScore.defaultProps = {
  winner: false,
}


export default TournamentsItemAdScore
