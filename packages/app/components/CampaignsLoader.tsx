import React, { Reducer } from 'react'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import Campaigns from '@/app/Campaigns'
import CampaignsHeader from '@/app/CampaignsHeader'
import Error from '@/elements/Error'
import {
  excludeAdSets,
  excludeAudiences, excludeLookalikes,
  getAdSets,
  getAudiences,
  getCampaigns,
  getEdges,
  getLookalikesAudiences,
  getNodeGroups,
} from '@/app/helpers/campaignsHelpers'
import {
  AdSetWithPlatform,
  Campaign,
  DataSourceResponse,
  LookalikeWithPlatform,
  Platform,
  TargetingInterest,
} from '@/app/types/api'
import { getSpendingPeriodIndexes } from '@/app/helpers/resultsHelpers'
import { getDataSourceValue } from '@/app/helpers/appServer'
import { Dictionary } from '@/types/common'
import { Edge, OverviewNodeGroup, OverviewPeriod } from '@/app/types/overview'

enum ReducerActionType {
  'SET_START',
  'SET_END',
  'SET_BOTH'
}

type OverviewPeriodReducerAction =
  | { type: ReducerActionType.SET_START, payload: { start: Date } }
  | { type: ReducerActionType.SET_END, payload: { end: Date } }
  | { type: ReducerActionType.SET_BOTH, payload: { start: Date, end: Date } }

const reducer: Reducer<OverviewPeriod, OverviewPeriodReducerAction> = (state: OverviewPeriod, action) => {
  switch (action.type) {
    case ReducerActionType.SET_START:
      return { ...state, start: action.payload.start }

    case ReducerActionType.SET_END:
      return { ...state, end: action.payload.end }

    case ReducerActionType.SET_BOTH:
      return {
        ...state,
        start: action.payload.start,
        end: action.payload.end,
      }

    default:
      return { ...state }
  }
}

const CampaignsLoader = () => {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [nodeGroups, setNodeGroups] = React.useState<OverviewNodeGroup[]>([])
  const [edges, setEdges] = React.useState<Edge[]>([])
  const [period, setPeriod] = React.useReducer<Reducer<OverviewPeriod, OverviewPeriodReducerAction>>(reducer, {})

  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [shouldShowCampaigns, setShouldShowCampaigns] = React.useState(true)
  const { targetingState } = React.useContext(TargetingContext)
  const { interests = [] } = targetingState

  const { artistId, artist: { preferences } } = React.useContext(ArtistContext)
  const { objective, platform } = preferences.optimization
  const targetedPlatforms: Platform[] = preferences.targeting.platforms

  useAsyncEffect(async (isMounted) => {
    if (! artistId || ! targetingState) {
      return
    }

    const facebookAdSpendName = 'facebook_ad_spend_feed'
    const dataSources: Dictionary<DataSourceResponse> = await getDataSourceValue([facebookAdSpendName], artistId)
    const facebookAdSpendData = dataSources[facebookAdSpendName]
    const facebookAdSpendDailyData = facebookAdSpendData.daily_data
    const spendingPeriodIndexes = getSpendingPeriodIndexes(facebookAdSpendDailyData, 1)
    if (! spendingPeriodIndexes || spendingPeriodIndexes.length === 0) {
      setIsLoading(false)
      return
    }

    const [start, end] = spendingPeriodIndexes[0]
    const latestSpendingPeriod = {
      start: new Date(Object.keys(facebookAdSpendDailyData)[start]),
      end: new Date(Object.keys(facebookAdSpendDailyData)[end]),
    }
    setPeriod({ type: ReducerActionType.SET_BOTH, payload: latestSpendingPeriod })

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

    const filteredAdSets = excludeAdSets(adSets, objective, facebookAdSpendData)

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

    const filteredAudiences = excludeAudiences(audiences, targetedPlatforms, objective)

    let lookalikeAudiences: LookalikeWithPlatform[] = []
    if (audiences.length > 0) {
      const lookalikesAudiencesPromises = audiences.map(async (audience) => {
        return getLookalikesAudiences(artistId, audience.id)
      })

      const res = await Promise.all(lookalikesAudiencesPromises)
      lookalikeAudiences = res.map(({ res }, index) => {
        return res.map((lookalikesAudience) => ({
          ...lookalikesAudience,
          platform: audiences[index].platform,
          retention_days: audiences[index].retention_days,
        }))
      }).flat()
    }

    const filteredLookalikes = excludeLookalikes(lookalikeAudiences, filteredAdSets)

    if (audiences.length === 0 || adSets.length === 0) {
      setShouldShowCampaigns(false)
    }

    const targetingInterests: TargetingInterest[] = interests.filter(({ isActive }) => isActive)
    const nodeGroups = getNodeGroups(filteredAudiences, filteredLookalikes, filteredAdSets, targetingInterests, period)
    const hasActiveBudget = targetingState.status === 1
    const edges = getEdges(nodeGroups, objective, platform, hasActiveBudget)

    setNodeGroups(nodeGroups)
    setEdges(edges)
    setIsLoading(false)
  }, [artistId, targetingState])

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
