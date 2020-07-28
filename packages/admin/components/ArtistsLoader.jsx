// import useSWR, { useSWRPages } from 'swr'
import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import ArtistsList from '@/admin/ArtistsList'

import useGetPaginated from '@/admin/hooks/useGetPaginated'

import { InterfaceContext } from '@/contexts/InterfaceContext'

const ArtistsLoader = ({ artistId }) => {
  const isSingleArtist = !!artistId
  const propsToDisplay = [
    'name',
    'created_at',
    'currency',
    'country_code',
    'daily_budget',
  ]
  // Define fields
  const extraFields = ['users', 'status']
  const fields = [...propsToDisplay, ...extraFields]
  // Make request
  const serverFunction = isSingleArtist ? 'getArtist' : 'getAllArtists'
  const requestProps = {
    limit: 1000,
    fields: fields.join(','),
  }
  const serverFunctionArgs = isSingleArtist ? [artistId, requestProps] : [requestProps]
  const { data: artists, error, finishedLoading } = useGetPaginated(serverFunction, serverFunctionArgs)

  // Turn off global loading when finished
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (finishedLoading) {
      toggleGlobalLoading(false)
    }
  }, [finishedLoading, toggleGlobalLoading])

  return (
    <section className="content">
      {error && (
        <div className="mb-4">
          <p>Failed to fetch artists</p>
          <Error error={error} />
        </div>
      )}
      {!finishedLoading && <p>Loading...</p>}
      {!isSingleArtist && <p>Total: {artists.length}</p>}
      {artists && <ArtistsList artists={artists} propsToDisplay={propsToDisplay} />}
    </section>
  )
}

ArtistsLoader.propTypes = {
  artistId: PropTypes.string,
}

ArtistsLoader.defaultProps = {
  artistId: '',
}

export default ArtistsLoader
