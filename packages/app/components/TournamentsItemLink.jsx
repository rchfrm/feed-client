import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'

const TournamentsItemLink = ({ link, title, className }) => {
  const linkIcon = <LinkIcon className="h-3 mr-2" />
  return (
    <>
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
