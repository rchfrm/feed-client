import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'

import ConnectProfilesCardSelectPlaceholder from '@/app/ConnectProfilesCardSelectPlaceholder'


const ConnectProfilesCardAdAccount = ({
  artist,
  onChange,
  className,
}) => {
  const {
    exists,
    available_facebook_ad_accounts: availableAdAccounts,
    selected_facebook_ad_account: selectedAdAccount,
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
      label="Select an ad account"
      handleChange={onChange}
      selectedValue={artist.country_code}
      options={adAccountOptions}
      required
      className={className}
    />
  )
}

ConnectProfilesCardAdAccount.propTypes = {
  artist: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesCardAdAccount.defaultProps = {
  className: null,
}

export default ConnectProfilesCardAdAccount
