import React from 'react'


import LastItem from './elements/LastItem'
import ConnectAccountsPanel from './ConnectAccountsPanel'
import artistHelpers from './helpers/artistHelpers'

// IMPORT STYLES
import connectAccountsStyles from './ConnectAccounts.module.css'
import postStyles from './PostsPage.module.css'

const styles = {
  ...connectAccountsStyles,
  ...postStyles,
}


function ConnectAccounts({
  artistAccounts,
  setArtistAccounts,
  setButtonDisabled,
  setErrors,
}) {
  // SHOW ERROR IF THE USER ATTEMPTS TO EDIT FACEBOOK PAGE OR INSTAGRAM ACCOUNT
  const contactUs = e => {
    setErrors([{
      message: 'To change your connected Facebook Page or Instagram Account, contact us at support@archform.ltd',
    }])
    e.preventDefault()
  }

  const updateArtists = (action) => {
    const newArtistsState = artistHelpers.getNewArtistState(artistAccounts, action)
    setArtistAccounts(newArtistsState)
  }

  // Toggled button disabled based on country select OR no accounts selected
  React.useEffect(() => {
    const allAccounts = Object.values(artistAccounts)
    const allCountriesSet = allAccounts.every(({ country_code, connect }) => {
      return country_code || !connect
    })
    const selectedAccounts = allAccounts.filter(({ connect }) => connect)
    setButtonDisabled(!allCountriesSet || !selectedAccounts.length)
  }, [artistAccounts])

  const artistAccountsArray = Object.values(artistAccounts)

  const artistList = artistAccountsArray.map((artistAccount) => {
    return (
      <ConnectAccountsPanel
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
    <ul id="artist-integrations" className={`frame ${styles.artistIntegrations}`}>
      {artistList}
    </ul>
  )
}


export default ConnectAccounts
