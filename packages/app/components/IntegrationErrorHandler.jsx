import React from 'react'
import { useAsync } from 'react-async'
import useAsyncEffect from 'use-async-effect'

import * as integrationErrorsHelpers from '@/app/helpers/integrationErrorsHelpers'
import * as server from '@/app/helpers/appServer'
import { ArtistContext } from '@/contexts/ArtistContext'
import { UserContext } from '@/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'

import IntegrationErrorContent from '@/app/IntegrationErrorContent'

// RUN THIS TO FETCH ERRORS
const fetchError = async ({ auth, user, artist, artistId }) => {
  // Stop here if there are no arists associated with an account
  if (!user.artists || !user.artists.length) return
  // Get any missing permissions from the FB redirect response
  const { missingScopes = [] } = auth
  // Handle missing scopes from FB
  if (missingScopes.length) {
    const error = {
      code: 'missing_permission_scope',
      context: missingScopes,
    }
    const errorResponse = integrationErrorsHelpers.getErrorResponse(error)
    return errorResponse
  }

  // * Stop here if running locally
  // if (process.env.build_env === 'development') return

  if (!artist || !artistId) return
  // Test whether user owns artist
  const { artists: userArtists } = user
  const { role: artistRole } = userArtists.find(({ id }) => id === artistId) || {}
  const artistOwned = artistRole === 'owner' || artistRole === 'sysadmin' || artistRole === 'collaborator'
  // Stop here if artist is not owned
  if (!artistOwned) return
  // Fetch errors from server
  const errors = await server.getIntegrationErrors(artistId)
    .catch((err) => {
      throw (err)
    })
  const formattedErrors = integrationErrorsHelpers.formatErrors(errors)
  const [firstError] = formattedErrors
  const errorResponse = integrationErrorsHelpers.getErrorResponse(firstError, artist)
  return errorResponse
}

// THE COMPONENT
const IntegrationErrorHandler = () => {
  // Handle showing error
  const [patchError, setPatchError] = React.useState(null)
  const [showError, setShowError] = React.useState(false)
  // Import artist context
  const {
    artist,
    artistId,
  } = React.useContext(ArtistContext)
  // Import user context
  const { user } = React.useContext(UserContext)
  // Import Auth context
  const { auth, accessToken, redirectType } = React.useContext(AuthContext)
  // Run async request for errors
  const { data: integrationError, error: networkError, isPending } = useAsync({
    promiseFn: fetchError,
    watch: artistId,
    // Vars to pass to promiseFn
    auth,
    user,
    artist,
    artistId,
    accessToken,
  })

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
