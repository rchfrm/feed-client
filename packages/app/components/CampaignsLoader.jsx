import React from 'react'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import Campaigns from '@/app/Campaigns'
import CampaignsHeader from '@/app/CampaignsHeader'
import Error from '@/elements/Error'
import { getAudiences, getLookalikesAudiences, getCampaigns, getAdSets, getNodeGroups, getEdges } from '@/app/helpers/campaignsHelpers'

const CampaignsLoader = () => {
  const [nodeGroups, setNodeGroups] = React.useState([])
  const [edges, setEdges] = React.useState([])
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (! artistId) {
      return
    }

    const { res: audiences, error: audiencesError } = await getAudiences(artistId)
    if (! isMounted()) {
      setIsLoading(false)
      return
    }

    if (audiencesError) {
      setError(audiencesError)
      setIsLoading(false)
      return
    }

    let lookalikesAudiences = []
    if (audiences.length > 0) {
      const adSetsPromises = audiences.map(async (audience) => {
        return getLookalikesAudiences(artistId, audience.id)
      })

      const res = await Promise.all(adSetsPromises)
      const flattenedLookalikesAudiences = res.map(({ res }, index) => {
        return res.map((lookalikesAudience) => ({ ...lookalikesAudience, platform: audiences[index].platform }))
      }).flat()
      lookalikesAudiences = flattenedLookalikesAudiences
    }

    const { res: campaigns, error: campaignsError } = await getCampaigns(artistId)
    if (! isMounted()) {
      setIsLoading(false)
      return
    }

    if (campaignsError) {
      setError(campaignsError)
      setIsLoading(false)
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

    setNodeGroups(nodeGroups)
    setEdges(edges)
    setIsLoading(false)
  }, [artistId])

  return (
    <div onDragOver={(e) => e.preventDefault()}>
      <CampaignsHeader />
      <Error error={error} />
      <Campaigns
        nodeGroups={nodeGroups}
        setNodeGroups={setNodeGroups}
        edges={edges}
        setEdges={setEdges}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CampaignsLoader
