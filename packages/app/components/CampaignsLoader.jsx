import React from 'react'
import useAsyncEffect from 'use-async-effect'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import Campaigns from '@/app/Campaigns'
import CampaignsHeader from '@/app/CampaignsHeader'
import Error from '@/elements/Error'
import { getAudiences, getLookalikesAudiences, excludeAudiences, getCampaigns, getAdSets, getNodeGroups, getEdges } from '@/app/helpers/campaignsHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const CampaignsLoader = () => {
  const [nodeGroups, setNodeGroups] = React.useState([])
  const [edges, setEdges] = React.useState([])
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (! artistId) {
      return
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

    const filteredAudiences = excludeAudiences({ audiences, adSets, objective, platform })

    let lookalikesAudiencesGroups = []
    if (filteredAudiences.length > 0) {
      const adSetsPromises = filteredAudiences.map(async (audience) => {
        return getLookalikesAudiences(artistId, audience.id)
      })

      const res = await Promise.all(adSetsPromises)
      lookalikesAudiencesGroups = res.map(({ res }, index) => ({ res, platform: filteredAudiences[index].platform }))
    }

    const nodeGroups = getNodeGroups(filteredAudiences, lookalikesAudiencesGroups, adSets)
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
