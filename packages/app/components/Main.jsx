import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import InitUser from '@/app/InitUser'

import { SidePanelContextProvider } from '@/app/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { TargetingContextProvider } from '@/app/contexts/TargetingContext'

import IntegrationErrorHandler from '@/app/IntegrationErrorHandler'
import NotificationsHandler from '@/app/NotificationsHandler'

import useControlsStore from '@/app/stores/controlsStore'
import useCheckProfileSetupStatus from '@/app/hooks/useCheckProfileSetupStatus'

const getControlsStoreState = (state) => ({
  initControlsStore: state.initControlsStore,
  updateLinksWithIntegrations: state.updateLinksWithIntegrations,
  clearAll: state.clearAll,
  updateProfileSetUpStatus: state.updateProfileSetUpStatus,
  controlsLoading: state.isControlsLoading,
})

function Main({ children }) {
  const { user } = React.useContext(UserContext)
  const { artistId, artist } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const getProfileSetupStatus = useCheckProfileSetupStatus()

  // SETUP CONTROLS STORE WHEN ARTIST CHANGES
  const {
    initControlsStore,
    updateLinksWithIntegrations,
    clearAll,
    controlsLoading,
    updateProfileSetUpStatus,
  } = useControlsStore(getControlsStoreState)

  useAsyncEffect(async () => {
    if (!artistId) return

    clearAll()

    await initControlsStore(artist, 'fetchData')
    toggleGlobalLoading(false)
  }, [artistId])

  // UPDATE INTEGRATIONS when they change on artist
  React.useEffect(() => {
    if (Array.isArray(artist.integrations)) {
      updateLinksWithIntegrations(artist)
    }
  // eslint-disable-next-line
  }, [artist.integrations])

  // Update profile setup status in controls store
  useAsyncEffect(async () => {
    if (!user.id || controlsLoading) return

    const { setup_completed_at: setupCompletedAt } = artist

    if (setupCompletedAt) {
      return
    }

    const profileSetupStatus = await getProfileSetupStatus()

    updateProfileSetUpStatus(profileSetupStatus)
  }, [controlsLoading])

  return (
    <main id="page--container" className="md:ml-10">
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
