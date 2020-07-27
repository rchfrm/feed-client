// import useSWR, { useSWRPages } from 'swr'
import React from 'react'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import AllArtistsFilters from '@/admin/AllArtistsFilters'
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
  const extraFields = ['users', 'status']
  const fields = [...propsToDisplay, ...extraFields]
  // Make request
  const { items: artists, error, finishedLoading } = useGetPaginated('getAllArtists', {
    limit: 1000,
    fields: fields.join(','),
  })

  // FILTERS
  const statusFilters = [
    'all',
    'active',
    'inactive',
    'trial',
    'budget_set',
    'no_budget',
  ]
  const [activeFilter, setActiveFilter] = React.useState(statusFilters[0])
  // Update list based on active filter
  const filteredArtists = React.useMemo(() => {
    if (!artists) return []
    // Status filter
    if (activeFilter === 'active' || activeFilter === 'inactive' || activeFilter === 'trial') {
      return artists.filter(({ status }) => status === activeFilter)
    }
    // Budget filter
    if (activeFilter === 'budget_set') {
      return artists.filter(({ daily_budget }) => daily_budget > 0)
    }
    if (activeFilter === 'no_budget') {
      return artists.filter(({ daily_budget }) => daily_budget === 0)
    }
    return artists
  }, [artists, activeFilter])

  return (
    <section className="content">
      {error && <div>Failed to fetch artists</div>}
      {!finishedLoading ? <p>Loading...</p> : <p>Finished loading all artists</p>}
      <p>Total: {artists.length}</p>
      {/* FILTERS */}
      <h4>Filters</h4>
      <AllArtistsFilters
        statusFilters={statusFilters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <p>Total filtered: {filteredArtists.length}</p>
      {/* ALL ARTISTS */}
      {filteredArtists && <ArtistsList artists={filteredArtists} propsToDisplay={propsToDisplay} />}
    </section>
  )
}
