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
  // Toggled button disabled based on country select OR ad account select OR no accounts selected
  React.useEffect(() => {
    const allAccounts = Object.values(artistAccounts)
    // Test whether every account already exists
    const everyAccountExists = allAccounts.every(({ exists }) => exists)
    // Make sure every every connected account has a country set
    const allCountriesSet = allAccounts.every(({ country_code, connect }) => {
      return country_code || !connect
    })
    // Make sure every every connected account has an ad account set
    const allAdAccountsSet = allAccounts.every(({ adaccount_id, connect }) => {
      return adaccount_id || !connect
    })
    // Find all accounts that don't yet exist but are selected to connect
    const selectedAccounts = allAccounts.filter(({ connect }) => connect)
    // Disable button if country is not set, ad account is not set, or no selected, non-existing accounts
    const disableButton = !allCountriesSet || !allAdAccountsSet || (!selectedAccounts.length && !everyAccountExists)
    setButtonDisabled(disableButton)

    if (!disableButton) {
      setDisabledReason('')
      return
    }

    if (!allAdAccountsSet) {
      setDisabledReason('Please select an ad account for each account you want to connect.')
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

  const cardClasses = [
    'mb-8 xs:mb-0',
    'col-span-6',
    'lg:col-span-4',
    'bmw:col-span-4',
  ].join(' ')

  return (
    <ul
      className={[
        'xs:grid',
        'grid-cols-12',
        'gap-8',
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
            className={cardClasses}
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
