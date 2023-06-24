import React from 'react'
import useAsyncEffect from 'use-async-effect'
import Campaigns from '@/app/Campaigns'
import CampaignsHeader from '@/app/CampaignsHeader'
import Error from '@/elements/Error'
import { getAudiences, getCampaigns, getAdSets, makeNodes, makeEdges } from '@/app/helpers/campaignsHelpers'
import { ArtistContext } from '@/app/contexts/ArtistContext'

const CampaignsLoader = () => {
  const [initialNodes, setInitialNodes] = React.useState([])
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
      const flattenedAdSets = res.map(({ res }) => res).flat()
      adSets = flattenedAdSets
    }

    const nodes = makeNodes(audiences, adSets).slice(0, -3)
    const edges = makeEdges(nodes)
    setInitialNodes(nodes)
    setInitialEdges(edges)
  }, [artistId])

  if (initialNodes.length === 0 || initialEdges.length === 0) {
    return
  }

  return (
    <div onDragOver={(e) => e.preventDefault()}>
      <CampaignsHeader />
      <Error error={error} />
      <Campaigns
        initialNodes={initialNodes}
        initialEdges={initialEdges}
      />
    </div>
  )
}

export default CampaignsLoader
