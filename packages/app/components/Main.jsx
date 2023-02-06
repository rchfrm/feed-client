import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import InitUser from '@/app/InitUser'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import IntegrationErrorHandler from '@/app/IntegrationErrorHandler'
import NotificationsHandler from '@/app/NotificationsHandler'
import useControlsStore from '@/app/stores/controlsStore'
import useBillingStore from '@/app/stores/billingStore'
import useCheckProfileSetupStatus from '@/app/hooks/useCheckProfileSetupStatus'
import * as server from '@/app/helpers/appServer'
import { profileStatus } from '@/app/helpers/artistHelpers'
import { formatPostsMinimal } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  initControlsStore: state.initControlsStore,
  updateLinksWithIntegrations: state.updateLinksWithIntegrations,
  clearAll: state.clearAll,
  updateProfileSetUpStatus: state.updateProfileSetUpStatus,
  controlsLoading: state.isControlsLoading,
})

const getBillingStoreState = (state) => ({
  setupBilling: state.setupBilling,
  organization: state.organization,
})

function Main({ children }) {
  const { user } = React.useContext(UserContext)
  const { artistId, artist, setEnabledPosts } = React.useContext(ArtistContext)
  const { isNavExpanded, hasNav } = React.useContext(InterfaceContext)
  const isFirstRender = React.useRef(true)

  const {
    getProfileSetupStatus,
    profileSetupConditions,
  } = useCheckProfileSetupStatus()

  // Setup controls store when artist changes
  const {
    initControlsStore,
    updateLinksWithIntegrations,
    clearAll,
    controlsLoading,
    updateProfileSetUpStatus,
  } = useControlsStore(getControlsStoreState)

  useAsyncEffect(async () => {
    if (! artistId) return

    clearAll()

    await initControlsStore(artist, 'fetchData')
  }, [artistId])

  const { setupBilling } = useBillingStore(getBillingStoreState)

  // Setup billing store
  React.useEffect(() => {
    setupBilling(user, artist)
  }, [artist, setupBilling, user])

  // Update integrations when they change on artist
  React.useEffect(() => {
    if (Array.isArray(artist.integrations)) {
      updateLinksWithIntegrations(artist)
    }
  // eslint-disable-next-line
  }, [artist.integrations])

  const fetchEnabledPosts = async () => {
    const enabledPosts = await server.getPosts({
      artistId,
      sortBy: ['normalized_score'],
      filterBy: {
        promotion_enabled: [true],
      },
      limit: 3,
    })
    setEnabledPosts(formatPostsMinimal(enabledPosts))
  }

  // Update profile setup status in controls store
  useAsyncEffect(async () => {
    if (! user.id || (user.artists.length && ! artistId) || (artistId && controlsLoading)) return

    // Fetch enabled posts only once
    if (isFirstRender.current && artistId) {
      isFirstRender.current = false
      await fetchEnabledPosts()
      return
    }

    updateProfileSetUpStatus(getProfileSetupStatus() || profileStatus.confirmSetup)
  }, [profileSetupConditions, artistId, user, controlsLoading])

  return (
    <main
      id="page--container"
      className={[
        'flex flex-col flex-1 items-end',
        'self-end transition-width duration-500',
        'pt-6 sm:pt-8',
        hasNav ? 'md:py-0 md:pr-0 md:pl-20' : 'md:p-0',
        isNavExpanded ? '!w-[calc(100%-120px)]' : '!w-full',
      ].join(' ')}
    >
      <InitUser>
        {children}
        <IntegrationErrorHandler />
        <NotificationsHandler />
      </InitUser>
    </main>
  )
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Main
