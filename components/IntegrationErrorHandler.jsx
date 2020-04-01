import React from 'react'
import { useAsync } from 'react-async'

import * as integrationErrorsHelpers from './helpers/integrationErrorsHelpers'
import server from './helpers/server'
import { ArtistContext } from './contexts/Artist'
import { UserContext } from './contexts/User'

import IntegrationErrorContent from './IntegrationErrorContent'

const feedArtistId = '0mpyUFo2OApQnawtH6cB'

// RUN THIS TO FETCH ERRORS
const fetchError = async ({ user, artist, artistId }) => {
  if (!user.artists) return
  if (!artist || !artistId) return
  // * FOR TESTING ONLY
  if (artistId !== feedArtistId) return
  // Test whether user owns artist
  const { artists: userArtists } = user
  const { role: artistRole } = userArtists.find(({ id }) => id === artistId) || {}
  const artistOwned = artistRole === 'owner' || artistRole === 'sysadmin'
  if (!artistOwned) return
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
  // Import user
  const { user } = React.useContext(UserContext)
  // Run async request for errors
  const { data: integrationError, error: componentError, isPending } = useAsync({
    promiseFn: fetchError,
    watch: artistId,
    // Vars to pass to promiseFn
    user,
    artist,
    artistId,
  })
  // Decide whether to show integration error
  React.useEffect(() => {
    if (!integrationError) return
    const { hidden } = integrationError
    setShowError(!hidden)
  }, [integrationError])

  // Function to hide integration error
  const hideIntegrationErrors = () => setShowError(false)

  if (isPending || componentError || !integrationError || !showError) return null

  return (
    <IntegrationErrorContent integrationError={integrationError} dismiss={hideIntegrationErrors} />
  )
}

export default IntegrationErrorHandler
