// IMPORT PACKAGES
import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
// IMPORT COMPONENTS
import InitUser from '@/app/InitUser'
// IMPORT CONTEXTS
import { SidePanelContextProvider } from '@/app/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContextProvider } from '@/app/contexts/TargetingContext'
// IMPORT ELEMENTS
import IntegrationErrorHandler from '@/app/IntegrationErrorHandler'
import NotificationsHandler from '@/app/NotificationsHandler'
// // IMPORT STORES
import useControlsStore from '@/app/stores/controlsStore'

import * as ROUTES from '@/app/constants/routes'

const controlsStoreInit = state => state.initControlsStore
const getUpdateLinksWithIntegrations = state => state.updateLinksWithIntegrations
const controlsStoreClearAll = state => state.clearAll

function Main({ children }) {
  const { artistId, artist } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const [isSignedOutPage, setIsSignedOutPage] = React.useState(true)
  const router = useRouter()

  // SETUP CONTROLS STORE WHEN ARTIST CHANGES
  const setupControlsStore = useControlsStore(controlsStoreInit)
  const clearControlsStore = useControlsStore(controlsStoreClearAll)
  useAsyncEffect(async () => {
    if (!artistId) return
    clearControlsStore()
    await setupControlsStore(artist, 'fetchData')
    toggleGlobalLoading(false)
  }, [artistId])

  // UPDATE INTEGRATIONS when they change on artist
  const updateLinksWithIntegrations = useControlsStore(getUpdateLinksWithIntegrations)
  React.useEffect(() => {
    if (Array.isArray(artist.integrations)) updateLinksWithIntegrations(artist)
  // eslint-disable-next-line
  }, [artist.integrations])

  React.useEffect(() => {
    setIsSignedOutPage(ROUTES.signedOutPages.includes(router.pathname))
  }, [router.pathname])

  return (
    <main id="page--container" className={isSignedOutPage ? 'mr-0' : 'md:ml-10'}>
      <TargetingContextProvider>
        <SidePanelContextProvider>
          <InitUser>
            {children}
            <IntegrationErrorHandler />
            <NotificationsHandler />
          </InitUser>
        </SidePanelContextProvider>
      </TargetingContextProvider>
    </main>
  )
}

export default Main

Main.propTypes = {
  children: PropTypes.element.isRequired,
}
