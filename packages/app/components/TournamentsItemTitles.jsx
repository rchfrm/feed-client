import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemLink from '@/app/TournamentsItemLink'

import styles from '@/app/Tournaments.module.css'

const TITLE = ({ title, link, className, secondary }) => {
  return (
    <p className={[styles.tournamentColumn_item, secondary && styles._lastItem].join(' ')}>
      <TournamentsItemLink link={link} title={title} className={className} />
    </p>
  )
}

const TournamentsItemTitles = ({ linkA, linkB, isAdPair, className }) => {
  const titleClass = 'inline-flex items-baseline whitespace-no-wrap'
  return (
    <div className={[className].join(' ')}>
      <TITLE title="Ad A" link={linkA} className={titleClass} />
      {isAdPair && (
        <TITLE title="Ad B" link={linkB} className={titleClass} secondary />
      )}
    </div>
  )
}

TournamentsItemTitles.propTypes = {
  linkA: PropTypes.string,
  linkB: PropTypes.string,
  isAdPair: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TournamentsItemTitles.defaultProps = {
  linkA: '',
  linkB: '',
  className: '',
}


export default TournamentsItemTitles
