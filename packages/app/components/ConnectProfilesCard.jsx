import React from 'react'
import PropTypes from 'prop-types'

import ToggleSwitch from '@/elements/ToggleSwitch'

import ConnectProfilesCardCountry from '@/app/ConnectProfilesCardCountry'
import ConnectProfilesCardAdAccount from '@/app/ConnectProfilesCardAdAccount'

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
      <div className="flex justify-between flex-column">
        {/* NAME */}
        <p className="font-bold font-body text-md mb-2">{name}
          {instagram_username && <span className="font-normal"> (@{instagram_username})</span>}
        </p>
        {/* IMAGE */}
        <div className="w-full">
          <div className="media media--square mb-4">
            <img
              className={['center--image rounded-dialogue'].join(' ')}
              src={artist.picture}
              alt={`${artist.name} Facebook profile photo`}
            />
          </div>
        </div>
      </div>
      {/* COUNTRY SELECT */}
      <ConnectProfilesCardCountry
        artist={artist}
        updateArtists={updateArtists}
        className="mb-4"
      />
      {/* AD ACCOUNT */}
      <ConnectProfilesCardAdAccount
        artist={artist}
        updateArtists={updateArtists}
        className="mb-4"
      />
      {/* CONNECT BUTTON */}
      <div
        className={[
          'flex items-center justify-between w-full',
          'h-14 rounded-button px-4',
          'bg-grey-1',
        ].join(' ')}
      >
        <p className="mb-0 font-bold">Connect</p>
        <ToggleSwitch
          state={connect}
          onChange={onConnectClick}
        />
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
