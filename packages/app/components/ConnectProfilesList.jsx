import React from 'react'

import ConnectProfilesCard from '@/app/ConnectProfilesCard'
import * as artistHelpers from '@/app/helpers/artistHelpers'

function ConnectProfilesList({
  artistAccounts,
  updateArtists,
  setButtonDisabled,
  setDisabledReason,
  setErrors,
}) {
  // Toggled button disabled based on country select OR no accounts selected
  React.useEffect(() => {
    const allAccounts = Object.values(artistAccounts)
    // Test whether every account already exists
    const everyAccountExists = allAccounts.every(({ exists }) => exists)
    // Find all accounts that don't yet exist but are selected to connect
    const selectedAccounts = allAccounts.filter(({ connect, exists }) => connect && !exists)
    // Disable button if country is not set, or no selected, non-existing accounts
    const disableButton = !selectedAccounts.length && !everyAccountExists
    setButtonDisabled(disableButton)

    if (!disableButton) {
      setDisabledReason('')
      return
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
      id="artist-integrations"
      className={[
        'grid',
        'grid-cols-12',
        'row-gap-8',
        'col-gap-0',
        'xs:col-gap-6',
        'sm:col-gap-8',
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


export default ConnectProfilesList
