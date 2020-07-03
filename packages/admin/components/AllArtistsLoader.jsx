// import useSWR, { useSWRPages } from 'swr'
import React from 'react'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import ArtistsList from '@/admin/ArtistsList'

export default function Home() {
  const { items: artists, error, finishedLoading } = useGetPaginated('getAllArtists')

  return (
    <section className="content">
      {error && <div>Failed to fetch artists</div>}
      {!finishedLoading && <p>Loading...</p>}
      <p>Total: {artists.length}</p>
      {artists && <ArtistsList artists={artists} />}
    </section>
  )
}
