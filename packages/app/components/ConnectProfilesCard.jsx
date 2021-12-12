import React from 'react'
import PropTypes from 'prop-types'

import ToggleSwitch from '@/elements/ToggleSwitch'

const ConnectProfilesCard = ({
  artist,
  updateArtists,
  className,
}) => {
  const {
    name,
    instagram_username,
    page_id: artistId,
    connect,
  } = artist

  // HANDLE CONNECT BUTTON
  const onConnectClick = () => {
    const payload = { id: artistId }
    updateArtists('toggle-connect', payload)
  }

  return (
    <li
      className={[
        'relative',
        className,
      ].join(' ')}
    >
      <div className="flex items-center">
        {/* IMAGE */}
        <div className="w-16 h-16 mr-8">
          <div className="media media--square mb-4">
            <img
              className={['center--image rounded-full'].join(' ')}
              src={artist.picture}
              alt={`${artist.name} Facebook profile photo`}
            />
          </div>
        </div>
        {/* NAME */}
        <div className="font-bold font-body text-md">{name}
          {instagram_username && <p className="mb-0 font-normal"> (@{instagram_username})</p>}
        </div>
        {/* CONNECT BUTTON */}
        <div className="ml-auto">
          <ToggleSwitch
            state={connect}
            onChange={onConnectClick}
          />
        </div>
      </div>
    </li>
  )
}

ConnectProfilesCard.propTypes = {
  artist: PropTypes.object.isRequired,
  updateArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesCard.defaultProps = {
  className: null,
}

export default ConnectProfilesCard
