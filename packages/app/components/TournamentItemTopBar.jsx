import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/Tournaments.module.css'

const TournamentItemTopBar = ({ dateCreated, timeCreated, status }) => {
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
      <p className="date">
        <span>{dateCreated}</span>
        <span> at </span>
        <span>{timeCreated}</span>
      </p>
      <p className="capitalize">{status}</p>
    </header>
  )
}

TournamentItemTopBar.propTypes = {
  dateCreated: PropTypes.string.isRequired,
  timeCreated: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default TournamentItemTopBar
