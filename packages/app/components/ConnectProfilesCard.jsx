import React from 'react'
import PropTypes from 'prop-types'

import TickIcon from '@/icons/TickIcon'

import ConnectProfilesCardCountry from '@/app/ConnectProfilesCardCountry'
import ConnectProfilesCardAdAccount from '@/app/ConnectProfilesCardAdAccount'

import brandColors from '@/constants/brandColors'

const ConnectProfilesCard = ({
  artist,
  updateArtists,
  className,
}) => {
  const {
    page_id: artistId,
    exists,
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
        'border-solid border-2',
        exists ? 'border-black' : 'border-black',
        'rounded-dialogue p-4 pb-5',
        className,
      ].join(' ')}
    >
      <div className="flex justify-between xs:block">
        {/* NAME */}
        <h3 className="font-bold font-body text-md mb-4">{artist.name}</h3>
        {/* IMAGE */}
        <div className="w-24 xs:w-full sm:w-48 lg:w-full">
          <div className="media media--square mb-6">
            <img
              className={['center--image rounded-dialogue'].join(' ')}
              src={artist.picture}
              alt={`${artist.name} Facebook profile photo`}
            />
          </div>
        </div>
      </div>
      {/* AD ACCOUNT */}
      <ConnectProfilesCardAdAccount
        artist={artist}
        updateArtists={updateArtists}
        className="mb-5"
      />
      {/* COUNTRY SELECT */}
      <ConnectProfilesCardCountry
        artist={artist}
        updateArtists={updateArtists}
        className="mb-5"
      />
      {/* CONNECT BUTTON */}
      <div>
        <p className="inputLabel__text">Connect to Feed</p>
        <button
          className={[
            'flex items-center justify-between w-full',
            'h-14 rounded-button px-3',
            connect ? 'bg-green' : 'bg-grey-1',
          ].join(' ')}
          aria-label="Connect profile"
          onClick={onConnectClick}
        >
          <p className="mb-0 font-bold">Connect</p>
          <div className="flex bg-white rounded-button w-5 h-5 p-1">
            <TickIcon
              className={`w-full h-auto ${connect ? 'visible' : 'hidden'}`}
              fill={brandColors.green}
            />
          </div>
        </button>
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
