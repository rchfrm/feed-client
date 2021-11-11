import React from 'react'
import useAsyncEffect from 'use-async-effect'
import { useRouter } from 'next/router'

import * as integrationErrorsHelpers from '@/app/helpers/integrationErrorsHelpers'
import * as server from '@/app/helpers/appServer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import IntegrationErrorContent from '@/app/IntegrationErrorContent'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useUnconfirmedEmails from '@/app/hooks/useUnconfirmedEmails'

import * as ROUTES from '@/app/constants/routes'

// THE COMPONENT
const IntegrationErrorHandler = () => {
  // Handle showing error
  const [patchError, setPatchError] = React.useState(null)
  const [showError, setShowError] = React.useState(false)
  const [integrationError, setIntegrationError] = React.useState(null)
  const [networkError, setNetworkError] = React.useState(null)
  const [isPending, setIsPending] = React.useState(false)
  const [hasFetchedArtistErrors, setHasFetchedArtistErrors] = React.useState(false)
  const isLoggedIn = useLoggedInTest()
  const isDevelopment = process.env.NODE_ENV === 'development'
  // Import artist context
  const {
    artist,
    artistId,
  } = React.useContext(ArtistContext)
  // Import user context
  const { user, hasPendingEmail } = React.useContext(UserContext)
  // Import Auth context
  const { auth, accessToken, redirectType } = React.useContext(AuthContext)
  const { globalLoading } = React.useContext(InterfaceContext)
  const unconfirmedEmails = useUnconfirmedEmails(user)
  const router = useRouter()

  const fetchError = async () => {
    // Stop here if there are no artists associated with an account
    if (!user.artists || !user.artists.length) return
    // Get any missing permissions from the FB redirect response
    const { missingScopes = [] } = auth
    // Handle missing scopes from FB
    if (missingScopes.length) {
      const error = {
        code: 'missing_permission_scope',
        context: missingScopes,
      }
      return integrationErrorsHelpers.getErrorResponse({ error })
    }

    // * Stop here if running locally
    if (isDevelopment) return

    if (!artist || !artistId) return
    // Test whether user owns artist
    const { artists: userArtists } = user
    const { role: artistRole } = userArtists.find(({ id }) => id === artistId) || {}
    const artistOwned = artistRole === 'owner' || artistRole === 'sysadmin' || artistRole === 'collaborator'
    // Stop here if artist is not owned
    if (!artistOwned) return
    // Fetch errors from server
    const { res: errors, error: networkError } = await server.getIntegrationErrors(artistId)

    if (networkError) {
      setNetworkError(networkError)
      return
    }

    const formattedErrors = integrationErrorsHelpers.formatErrors(errors)
    const [error] = formattedErrors

    return integrationErrorsHelpers.getErrorResponse({ error, artist })
  }

  // Run async request for artist errors
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    setIsPending(true)
    const errorResponse = await fetchError()

    setIntegrationError(errorResponse)
    setIsPending(false)
    setHasFetchedArtistErrors(true)
  }, [artistId])

  const checkAndShowUserError = () => {
    if (!user.artists || !user.artists.length || router.pathname === ROUTES.CONFIRM_EMAIL) return

    // Handle email not confirmed
    if (!integrationError && hasPendingEmail && unconfirmedEmails.length) {
      const email = unconfirmedEmails[0]
      const error = {
        message: 'User email has not been confirmed',
        code: 'email_not_confirmed',
      }
      setIntegrationError(integrationErrorsHelpers.getErrorResponse({ error, email }))
    }
  }

  React.useEffect(() => {
    if (isDevelopment || !isLoggedIn || globalLoading || !hasFetchedArtistErrors) {
      return
    }
    checkAndShowUserError()
  // eslint-disable-next-line
  }, [isLoggedIn, globalLoading, hasFetchedArtistErrors])

  const hasErrorWithAccessToken = React.useMemo(() => {
    if (!integrationError) return false
    const { code: errorCode } = integrationError
    return errorCode === 'expired_access_token'
  }, [integrationError])

  const errorRequiresReAuth = React.useMemo(() => {
    if (!integrationError) return false
    const { action: errorAction } = integrationError
    return errorAction === 'fb_reauth'
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
    const showError = !!(patchError || networkError)
    setShowError(showError)
  }, [patchError, networkError])

  // Store new access token when coming back from a redirect
  const accessTokenUpdated = React.useRef(false)
  useAsyncEffect(async () => {
    // DO NOT UPDATE ACCESS TOKEN if there is:
    // Still loading going on, or
    // The redirect is from a sign in, or
    // The error does not require a reauth,
    // No new access token, or
    // It's already run once.
    if (
      isPending
      || redirectType === 'signIn'
      || !errorRequiresReAuth
      || !accessToken
      || accessTokenUpdated.current
    ) {
      return
    }
    // Update access token
    setPatchError(null)
    accessTokenUpdated.current = true
    const artistIds = user.artists.map(({ id }) => id)
    const { error } = await server.updateAccessToken(artistIds, accessToken)
    if (error) {
      setPatchError(error)
    }
  }, [isPending, redirectType, errorRequiresReAuth, accessToken, hasErrorWithAccessToken, artistId])

  // Function to hide integration error
  const hideIntegrationErrors = React.useCallback(() => {
    setShowError(false)
  }, [])

  if (isPending || !showError) return null

  return (
    <IntegrationErrorContent
      integrationError={integrationError}
      networkError={networkError || patchError}
      showError={showError}
      dismiss={hideIntegrationErrors}
    />
  )
}

export default IntegrationErrorHandler
