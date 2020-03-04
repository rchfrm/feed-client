import React from 'react'


import LastItem from './elements/LastItem'
import ConnectedArtistPanel from './ConnectArtistPanel'
import artistHelpers from './helpers/artistHelpers'

// IMPORT STYLES
import connectArtistStyles from './ConnectArtist.module.css'
import postStyles from './PostsPage.module.css'

const styles = {
  ...connectArtistStyles,
  ...postStyles,
}


function ConnectArtists({
  artistAccounts,
  setArtistAccounts,
  setError,
}) {
  console.log('artistAccounts', artistAccounts)
  // SHOW ERROR IF THE USER ATTEMPTS TO EDIT FACEBOOK PAGE OR INSTAGRAM ACCOUNT
  const contactUs = e => {
    setError({
      message: 'To change your connected Facebook Page or Instagram Account, contact us at support@archform.ltd',
    })
    e.preventDefault()
  }

  const updateArtists = (action) => {
    const newArtistsState = artistHelpers.getNewArtistState(artistAccounts, action)
    console.log('newArtistsState', newArtistsState)
    setArtistAccounts(newArtistsState)
  }

  // const sortedArtistAccounts = helper.artistHelpers(artistAccounts)
  const artistAccountsArray = Object.values(artistAccounts)

  const artistList = artistAccountsArray.map((artistAccount) => {
    return (
      <ConnectedArtistPanel
        key={artistAccount.page_id}
        artistAccount={artistAccount}
        updateArtists={updateArtists}
        setError={setError}
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


export default ConnectArtists
