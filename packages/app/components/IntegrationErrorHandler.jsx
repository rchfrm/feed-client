import React from 'react'
import { useAsync } from 'react-async'

import * as integrationErrorsHelpers from '@/app/helpers/integrationErrorsHelpers'
import * as server from '@/app/helpers/appServer'
import { ArtistContext } from '@/contexts/ArtistContext'
import { UserContext } from '@/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'

import IntegrationErrorContent from '@/app/IntegrationErrorContent'

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
  // Stop here if running locally
  if (process.env.build_env === 'development') return
  // If no missing scopes from FB, get error from server...
  if (!user.artists) return
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
    // Don't show error message if there is an access token
    // (because it will be sent to server to fix error)
    if (accessToken) return
    // Handle integration error
    const { hidden } = integrationError
    setShowError(!hidden)
  }, [integrationError, accessToken])

  // Store new access token when coming back from a redirect
  const accessTokenUpdated = React.useRef(false)
  React.useEffect(() => {
    // Stop here if there is...
    // No integration error, or
    // No new access token, or
    // It's already run once.
    if (!integrationError || !accessToken || accessTokenUpdated.current) return
    // Update access token
    accessTokenUpdated.current = true
    server.updateAccessToken([artistId], accessToken)
  }, [accessToken, integrationError, artistId])

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
