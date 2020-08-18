import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemScore = ({ score, winner, className }) => {
  return (
    <div
      className={[
        'text-center',
        'pt-4 pb-5',
        styles.postScore,
        className,
      ].join(' ')}
    >
      <div className="inline-block text-center">
        <p className={['mb-2', 'text-grey-3', 'small--p'].join(' ')}>score</p>
        <p className={['mb-0', 'h3', styles.postScore_number, winner && styles._winner].join(' ')}>
          <span>{score}</span>
        </p>
      </div>
    </div>
  )
}

TournamentsItemScore.propTypes = {
  score: PropTypes.string,
  winner: PropTypes.bool,
  className: PropTypes.string,
}

TournamentsItemScore.defaultProps = {
  score: '-',
  winner: false,
  className: '',
}


export default TournamentsItemScore
