import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import BasePage from '@/app/BasePage'
import CampaignsLoader from '@/app/CampaignsLoader'
import testPageReady from '@/hoc/testPageReady'

const headerConfig = {
  text: 'campaigns',
}

const Page = () => {
  const { artistId } = React.useContext(ArtistContext)

  return (
    <BasePage headerConfig={headerConfig}>
      <CampaignsLoader key={artistId} />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
