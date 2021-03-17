import React from 'react'
import PropTypes from 'prop-types'

import ConnectProfilesCard from '@/app/ConnectProfilesCard'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const ConnectProfilesList = ({
  artistAccounts,
  updateArtists,
  setButtonDisabled,
  setDisabledReason,
  setErrors,
  className,
}) => {
  // Toggled button disabled based on country select OR no accounts selected
  React.useEffect(() => {
    const allAccounts = Object.values(artistAccounts)
    // Test whether every account already exists
    const everyAccountExists = allAccounts.every(({ exists }) => exists)
    // Make sure every every connected account has a country set
    const allCountriesSet = allAccounts.every(({ country_code, connect }) => {
      return country_code || !connect
    })
    // Find all accounts that don't yet exist but are selected to connect
    const selectedAccounts = allAccounts.filter(({ connect, exists }) => connect && !exists)
    // Disable button if country is not set, or no selected, non-existing accounts
    const disableButton = !allCountriesSet || (!selectedAccounts.length && !everyAccountExists)
    setButtonDisabled(disableButton)

    if (!disableButton) {
      setDisabledReason('')
      return
    }

    if (!allCountriesSet) {
      setDisabledReason('Please select a country for each account you want to connect.')
    }

    if (!selectedAccounts.length) {
      setDisabledReason('Please select at least one account')
    }
  }, [artistAccounts, setDisabledReason, setButtonDisabled])

  const artistAccountsArray = React.useMemo(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  return (
    <ul
      className={[
        'grid',
        'grid-cols-12',
        'row-gap-8',
        'col-gap-0',
        'xs:col-gap-6',
        'sm:col-gap-8',
        className,
      ].join(' ')}
    >
      {artistAccountsArray.map((artistAccount) => {
        return (
          <ConnectProfilesCard
            key={artistAccount.page_id}
            artist={artistAccount}
            updateArtists={updateArtists}
            setErrors={setErrors}
            className="col-span-3"
          />
        )
      })}
    </ul>
  )
}

ConnectProfilesList.propTypes = {
  artistAccounts: PropTypes.object.isRequired,
  updateArtists: PropTypes.func.isRequired,
  setButtonDisabled: PropTypes.func.isRequired,
  setDisabledReason: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesList.defaultProps = {
  className: null,
}

export default ConnectProfilesList
