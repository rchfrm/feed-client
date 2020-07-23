import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'

import styles from '@/app/Tournaments.module.css'

const TITLE = ({ title, link, className, secondary }) => {
  const linkIcon = <LinkIcon className="h-3 mr-2" />
  return (
    <p className={[styles.tournamentColumn_item, secondary && styles._lastItem].join(' ')}>
      {link ? (
        <a className={className} href={link} target="_blank" rel="noopener noreferrer">
          {linkIcon}
          {title}
        </a>
      ) : (
        <span className={className}>
          <span style={{ visibility: 'hidden' }}>{linkIcon}</span>
          {title}
        </span>
      )}
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
