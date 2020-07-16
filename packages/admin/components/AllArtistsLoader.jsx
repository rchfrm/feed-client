// import useSWR, { useSWRPages } from 'swr'
import React from 'react'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import ArtistsList from '@/admin/ArtistsList'

export default function Home() {
  const propsToDisplay = [
    'name',
    'created_at',
    'currency',
    'country_code',
    'daily_budget',
    'status',
  ]
  // Define fields
  const extraFields = ['users']
  const fields = [...propsToDisplay, ...extraFields]
  // Make request
  const { items: artists, error, finishedLoading } = useGetPaginated('getAllArtists', {
    limit: 1000,
    fields: fields.join(','),
  })

  return (
    <section className="content">
      {error && <div>Failed to fetch artists</div>}
      {!finishedLoading && <p>Loading...</p>}
      <p>Total: {artists.length}</p>
      {artists && <ArtistsList artists={artists} propsToDisplay={propsToDisplay} />}
    </section>
  )
}
