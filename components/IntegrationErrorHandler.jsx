import React from 'react'
import { useAsync } from 'react-async'

import * as integrationErrorsHelpers from './helpers/integrationErrorsHelpers'
import server from './helpers/server'
import { ArtistContext } from './contexts/Artist'
import { UserContext } from './contexts/User'
import { AuthContext } from './contexts/Auth'

import IntegrationErrorContent from './IntegrationErrorContent'

// RUN THIS TO FETCH ERRORS
const fetchError = async ({ auth, user, artist, artistId, accessToken }) => {
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
  // Stop here if there is an access token
  // (because it will be sent to server to fix error)
  if (accessToken) return
  // If no missing scopes from FB, get error from server...
  if (!user.artists) return
  if (!artist || !artistId) return
  // Test whether user owns artist
  const { artists: userArtists } = user
  const { role: artistRole } = userArtists.find(({ id }) => id === artistId) || {}
  const artistOwned = artistRole === 'owner' || artistRole === 'sysadmin'
  // Stop here if artist is now owned
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
  const [showError, setShowError] = React.useState(false)
  // Import artist context
  const {
    artist,
    artistId,
  } = React.useContext(ArtistContext)
  // Import user context
  const { user } = React.useContext(UserContext)
  // Import Auth context
  const { auth, accessToken } = React.useContext(AuthContext)
  // Run async request for errors
  const { data: integrationError, error: componentError, isPending } = useAsync({
    promiseFn: fetchError,
    watch: artistId,
    // Vars to pass to promiseFn
    auth,
    user,
    artist,
    artistId,
    accessToken,
  })

  // Decide whether to show integration error
  React.useEffect(() => {
    // Don't show error message if no error
    if (!integrationError) return
    const { hidden } = integrationError
    setShowError(!hidden)
  }, [integrationError])

  // Store new access token when coming back from a redirect
  const accessTokenUpdated = React.useRef(false)
  React.useEffect(() => {
    // Stop here if user is loading, there is no new access token, or it's already run once
    if (!accessToken || accessTokenUpdated.current) return
    const { artists: userArtists = [] } = user
    const userArtistIds = userArtists.reduce((ids, { role, id }) => {
      if (role !== 'owner') return ids
      return [...ids, id]
    }, [])
    if (!userArtistIds.length) return
    // Update access token
    accessTokenUpdated.current = true
    server.updateAccessToken(userArtistIds, accessToken)
  }, [accessToken])

  // Function to hide integration error
  const hideIntegrationErrors = () => setShowError(false)

  if (isPending || componentError || !integrationError || !showError) return null

  return (
    <IntegrationErrorContent
      integrationError={integrationError}
      dismiss={hideIntegrationErrors}
    />
  )
}

export default IntegrationErrorHandler
