import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/Tournaments.module.css'
import brandColors from '@/constants/brandColors'

const TournamentItemTopBar = ({ dateCreated, timeCreated, status }) => {
  const { green, grey } = brandColors
  const dotColor = status === 'active' ? green : grey
  const statusText = status === 'archived' ? 'Ended' : status
  return (
    <header
      className={[
        'flex justify-between',
        'col-span-12',
        'mb-10',
        'sm:mb-5',
        'pb-2 xxs:pb-3',
        styles.topBar,
      ].join(' ')}
    >
      <p className={styles.date}>
        <span>{dateCreated}</span>
        <span> at </span>
        <span>{timeCreated}</span>
      </p>
      <p className={['flex items-center', 'capitalize', styles.status].join(' ')}>
        {/* Status dot */}
        <span
          className={['w-3 h-3 mr-3 rounded-full'].join(' ')}
          style={{ backgroundColor: dotColor }}
        />
        {statusText}
      </p>
    </header>
  )
}

TournamentItemTopBar.propTypes = {
  dateCreated: PropTypes.string.isRequired,
  timeCreated: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default TournamentItemTopBar
