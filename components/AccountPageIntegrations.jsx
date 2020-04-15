
// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import Error from './elements/Error'
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
// IMPORT PAGES
import IntegrationsLoader from './IntegrationsLoader'

import MarkdownText from './elements/MarkdownText'
import copy from '../copy/AccountPageCopy'
import globalCopy from '../copy/global'
// IMPORT STYLES
import styles from './Integrations.module.css'
import sidePanelStyles from './SidePanel.module.css'


const Artists = () => {
  const { user = {} } = React.useContext(UserContext)
  const { artists = [] } = user
  const [errors, setErrors] = React.useState([])
  // IF THE USER HAS NO ARTISTS, ASK THEM TO CONNECT ONE
  // TODO: Make this look better
  if (artists.length === 0) {
    return <MarkdownText markdown={globalCopy.noArtists} />
  }

  // CREATE LIST OF ARTISTS AND THEIR INTEGRATIONS
  const artistList = artists.map(artist => {
    return (
      <li key={artist.id}>

        <h3>{artist.name}</h3>

        {/* Errors */}
        {errors.map((error, index) => {
          return <Error error={error} messagePrefix="Error: " key={index} />
        })}

        <IntegrationsLoader
          artistId={artist.id}
          artistName={artist.name}
          setErrors={setErrors}
        />

      </li>
    )
  })

  return (
    <ul>{artistList}</ul>
  )
}


function AccountPageIntegrations() {
  return (
    <div className={styles['account-integrations']}>
      <h2 className={sidePanelStyles.SidePanel__Header}>Connections</h2>
      {/* COPY */}
      <MarkdownText markdown={copy.connectionsDialogue} />
      {/* LINKS */}
      <Artists />
    </div>
  )
}

export default AccountPageIntegrations
