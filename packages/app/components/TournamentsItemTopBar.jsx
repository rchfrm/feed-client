import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/Tournaments.module.css'
import brandColors from '@/constants/brandColors'

const TournamentsItemTopBar = ({ dateCreated, status, className }) => {
  const { green, grey } = brandColors
  const dotColor = status === 'active' ? green : grey
  const statusText = status === 'archived' ? 'Ended' : status
  return (
    <header
      className={[
        'flex justify-between',
        'col-span-12',
        'pb-2 xxs:pb-3',
        styles.topBar,
        className,
      ].join(' ')}
    >
      <p className={styles.date}>
        <span>{dateCreated}</span>
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

TournamentsItemTopBar.propTypes = {
  dateCreated: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  className: PropTypes.string,
}

TournamentsItemTopBar.defaultProps = {
  className: '',
}


export default TournamentsItemTopBar
