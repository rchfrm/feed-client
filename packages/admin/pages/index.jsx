import React from 'react'
import PageIntro from '@/admin/elements/PageIntro'
import AllArtistsLoader from '@/admin/AllArtistsLoader'

export default function Home() {
  return (
    <div>
      <PageIntro />
      <AllArtistsLoader />
    </div>
  )
}
