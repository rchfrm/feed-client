import React from 'react'
import { useAsync } from 'react-async'

import * as integrationErrorsHelpers from './helpers/integrationErrorsHelpers'
import server from './helpers/server'
import { ArtistContext } from './contexts/Artist'

import IntegrationErrorContent from './IntegrationErrorContent'

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


const IntegrationErrorHandler = () => {
  // Import artist context
  const {
    artist,
    artistId,
  } = React.useContext(ArtistContext)

  const { data: integrationError, error, isPending } = useAsync({
    promiseFn: fetchError,
    watch: artistId,
    artist,
    artistId,
  })

  console.log('integrationError', integrationError)
  console.log('isPending', isPending)

  const hideIntegrationErrors = () => {}

  if (!integrationError || isPending) return null

  return (
    <IntegrationErrorContent integrationError={integrationError} dismiss={hideIntegrationErrors} />
  )
}

export default IntegrationErrorHandler
