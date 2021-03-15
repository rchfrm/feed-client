import React from 'react'

import LastItem from '@/elements/LastItem'
import ConnectProfilesCard from '@/app/ConnectProfilesCard'
import * as artistHelpers from '@/app/helpers/artistHelpers'

// IMPORT STYLES
import ConnectProfilesStyles from '@/app/ConnectProfiles.module.css'
import postStyles from '@/app/PostsPage.module.css'

const styles = {
  ...ConnectProfilesStyles,
  ...postStyles,
}


function ConnectProfilesList({
  artistAccounts,
  updateArtists,
  setButtonDisabled,
  setDisabledReason,
  setErrors,
}) {
  // SHOW ERROR IF THE USER ATTEMPTS TO EDIT FACEBOOK PAGE OR INSTAGRAM ACCOUNT
  const contactUs = e => {
    setErrors([{
      message: 'To change your connected Facebook Page or Instagram Account, contact us at support@archform.ltd',
    }])
    e.preventDefault()
  }

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
      setDisabledReason('Please select a country for each account')
    }

    if (!selectedAccounts.length) {
      setDisabledReason('Please select at least one account')
    }
  }, [artistAccounts, setDisabledReason, setButtonDisabled])

  const artistAccountsArray = React.useMemo(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  const artistList = artistAccountsArray.map((artistAccount) => {
    return (
      <ConnectProfilesCard
        key={artistAccount.page_id}
        artistAccount={artistAccount}
        updateArtists={updateArtists}
        setErrors={setErrors}
        singular={artistAccounts.length === 1}
        contactUs={contactUs}
      />
    )
  })

  artistList.push(LastItem())

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
        styles.artistIntegrations,
      ].join(' ')}
    >
      {artistList}
    </ul>
  )
}


export default ConnectProfilesList
