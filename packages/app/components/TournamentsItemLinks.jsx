import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemLink from '@/app/TournamentsItemLink'

const TournamentsItemLinks = ({ linkA, linkB, className }) => {
  if (!linkA) return null
  return (
    <div className={['flex px-10', linkB ? 'justify-between' : 'items-start', className].join(' ')}>
      <TournamentsItemLink link={linkA} title={linkB ? 'Ad A' : 'Link'} />
      {linkB && (
        <TournamentsItemLink link={linkB} title="Ad B" />
      )}
    </div>
  )
}

TournamentsItemLinks.propTypes = {
  linkA: PropTypes.string,
  linkB: PropTypes.string,
  className: PropTypes.string,
}

TournamentsItemLinks.defaultProps = {
  linkA: null,
  linkB: null,
  className: null,
}


export default TournamentsItemLinks
