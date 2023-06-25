import React from 'react'
import useAsyncEffect from 'use-async-effect'
import Campaigns from '@/app/Campaigns'
import CampaignsHeader from '@/app/CampaignsHeader'
import Error from '@/elements/Error'
import { getAudiences, getLookalikesAudiences, getCampaigns, getAdSets, getNodeGroups, getEdges } from '@/app/helpers/campaignsHelpers'
import { ArtistContext } from '@/app/contexts/ArtistContext'

const CampaignsLoader = () => {
  const [initialNodeGroups, setInitialNodeGroups] = React.useState([])
  const [initialEdges, setInitialEdges] = React.useState([])
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (! artistId) {
      return
    }

    const { res: audiences, error: audiencesError } = await getAudiences(artistId)
    if (! isMounted()) {
      return
    }

    if (audiencesError) {
      setError(audiencesError)
      return
    }

    let lookalikesAudiences = []
    if (audiences.length > 0) {
      const adSetsPromises = audiences.map(async (audience) => {
        return getLookalikesAudiences(artistId, audience.id)
      })

      const res = await Promise.all(adSetsPromises)
      const flattenedLookalikesAudiences = res.map(({ res }) => res).flat()
      lookalikesAudiences = flattenedLookalikesAudiences
    }

    const { res: campaigns, error: campaignsError } = await getCampaigns(artistId)
    if (! isMounted()) {
      return
    }

    if (campaignsError) {
      setError(campaignsError)
      return
    }

    let adSets = []
    if (campaigns.length > 0) {
      const adSetsPromises = campaigns.map(async (campaign) => {
        return getAdSets(artistId, campaign.id)
      })

      const res = await Promise.all(adSetsPromises)
      const flattenedAdSets = res.map(({ res }, index) => {
        return res.map((adSet) => ({ ...adSet, platform: campaigns[index].platform }))
      }).flat()
      adSets = flattenedAdSets
    }

    const nodeGroups = getNodeGroups(audiences, lookalikesAudiences, adSets)
    const edges = getEdges(nodeGroups)
    setInitialNodeGroups(nodeGroups)
    setInitialEdges(edges)
  }, [artistId])

  if (initialNodeGroups.length === 0 || initialEdges.length === 0) {
    return
  }

  return (
    <div onDragOver={(e) => e.preventDefault()}>
      <CampaignsHeader />
      <Error error={error} />
      <Campaigns
        initialNodeGroups={initialNodeGroups}
        initialEdges={initialEdges}
      />
    </div>
  )
}

export default CampaignsLoader
