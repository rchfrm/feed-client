import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'

import * as server from '@/app/helpers/appServer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import IntegrationErrorContent from '@/app/IntegrationErrorContent'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useUnconfirmedEmails from '@/app/hooks/useUnconfirmedEmails'

import useNotificationStore from '@/app/stores/notificationsStore'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/integrationErrorsCopy'
import useDismissNotification from '@/app/hooks/useDismissNotification'

const getNotificationsStoreState = (state) => ({
  notifications: state.notifications,
  loading: state.loading,
})

const IntegrationErrorHandler = () => {
  const [showError, setShowError] = React.useState(false)
  const [networkError, setNetworkError] = React.useState(null)
  const [integrationError, setIntegrationError] = React.useState(null)
  const [hasCheckedArtistErrors, setHasCheckedArtistErrors] = React.useState(false)
  const isLoggedIn = useLoggedInTest()
  const isDevelopment = process.env.NODE_ENV === 'development'

  const { notifications, loading: notificationsLoading } = useNotificationStore(getNotificationsStoreState, shallow)
  const { artist, artistId } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { user, hasPendingEmail } = React.useContext(UserContext)
  const { accessToken, redirectType } = React.useContext(AuthContext)
  const { globalLoading } = React.useContext(InterfaceContext)
  const unconfirmedEmails = useUnconfirmedEmails(user)
  const router = useRouter()
  const dismissNotification = useDismissNotification(integrationError)

  const checkError = React.useCallback((integrationError) => {
    // Stop here if there are no artists associated with an account
    if (!user.artists || !user.artists.length || !integrationError) return

    // Stop here if running locally
    if (isDevelopment) return

    if (!artist || !artistId) return
    // Test whether user owns artist
    const { artists: userArtists } = user
    const { role: artistRole } = userArtists.find(({ id }) => id === artistId) || {}
    const artistOwned = artistRole === 'owner' || artistRole === 'sysadmin' || artistRole === 'collaborator'
    // Stop here if artist is not owned
    if (!artistOwned) return

    return integrationError
  }, [artist, artistId, user, isDevelopment])

  React.useEffect(() => {
    if (!notificationsLoading) {
      const [integrationError] = notifications.filter(({ isComplete, type, hidden }) => type === 'alert' && !isComplete && !hidden)

      if (integrationError) {
        setIntegrationError(checkError(integrationError))
      }
      setHasCheckedArtistErrors(true)
    }
  }, [notifications, checkError, notificationsLoading])

  const checkAndShowUserError = () => {
    if (!user.artists || !user.artists.length || router.pathname === ROUTES.CONFIRM_EMAIL || !hasSetUpProfile) return

    // Handle email not confirmed
    if (!integrationError && hasPendingEmail && unconfirmedEmails.length) {
      const email = unconfirmedEmails[0]
      const topic = 'email_not_confirmed'
      const error = {
        topic,
        description: copy[topic](email.email),
        ctaType: 'email_confirmation',
        emailType: email.type,
        ctaText: 'Edit email',
      }
      setIntegrationError(error)
    }
  }

  React.useEffect(() => {
    if (isDevelopment || !isLoggedIn || globalLoading || !hasCheckedArtistErrors) {
      return
    }
    checkAndShowUserError()
  // eslint-disable-next-line
  }, [isLoggedIn, globalLoading, hasCheckedArtistErrors])

  const hasErrorWithAccessToken = React.useMemo(() => {
    if (!integrationError) return false
    const { topic } = integrationError
    return topic === 'facebook-expired-access-token'
  }, [integrationError])

  const errorRequiresReAuth = React.useMemo(() => {
    if (!integrationError) return false
    const { ctaType } = integrationError
    return ctaType === 'fb_reauth'
  }, [integrationError])

  // Decide whether to show integration error
  React.useEffect(() => {
    // Don't show error message if no error
    if (!integrationError) return
    // Don't show error message about access token if there is an access token
    // (because it will be sent to server to fix error)
    if (accessToken && hasErrorWithAccessToken) return
    // Handle integration error
    const { hidden } = integrationError
    setShowError(!hidden)
  }, [integrationError, accessToken, hasErrorWithAccessToken])

  // Show error if there are network errors
  React.useEffect(() => {
    const showError = !!(networkError)
    setShowError(showError)
  }, [networkError])

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
      || !errorRequiresReAuth
      || !accessToken
      || accessTokenUpdated.current
    ) {
      return
    }
    // Update access token
    setNetworkError(null)
    accessTokenUpdated.current = true
    const artistIds = user.artists.map(({ id }) => id)
    const { error } = await server.updateAccessToken(artistIds, accessToken)
    if (error) {
      setNetworkError(error)
    }
  }, [redirectType, errorRequiresReAuth, accessToken, hasErrorWithAccessToken, artistId])

  // Function to hide integration error
  const hideIntegrationErrors = React.useCallback(() => {
    const { isDismissible, hidden } = integrationError
    if (isDismissible && !hidden) {
      dismissNotification()
    }
    setShowError(false)
  }, [dismissNotification, integrationError])

  if (!showError) return null

  return (
    <IntegrationErrorContent
      integrationError={integrationError}
      networkError={networkError}
      showError={showError}
      dismiss={hideIntegrationErrors}
    />
  )
}

export default IntegrationErrorHandler
