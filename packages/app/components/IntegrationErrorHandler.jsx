import React from 'react'
import useAsyncEffect from 'use-async-effect'
import shallow from 'zustand/shallow'
import * as server from '@/app/helpers/appServer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'
import IntegrationErrorContent from '@/app/IntegrationErrorContent'
import useNotificationStore from '@/app/stores/notificationsStore'
import useDismissNotification from '@/app/hooks/useDismissNotification'

const getNotificationsStoreState = (state) => ({
  notifications: state.notifications,
  isNotificationsLoading: state.isNotificationsLoading,
  integrationError: state.integrationError,
  setIntegrationError: state.setIntegrationError,
  shouldShowIntegrationError: state.shouldShowIntegrationError,
  setShouldShowIntegrationError: state.setShouldShowIntegrationError,
})

const IntegrationErrorHandler = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  const {
    notifications,
    isNotificationsLoading,
    integrationError,
    setIntegrationError,
    shouldShowIntegrationError,
    setShouldShowIntegrationError,
  } = useNotificationStore(getNotificationsStoreState, shallow)

  const { artist, artistId } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)
  const { accessToken, redirectType } = React.useContext(AuthContext)
  const dismissNotification = useDismissNotification(integrationError)

  const checkError = React.useCallback((integrationError) => {
    // Stop here if there are no artists associated with an account
    if (! user.artists || ! user.artists.length || ! integrationError) {
      return null
    }

    // Stop here if running locally
    if (isDevelopment) {
      return null
    }

    if (! artist || ! artistId) {
      return null
    }

    const { artists: userArtists } = user
    const { role: artistRole } = userArtists.find(({ id }) => id === artistId) || {}
    const artistOwned = artistRole === 'owner' || artistRole === 'sysadmin' || artistRole === 'collaborator'

    // Stop here if artist is not owned
    if (! artistOwned) {
      return null
    }

    return integrationError
  }, [artist, artistId, user, isDevelopment])

  React.useEffect(() => {
    if (! isNotificationsLoading) {
      const [integrationError] = notifications.filter(({ isComplete, type, hidden }) => type === 'alert' && ! isComplete && ! hidden)

      setIntegrationError(checkError(integrationError))
    }
  }, [notifications, checkError, isNotificationsLoading, setIntegrationError])

  const hasErrorWithAccessToken = React.useMemo(() => {
    if (! integrationError) {
      return false
    }

    const { topic } = integrationError
    return topic === 'facebook-expired-access-token'
  }, [integrationError])

  const errorRequiresReAuth = React.useMemo(() => {
    if (! integrationError) {
      return false
    }

    const { ctaType } = integrationError
    return ctaType === 'fb_reauth'
  }, [integrationError])

  // Store new access token when coming back from a redirect
  const accessTokenUpdated = React.useRef(false)

  useAsyncEffect(async () => {
    // DO NOT UPDATE ACCESS TOKEN if there is:
    // The redirect is from a sign in, or
    // The error does not require a reauth,
    // No new access token, or
    // It's already run once.
    if (
      redirectType === 'signIn'
      || ! errorRequiresReAuth
      || ! accessToken
      || accessTokenUpdated.current
    ) {
      return
    }
    // Update access token
    accessTokenUpdated.current = true
    const artistIds = user.artists.map(({ id }) => id)

    await server.updateAccessToken(artistIds, accessToken)
  }, [redirectType, errorRequiresReAuth, accessToken, hasErrorWithAccessToken, artistId])

  const hideIntegrationErrors = React.useCallback(() => {
    const { isDismissible, hidden } = integrationError
    if (isDismissible && ! hidden) {
      dismissNotification()
    }

    setShouldShowIntegrationError(false)
  }, [dismissNotification, integrationError, setShouldShowIntegrationError])

  if (! shouldShowIntegrationError) {
    return null
  }

  return (
    <IntegrationErrorContent
      integrationError={integrationError}
      showError={shouldShowIntegrationError}
      dismiss={hideIntegrationErrors}
    />
  )
}

export default IntegrationErrorHandler
