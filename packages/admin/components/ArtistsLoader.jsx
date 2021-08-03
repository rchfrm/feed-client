// import useSWR, { useSWRPages } from 'swr'
import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import ArtistsFilters from '@/admin/ArtistsFilters'
import ListSearch from '@/admin/elements/ListSearch'
import EntityList from '@/admin/EntityList'

import useGetPaginated from '@/admin/hooks/useGetPaginated'

import { InterfaceContext } from '@/contexts/InterfaceContext'

const ArtistsLoader = ({ artistId }) => {
  const isSingleArtist = !!artistId
  const propsToDisplay = [
    'created_at',
    'currency',
    'country_code',
    'daily_budget',
    'last_ad_spend_date',
  ]
  // Define fields
  const extraFields = ['name', 'users', 'status', 'integrations', 'organization', 'preferences']
  const fields = [...propsToDisplay, ...extraFields]
  // Make request
  const serverFunction = isSingleArtist ? 'getArtist' : 'getAllArtists'
  const requestProps = {
    limit: 100,
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

  // FILTER
  // Filtered List
  const [filteredArtists, setFilteredArtists] = React.useState(artists)
  // Search state
  const [searchedArtists, setSearchedArtists] = React.useState(filteredArtists)

  // GET DATA ARRAY BASED ON PAGE TYPE
  const artistsArray = isSingleArtist ? artists : searchedArtists

  return (
    <section className="content">
      {error && <div>Failed to fetch artists</div>}
      <Error error={error} />
      {!finishedLoading ? <p>Loading...</p> : <p>Finished loading all artists</p>}
      {!isSingleArtist && (
        <>
          <p>Total loaded: {artists.length}</p>
          <p>Total filtered & searched: {searchedArtists.length}</p>
          {/* FILTERS */}
          <h4>
            <strong>Filters</strong>
          </h4>
          <ArtistsFilters
            setFilteredArtists={setFilteredArtists}
            artists={artists}
          />
          {/* SEARCH */}
          {!!artists.length && (
            <ListSearch
              className="pt-2"
              fullList={filteredArtists}
              updateList={setSearchedArtists}
            />
          )}
        </>
      )}
      {artistsArray && (
        <EntityList
          entities={artistsArray}
          propsToDisplay={propsToDisplay}
          isSingleEntity={isSingleArtist}
        />
      )}
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
