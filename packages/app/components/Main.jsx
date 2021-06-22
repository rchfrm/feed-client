// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
import InitUser from '@/app/InitUser'
// IMPORT CONTEXTS
import { SidePanelContextProvider } from '@/app/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
// IMPORT ELEMENTS
import IntegrationErrorHandler from '@/app/IntegrationErrorHandler'
import NotificationsHandler from '@/app/NotificationsHandler'
// // IMPORT STORES
import useControlsStore from '@/app/stores/controlsStore'

const controlsStoreInit = state => state.initControlsStore
const getUpdateLinksWithIntegrations = state => state.updateLinksWithIntegrations
const controlsStoreClearAll = state => state.clearAll

function Main({ children }) {
  const {
    artistId,
    artist,
  } = React.useContext(ArtistContext)

  // SETUP CONTROLS STORE WHEN ARTIST CHANGES
  const setupControlsStore = useControlsStore(controlsStoreInit)
  const clearControlsStore = useControlsStore(controlsStoreClearAll)
  React.useEffect(() => {
    if (!artistId) return
    clearControlsStore()
    setupControlsStore(artist, 'fetchLinks')
  // eslint-disable-next-line
  }, [artistId])

  // UPDATE INTEGRATIONS when they change on artist
  const updateLinksWithIntegrations = useControlsStore(getUpdateLinksWithIntegrations)
  React.useEffect(() => {
    if (Array.isArray(artist.integrations)) updateLinksWithIntegrations(artist)
  // eslint-disable-next-line
  }, [artist.integrations])

  return (
    <main id="page--container">
      <SidePanelContextProvider>
        <InitUser>
          {children}
          <IntegrationErrorHandler />
          <NotificationsHandler />
        </InitUser>
      </SidePanelContextProvider>
    </main>
  )
}

export default Main

Main.propTypes = {
  children: PropTypes.element.isRequired,
}
