import React from 'react'

import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import IntegrationErrorContent from '@/app/IntegrationErrorContent'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useUnconfirmedEmails from '@/app/hooks/useUnconfirmedEmails'

import useNotificationStore from '@/app/stores/notificationsStore'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/integrationErrorsCopy'

const getNotificationsStoreState = (state) => ({
  notifications: state.notifications,
  loading: state.loading,
})

const IntegrationErrorHandler = () => {
  const [showError, setShowError] = React.useState(false)
  const [integrationError, setIntegrationError] = React.useState(null)
  const [hasCheckedArtistErrors, setHasCheckedArtistErrors] = React.useState(false)
  const isLoggedIn = useLoggedInTest()
  const isDevelopment = process.env.NODE_ENV === 'development'

  const { notifications, loading: notificationsLoading } = useNotificationStore(getNotificationsStoreState, shallow)
  const { artist, artistId } = React.useContext(ArtistContext)
  const { user, hasPendingEmail } = React.useContext(UserContext)
  const { globalLoading } = React.useContext(InterfaceContext)
  const unconfirmedEmails = useUnconfirmedEmails(user)
  const router = useRouter()

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
    if (!user.artists || !user.artists.length || router.pathname === ROUTES.CONFIRM_EMAIL) return

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

  // Decide whether to show integration error
  React.useEffect(() => {
    // Don't show error message if no error
    if (!integrationError) return
    // Handle integration error
    const { hidden } = integrationError
    setShowError(!hidden)
  }, [integrationError])

  // Function to hide integration error
  const hideIntegrationErrors = React.useCallback(() => {
    setShowError(false)
  }, [])

  if (!showError) return null

  return (
    <IntegrationErrorContent
      integrationError={integrationError}
      showError={showError}
      dismiss={hideIntegrationErrors}
    />
  )
}

export default IntegrationErrorHandler
