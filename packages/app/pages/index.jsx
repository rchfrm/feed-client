import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import BasePage from '@/app/BasePage'
import CampaignsLoader from '@/app/CampaignsLoader'
import testPageReady from '@/hoc/testPageReady'
import { Platform } from '@/app/types/api'
import * as ROUTES from '@/app/constants/routes'
import { useRouter } from 'next/router'

const headerConfig = {
  text: 'campaigns',
}

const Page = () => {
  const { artist, artistId, hasSetUpProfile } = React.useContext(ArtistContext)
  const { platform } = artist.preferences.optimization
  const hasSpotifyOrInstagramObjective = platform === Platform.SPOTIFY || platform === Platform.INSTAGRAM
  const router = useRouter()

  React.useEffect(() => {
    if (! hasSpotifyOrInstagramObjective || ! hasSetUpProfile) {
      router.push(ROUTES.POSTS)
    }
  }, [hasSetUpProfile, hasSpotifyOrInstagramObjective, router])

  if (! hasSpotifyOrInstagramObjective || ! hasSetUpProfile) {
    return null
  }

  return (
    <BasePage headerConfig={headerConfig}>
      <CampaignsLoader key={artistId} />
    </BasePage>
  )
}

export default testPageReady('app')(Page)
