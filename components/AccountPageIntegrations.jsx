
// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
// IMPORT ELEMENTS
import AsteriskIcon from './icons/AsterixIcon'
// IMPORT PAGES
import ConnectionsLoader from './AccountPageLoader'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
// IMPORT STYLES
import styles from './AccountPage.module.css'
import sidePanelStyles from './SidePanel.module.css'

function IntegrationsSection() {
  return (
    <div className={styles['account-integrations']}>
      <h2 className={sidePanelStyles.SidePanel__Header}>Connections</h2>
      <p className={styles.p}>
        The default link in your promoted posts is marked by
        {' '}
        <AsteriskIcon width={15} />.
        {' '}
        You can change the link on each specific post
        {' '}
        <Link href={ROUTES.POSTS}>
          <a>here</a>
        </Link>
      </p>
      <Artists />
    </div>
  )
}

export default IntegrationsSection

function Artists() {
  const { user = {} } = React.useContext(UserContext)
  const { artists = [] } = user
  // IF THE USER HAS NO ARTISTS, ASK THEM TO CONNECT ONE
  // TODO: Make this look better
  if (artists.length === 0) {
    return <p>Please connect your first artist</p>
  }
  // END IF THE USER HAS NO ARTISTS, ASK THEM TO CONNECT ONE

  // CREATE LIST OF ARTISTS AND THEIR INTEGRATIONS
  const artistList = artists.map(artist => {
    return (
      <li key={artist.id}>

        <h3>{artist.name}</h3>

        <ConnectionsLoader
          artistId={artist.id}
          artistName={artist.name}
        />

      </li>
    )
  })
  // END CREATE LIST OF ARTISTS AND THEIR INTEGRATIONS

  return (
    <ul>{artistList}</ul>
  )
}
