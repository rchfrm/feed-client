import React from 'react'
import Error from '@/elements/Error'
import ArtistsFilters from '@/admin/ArtistsFilters'
import ListSearch from '@/admin/elements/ListSearch'
import EntityList from '@/admin/EntityList'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import { InterfaceContext } from '@/contexts/InterfaceContext'

const ArtistsLoader = () => {
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
  const serverFunction = 'getAllArtists'
  const requestProps = {
    limit: 100,
    fields: fields.join(','),
  }
  const serverFunctionArgs = [requestProps]
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

  if (!artists) {
    return (
      <section className="content">
        <p>Loading...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="content">
        <p>Failed to fetch artists.</p>
        <Error error={error} />
      </section>
    )
  }

  return (
    <section className="content">
      {!finishedLoading ? <p>Loading...</p> : <p>Finished loading all artists</p>}
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
      {/* ARTISTS */}
      <EntityList
        entities={searchedArtists}
        propsToDisplay={propsToDisplay}
      />
    </section>
  )
}

export default ArtistsLoader
