import React from 'react'

import { useRouter } from 'next/router'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

import TournamentsContent from '@/app/TournamentsContent'

const headerConfig = {
  text: 'results',
}

const Page = () => {
  const router = useRouter()
  const { audience, adType } = router.query
  console.log('audience', audience)
  console.log('adType', adType)
  return (
    <BasePage
      headerConfig={headerConfig}
      noArtistHeader={headerConfig}
      artistRequired
    >
      <TournamentsContent
        audienceSlug={audience}
        adTypeId={adType}
      />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
