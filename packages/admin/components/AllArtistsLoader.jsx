// import useSWR, { useSWRPages } from 'swr'
import React from 'react'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import ArtistsFilters from '@/admin/ArtistsFilters'
import ListSearch from '@/admin/elements/ListSearch'
import ArtistsList from '@/admin/ArtistsList'

export default function Home() {
  const propsToDisplay = [
    'name',
    'created_at',
    'currency',
    'country_code',
    'daily_budget',
  ]
  // Define fields
  const extraFields = ['users', 'status', 'integrations']
  const fields = [...propsToDisplay, ...extraFields]
  // Make request
  const { data: artists, error, finishedLoading } = useGetPaginated('getAllArtists', {
    limit: 1000,
    fields: fields.join(','),
  })

  // FILTER
  // Filtered List
  const [filteredArtists, setFilteredArtists] = React.useState(artists)
  // Search state
  const [searchedArtists, setSearchedArtists] = React.useState(filteredArtists)

  return (
    <section className="content">
      {error && <div>Failed to fetch artists</div>}
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
      {/* ALL ARTISTS (Filtered then searched) */}
      {searchedArtists && <ArtistsList artists={searchedArtists} propsToDisplay={propsToDisplay} />}
    </section>
  )
}
