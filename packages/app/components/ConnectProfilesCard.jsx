import React from 'react'
import PropTypes from 'prop-types'

import TickIcon from '@/icons/TickIcon'

import ConnectProfilesCardCountry from '@/app/ConnectProfilesCardCountry'
import ConnectProfilesCardAdAccount from '@/app/ConnectProfilesCardAdAccount'

import brandColors from '@/constants/brandColors'

const getUpdateArtistPayload = (e) => {
  const { target, target: { name: field, value } } = e
  const { selectedIndex, options } = target
  // Country code placeholder
  if (field === 'country_code' && value.indexOf('Choose') !== -1) {
    return undefined
  }
  // Ad account
  if (field === 'selected_facebook_ad_account') {
    // const { selectedIndex, options } = target
    const { text: adAccountName } = options[selectedIndex]
    const adAccountId = value
    return {
      id: adAccountId,
      name: adAccountName,
    }
  }
  // DEFAULT
  return value
}

const ConnectProfilesCard = ({
  artist,
  updateArtists,
  className,
}) => {
  // console.log('artist', artist)
  const {
    page_id: artistId,
    exists,
    connect,
  } = artist

  // HANDLE SELECT CHANGE
  const onSelectChange = React.useCallback((e) => {
    const { target: { name: field } } = e
    const payloadValue = getUpdateArtistPayload(e)
    // Update artists
    const payload = { id: artistId, field, value: payloadValue }
    updateArtists('update-artist', payload)
  // eslint-disable-next-line
  }, [artist])

  // HANDLE CONNECT BUTTON
  const ConnectButtonElType = !exists ? 'button' : 'div'
  const onConnectClick = exists ? () => {} : () => {
    const payload = { id: artistId }
    updateArtists('toggle-connect', payload)
  }

  return (
    <li
      className={[
        exists ? 'bg-grey-1' : 'border-solid border-black border-2',
        'rounded-dialogue p-4',
        className,
      ].join(' ')}
    >
      {/* NAME */}
      <h3 className="font-bold font-body text-md mb-4">{artist.name}</h3>
      {/* IMAGE */}
      <div className="media media--square mb-6">
        <img
          className={['center--image rounded-dialogue'].join(' ')}
          src={artist.picture}
          alt={`${artist.name} Facebook profile photo`}
        />
      </div>
      {/* AD ACCOUNT */}
      <ConnectProfilesCardAdAccount
        artist={artist}
        onChange={onSelectChange}
        className="mb-5"
      />
      {/* COUNTRY SELECT */}
      <ConnectProfilesCardCountry
        artist={artist}
        onChange={onSelectChange}
        className="mb-5"
      />
      {/* CONNECT BUTTON */}
      <ConnectButtonElType
        className={[
          'flex items-center justify-between w-full',
          'h-14 rounded-button px-3',
          connect && !exists ? 'bg-green' : 'bg-grey-1',
          exists ? 'bg-grey-2' : null,
        ].join(' ')}
        aria-label="Connect profile"
        onClick={onConnectClick}
      >
        <p className="mb-0 font-bold">{exists ? 'Already connected' : 'Connect'}</p>
        {!exists && (
          <div className="flex bg-white rounded-button w-5 h-5 p-1">
            <TickIcon
              className={`w-full h-auto ${connect ? 'visible' : 'hidden'}`}
              fill={brandColors.green}
            />
          </div>
        )}
      </ConnectButtonElType>
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
