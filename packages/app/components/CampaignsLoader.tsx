import React from 'react'
import useAsyncEffect from 'use-async-effect'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import Campaigns from '@/app/Campaigns'
import CampaignsHeader from '@/app/CampaignsHeader'
import Error from '@/elements/Error'
import {
  excludeAudiences,
  getAdSets,
  getAudiences,
  getCampaigns,
  getEdges,
  getLookalikesAudiences,
  getNodeGroups,
} from '@/app/helpers/campaignsHelpers'
import { AdSetWithPlatform, Campaign, LookalikeWithPlatform } from '@/app/types/api'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const CampaignsLoader = () => {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [nodeGroups, setNodeGroups] = React.useState([])
  const [edges, setEdges] = React.useState([])
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [shouldShowCampaigns, setShouldShowCampaigns] = React.useState(true)

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

    setCampaigns(campaigns)

    let adSets: AdSetWithPlatform[] = []
    if (campaigns.length > 0) {
      const adSetsPromises = campaigns.map(async (campaign) => {
        return getAdSets(artistId, campaign.id)
      })

      const res = await Promise.all(adSetsPromises)
      adSets = res.map(({ res }, index) => {
        return res.map((adSet) => ({ ...adSet, platform: campaigns[index].platform }))
      }).flat()
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

    const filteredAudiences = excludeAudiences(audiences, adSets, objective, platform)

    let lookalikesAudiences: LookalikeWithPlatform[] = []
    if (audiences.length > 0) {
      const lookalikesAudiencesPromises = audiences.map(async (audience) => {
        return getLookalikesAudiences(artistId, audience.id)
      })

      const res = await Promise.all(lookalikesAudiencesPromises)
      lookalikesAudiences = res.map(({ res }, index) => {
        return res.map((lookalikesAudience) => ({
          ...lookalikesAudience,
          platform: audiences[index].platform,
          retention_days: audiences[index].retention_days,
        }))
      }).flat()
    }

    if (audiences.length === 0 || adSets.length === 0) {
      setShouldShowCampaigns(false)
    }

    const nodeGroups = getNodeGroups(filteredAudiences, lookalikesAudiences, adSets)
    const edges = getEdges(objective, platform)

    setNodeGroups(nodeGroups)
    setEdges(edges)
    setIsLoading(false)
  }, [artistId])

  return (
    <div onDragOver={(e) => e.preventDefault()}>
      <CampaignsHeader
        campaigns={campaigns}
      />
      <Error error={error} />
      {shouldShowCampaigns && (
        <Campaigns
          nodeGroups={nodeGroups}
          setNodeGroups={setNodeGroups}
          edges={edges}
          setEdges={setEdges}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default CampaignsLoader
