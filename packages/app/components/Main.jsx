import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import InitUser from '@/app/InitUser'

import { SidePanelContextProvider } from '@/app/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import IntegrationErrorHandler from '@/app/IntegrationErrorHandler'
import NotificationsHandler from '@/app/NotificationsHandler'

import useControlsStore from '@/app/stores/controlsStore'
import useCheckProfileSetupStatus from '@/app/hooks/useCheckProfileSetupStatus'

import * as server from '@/app/helpers/appServer'

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
  const { getProfileSetupStatus } = useCheckProfileSetupStatus()

  // SETUP CONTROLS STORE WHEN ARTIST CHANGES
  const {
    initControlsStore,
    updateLinksWithIntegrations,
    clearAll,
    controlsLoading,
    updateProfileSetUpStatus,
  } = useControlsStore(getControlsStoreState)

  const fetchEnabledPosts = async () => {
    return server.getPosts({
      artistId,
      sortBy: ['normalized_score'],
      filterBy: {
        promotion_enabled: [true],
      },
    })
  }

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
    if (!user.id || (user.artists.length && !artistId) || controlsLoading) return

    const { hasSetUpProfile } = artist

    if (hasSetUpProfile) {
      return
    }

    const enabledPosts = await fetchEnabledPosts()
    const profileSetupStatus = getProfileSetupStatus(enabledPosts)

    updateProfileSetUpStatus(profileSetupStatus)
  }, [controlsLoading, user, artistId])

  return (
    <main id="page--container" className="md:ml-10">
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
