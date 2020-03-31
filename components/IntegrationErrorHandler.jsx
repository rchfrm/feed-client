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
  console.log('artistId', artistId)
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
  // Does user own artist?
  const { artists: userArtists } = user
  const { role: artistRole } = userArtists.find(({ id }) => id === artistId)
  const artistOwned = artistRole === 'owner' || artistRole === 'sysadmin'
  if (!artistOwned) return null
  // Run async request for errors
  const { data: integrationError, error, isPending } = useAsync({
    promiseFn: fetchError,
    watch: artistId,
    artist,
    artistId,
  })

  console.log('user', user)

  console.log('integrationError', integrationError)
  console.log('isPending', isPending)

  const hideIntegrationErrors = () => {}

  if (!integrationError || isPending) return null

  return (
    <IntegrationErrorContent integrationError={integrationError} dismiss={hideIntegrationErrors} />
  )
}

export default IntegrationErrorHandler
