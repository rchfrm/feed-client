import React from 'react'
import PropTypes from 'prop-types'

const ConnectProfilesNoArtists = ({ className }) => {
  return (
    <div
      className={[
        'p-5 bg-grey-1 rounded-dialogue',
        'text-lg',
        className,
      ].join(' ')}
    >
      <p className="mb-0">No new profiles found.</p>
    </div>
  )
}

ConnectProfilesNoArtists.propTypes = {
  className: PropTypes.string,
}

ConnectProfilesNoArtists.defaultProps = {
  className: null,
}

export default ConnectProfilesNoArtists
