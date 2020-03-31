import React from 'react'
import { useAsync } from 'react-async'

import * as integrationErrorsHelpers from './helpers/integrationErrorsHelpers'
import server from './helpers/server'
import { ArtistContext } from './contexts/Artist'
import { UserContext } from './contexts/User'

import IntegrationErrorContent from './IntegrationErrorContent'


// RUN THIS TO FETCH ERRORS
const fetchError = async ({ artist, artistId }) => {
  if (!artist || !artistId) return
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
  // Import artist context
  const {
    artist,
    artistId,
  } = React.useContext(ArtistContext)
  // Import user
  const { user } = React.useContext(UserContext)
  if (!user.artists) return
  // Does user own artist?
  const { artists: userArtists } = user
  const { role: artistRole } = userArtists.find(({ id }) => id === artistId)
  const artistOwned = artistRole === 'owner' || artistRole === 'sysadmin'
  if (!artistOwned) return null
  // Handle showing error
  const [showError, setShowError] = React.useState(false)
  // Run async request for errors
  const { data: integrationError, error: componentError, isPending } = useAsync({
    promiseFn: fetchError,
    watch: artistId,
    artist,
    artistId,
    onResolve: (integrationError) => {
      const { hidden } = integrationError
      setShowError(!hidden)
    },
  })
  // Function to hide integration error
  const hideIntegrationErrors = () => setShowError(false)

  if (isPending || componentError || !integrationError || !showError) return null

  return (
    <IntegrationErrorContent integrationError={integrationError} dismiss={hideIntegrationErrors} />
  )
}

export default IntegrationErrorHandler
