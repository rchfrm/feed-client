import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'
import TickIcon from '@/icons/TickIcon'

import brandColors from '@/constants/brandColors'

const ConnectProfilesCard = ({
  artist,
  updateArtists,
  className,
}) => {
  // console.log('artist', artist)
  const {
    page_id: artistId,
    exists,
    available_facebook_ad_accounts: availableAdAccounts,
    selected_facebook_ad_account: selectedAdAccount,
    connect,
  } = artist

  // AD ACCOUNT SELECT OPTIONS
  const adAccountOptions = availableAdAccounts.map(({ name, id: value }) => {
    return { name, value }
  })
  // HANDLE ADD ACCOUNT SELECT
  const onAdAccountSelect = React.useCallback((e) => {
    const { value: adAccountId, selectedIndex } = e.target
    const { name } = adAccountOptions[selectedIndex]
    const payload = {
      id: artistId,
      field: 'selected_facebook_ad_account',
      value: {
        id: adAccountId,
        name,
      },
    }
    updateArtists('update-artist', payload)
  // eslint-disable-next-line
  }, [])

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
      {/* Readonly if already exists */}
      {exists ? (
        <div className="mb-4">
          <span className="inputLabel__text">Ad Account</span>
          <div className="flex items-center h-14 px-3 bg-grey-2 rounded-button">
            <span className="block w-full truncate">{selectedAdAccount.name}</span>
          </div>
        </div>
      ) : (
        <Select
          name="selected_facebook_ad_account"
          label="Select an ad account"
          handleChange={onAdAccountSelect}
          options={adAccountOptions}
          selectedValue={selectedAdAccount.id}
          className="mb-4"
        />
      )}
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
