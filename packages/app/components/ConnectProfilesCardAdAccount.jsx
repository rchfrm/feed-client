import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'

import ConnectProfilesCardSelectPlaceholder from '@/app/ConnectProfilesCardSelectPlaceholder'

const ConnectProfilesCardAdAccount = ({
  artist,
  updateArtists,
  className,
}) => {
  const {
    exists,
    adaccount_id: adAccountId,
    available_facebook_ad_accounts: availableAdAccounts,
    selected_facebook_ad_account: selectedAdAccount,
    connect,
    page_id: artistId,
  } = artist
  // READONLY
  if (exists) {
    return (
      <ConnectProfilesCardSelectPlaceholder
        className={className}
        label="Ad Account"
        title={selectedAdAccount.name}
      />
    )
  }
  // AD ACCOUNT SELECT OPTIONS
  const adAccountOptions = availableAdAccounts.map(({ name, id: value }) => {
    return { name, value }
  })
  return (
    <Select
      name="selected_facebook_ad_account"
      label="Ad account"
      handleChange={(e) => {
        const { target: { value } } = e
        // Ignore placeholder
        if (value.indexOf('Choose') !== -1) return
        const payload = { id: artistId, value }
        updateArtists('update-artist-adaccount', payload)
      }}
      selectedValue={adAccountId}
      placeholder="Select ad account"
      options={adAccountOptions}
      highlight={connect}
      className={className}
    />
  )
}

ConnectProfilesCardAdAccount.propTypes = {
  artist: PropTypes.object.isRequired,
  updateArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesCardAdAccount.defaultProps = {
  className: null,
}

export default ConnectProfilesCardAdAccount
