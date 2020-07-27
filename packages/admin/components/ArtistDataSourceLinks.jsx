import PropTypes from 'prop-types'
import React from 'react'

import useSWR from 'swr'

import Error from '@/elements/Error'

import { getEndpoint } from '@/helpers/sharedServer'

const fetcher = async (fetchUrl, fetch) => {
  if (!fetch) return
  // Get all artist tournaments
  return getEndpoint(fetchUrl)
}

const ArtistDataSourceLinks = ({ fetchUrl, fetch }) => {
  const { data: links, error } = useSWR(
    [fetchUrl, fetch],
    fetcher,
  )

  console.log('links', links)

  if (error) return <Error error={error} />

  return (
    <div>
      links
    </div>
  )
}

ArtistDataSourceLinks.propTypes = {
  fetchUrl: PropTypes.string.isRequired,
  fetch: PropTypes.bool,
}

ArtistDataSourceLinks.defaultProps = {
  fetch: false,
}


export default ArtistDataSourceLinks
