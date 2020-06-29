import React from 'react'
import BasePage from '@/admin/BasePage'
import AllArtistsLoader from '@/admin/AllArtistsLoader'

export default function Home() {
  return (
    <BasePage
      headerConfig="artists"
      staticPage
      authPage
    >
      <AllArtistsLoader />
    </BasePage>
  )
}
