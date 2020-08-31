import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'

const TournamentsItemLink = ({ link, title, className }) => {
  const linkClass = 'inline-flex items-baseline text-sm'
  const linkIcon = <LinkIcon className="h-3 mr-2" />
  return (
    <>
      {link ? (
        <a className={[linkClass, className].join(' ')} href={link} target="_blank" rel="noopener noreferrer">
          {linkIcon}
          {title}
        </a>
      ) : (
        <span className={[linkClass, className].join(' ')}>
          <span className="hidden md:inline" style={{ visibility: 'hidden' }}>{linkIcon}</span>
          {title}
        </span>
      )}
    </>
  )
}

TournamentsItemLink.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

TournamentsItemLink.defaultProps = {
  link: '',
  className: '',
}

export default TournamentsItemLink
