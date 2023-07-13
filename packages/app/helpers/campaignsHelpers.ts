import { requestWithCatch } from '@/helpers/api'
import { capitalise } from '@/helpers/utils'
import copy from '@/app/copy/campaignsCopy'
import { AdSet, Audience, Campaign, Lookalike, LookalikeWithPlatform, Platform, RetentionPeriods } from '@/app/types/api'
import {
  Edge,
  OverviewNode,
  OverviewNodeGroup,
  OverviewNodeGroupHandleType,
  OverviewNodeSubType,
  OverviewNodeType,
} from '@/app/types/overview'
import { Dictionary } from '@/types/common'

const indexes = {
  lookalikesOrInterest: '0',
  enticeEngage: '1',
  engaged1Y: '2',
  remindTraffic: '3',
  engaged28D: '4',
  enticeTraffic: '5',
  igFollowers: '6',
  enticeLanding: '7',
  websiteVisitors: '8',
  remindEngage: '9',
  remindLanding: '11',
  remindConversions: '13',
  offPlatform: '15',
}

const getAudienceGroupIdentifier = (name) => {
  switch (true) {
    case (name.includes('Interest') || name.includes('Lookalike')):
      return 'lookalikesOrInterest'
    case name.includes('1y'):
      return 'engaged1Y'
    case name.includes('28d'):
      return 'engaged28D'
    case name.includes('followers'):
      return 'igFollowers'
    case name.includes('visitors'):
      return 'websiteVisitors'
    default:
      break
  }
}

export const getAudiences = async (artistId: string): Promise<{ res: Audience[], error: any }> => {
  const endpoint = `/artists/${artistId}/audiences`
  const payload = null
  const errorTracking = {
    category: 'Campaigns',
    action: 'Get audiences',
  }

  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  return { res, error }
}

export const getLookalikesAudiences = async (artistId: string, audienceId: string): Promise<{ res: Lookalike[], error: any }> => {
  const endpoint = `/artists/${artistId}/audiences/${audienceId}/lookalikes`
  const payload = null
  const errorTracking = {
    category: 'Campaigns',
    action: 'Get lookalikes audiences',
  }

  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  return { res, error }
}

export const getCampaigns = async (artistId: string): Promise<{ res: Campaign[], error: any }> => {
  const endpoint = `/artists/${artistId}/campaigns`
  const payload = null
  const errorTracking = {
    category: 'Campaigns',
    action: 'Get campaigns',
  }

  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  return { res, error }
}

export const getAdSets = async (artistId: string, campaignId: string): Promise<{ res: AdSet[], error: any }> => {
  const endpoint = `artists/${artistId}/campaigns/${campaignId}/adsets`
  const payload = null
  const errorTracking = {
    category: 'Campaigns',
    action: 'Get ad sets',
  }

  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  return { res, error }
}

export const excludeAudiences = (
  audiences: Audience[],
  platformTargeting: Platform[],
  objective: string,
): Audience[] => {
  const isTargetingFacebookOnly = platformTargeting.length === 1 && platformTargeting[0] === Platform.FACEBOOK
  const isTargetingInstagramOnly = platformTargeting.length === 1 && platformTargeting[0] === Platform.INSTAGRAM

  return audiences.filter((audience) => {
    if (! audience.is_current) {
      return false
    }

    if (audience.retention_days === RetentionPeriods.WEEK) {
      return false
    }

    if (audience.platform === Platform.FACEBOOK && isTargetingInstagramOnly) {
      return false
    }

    if (audience.platform === Platform.INSTAGRAM && isTargetingFacebookOnly) {
      return false
    }

    if (objective !== 'growth' && audience.name.includes('Ig followers')) {
      return false
    }

    if (objective !== 'conversations' && audience.name.includes('28')) {
      return false
    }

    return true
  })
}

export const excludeLookalikes = (
  lookalikes: LookalikeWithPlatform[],
  adSets: AdSet[],
): LookalikeWithPlatform[] => {
  const enticeAdSets = adSets.filter((adSet) => adSet.identifier.startsWith('entice'))
  return lookalikes.filter((lookalike) => {
    const adSet = enticeAdSets.find((adSet) => {
      const audienceIds = adSet.targeting.custom_audiences.map((a) => a.id)
      return audienceIds.includes(lookalike.platform_id)
    })
    return Boolean(adSet)
  })
}

const getPosition = (nodeIndex, group, nodeGroups) => {
  const { type, id } = group
  const isAudience = type === 'audience'
  const startValueY = isAudience ? 10 : 30
  const startValueX = isAudience ? startValueY : 80
  const spacingX = 280
  const spacingY = 80

  const groupNodesLengths = nodeGroups.filter((group) => group).map((group) => group.nodes.length)
  const maxGroupNodesLength = Math.max(...groupNodesLengths)
  const nodeGroupsByType = nodeGroups.filter((group) => group?.type === type)
  const groupIndex = nodeGroupsByType.findIndex((group) => group.id === id)

  const getYPosition = () => {
    if (isAudience) {
      return startValueY + ((maxGroupNodesLength - (nodeIndex + 1)) * spacingY)
    }

    return startValueY + (maxGroupNodesLength * spacingY)
  }

  return {
    x: startValueX + (spacingX * groupIndex),
    y: getYPosition(),
  }
}

const makeNodeGroup = (groupIndex: string, node: OverviewNode): OverviewNodeGroup => {
  const isAudience = node.type === OverviewNodeType.AUDIENCE

  return {
    id: groupIndex,
    type: node.type,
    subType: node.subType,
    isActive: true,
    nodes: [node],
    handlers: [
      {
        type: OverviewNodeGroupHandleType.TARGET,
        position: 'left',
      },
      {
        type: OverviewNodeGroupHandleType.SOURCE,
        position: isAudience ? 'bottom' : 'right',
      },
    ],
  }
}

const makeOrAddToGroup = (groupIndex: string, node: OverviewNode, nodeGroups: OverviewNodeGroup[]) => {
  if (nodeGroups[groupIndex]) {
    const index = Number(groupIndex)
    const nodeGroup = nodeGroups[index]
    nodeGroups[groupIndex].nodes.push(node)
    return
  }

  const nodeGroup = makeNodeGroup(groupIndex, node)
  nodeGroups[groupIndex] = nodeGroup

  return nodeGroup
}

const sumMetrics = (adSets: AdSet[]) => {
  const totals = {
    spend: 0,
    impressions: 0,
    clicks: 0,
    likes: 0,
    saves: 0,
    shares: 0,
    comments: 0,
  }

  adSets.forEach(({ metrics }) => {
    if (! metrics) {
      return
    }

    Object.keys(metrics).forEach((date) => {
      const values = metrics[date]
      totals.spend += Number(values.spend || 0)
      totals.impressions += Number(values.impressions || 0)
      totals.clicks += Number(values.clicks || 0)
      totals.likes += Number(values.actions?.post_reaction || 0)
      totals.saves += Number(values.actions?.onsite_conversion?.post_save || 0)
      totals.shares += Number(values.actions?.posts || 0)
      totals.comments += Number(values.actions?.comment || 0)
    })
  })

  return totals
}

const getEngagementRateAndCost = (adSets: AdSet[]) => {
  const {
    spend,
    impressions,
    clicks,
    likes,
    saves,
    shares,
    comments,
  } = sumMetrics(adSets) || {}

  const totalEngagements = clicks + likes + shares + comments + saves
  const engagementRate = Number(((totalEngagements / impressions) * 100).toFixed(2))
  const costPerEngagement = Number((spend / totalEngagements).toFixed(3))

  return {
    engagementRate,
    costPerEngagement,
  }
}

export const getNodeGroups = (audiences: Audience[], lookalikesAudiences: LookalikeWithPlatform[], adSets: AdSet[]) => {
  const nodeGroups: OverviewNodeGroup[] = []

  // Create audiences node group(s)
  audiences.forEach((audience) => {
    const { name, platform, approximate_count: approximateCount, retention_days: retentionDays } = audience
    const identifier = getAudienceGroupIdentifier(name)
    const groupIndex = indexes[identifier]

    const node = {
      type: OverviewNodeType.AUDIENCE,
      subType: OverviewNodeSubType.CUSTOM,
      platform,
      label: copy.audiencesLabel({ name, approximateCount, retentionDays, platform }),
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  // Create lookalikes audiences node group
  const lookalikesAudiencesKeyedByAudienceId: Dictionary<LookalikeWithPlatform[]> = lookalikesAudiences.reduce((result: Dictionary<LookalikeWithPlatform[]>, lookalike: LookalikeWithPlatform) => {
    const audienceId = lookalike.audience_id
    if (! result[audienceId]) {
      result[audienceId] = []
    }
    result[audienceId].push(lookalike)
    return result
  }, {})

  Object.values(lookalikesAudiencesKeyedByAudienceId).forEach((lookalikes) => {
    const { name, platform } = lookalikes[0]
    const identifier = getAudienceGroupIdentifier(name)
    const groupIndex = indexes[identifier]

    const { approximateCount, countries } = lookalikes.reduce((result, { approximate_count, countries_text }) => {
      return {
        approximateCount: result.approximateCount + approximate_count,
        countries: [...result.countries, countries_text],
      }
    }, { approximateCount: 0, countries: [] })

    const node = {
      type: OverviewNodeType.AUDIENCE,
      subType: OverviewNodeSubType.LOOKALIKE,
      platform,
      label: copy.lookalikesAudiencesLabel({ name, approximateCount, countries }),
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  // Create ad sets node groups
  const adSetsKeyedByIdentifier: Dictionary<AdSet[]> = adSets.reduce((result, adSet) => {
    const { identifier } = adSet
    const [a, b] = identifier.split('_')
    const key = `${a}${capitalise(b)}`

    if (! result[key]) {
      result[key] = []
    }
    result[key].push(adSet)
    return result
  }, {})

  Object.entries(adSetsKeyedByIdentifier).forEach(([identifier, adSets]) => {
    const groupIndex = indexes[identifier]
    const { engagementRate, costPerEngagement } = getEngagementRateAndCost(adSets)

    const node: OverviewNode = {
      type: OverviewNodeType.CAMPAIGN,
      label: identifier,
      engagementRate,
      costPerEngagement,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  // Add x and y position to each node
  return nodeGroups.map((group) => ({
    ...group,
    nodes: group.nodes.map((node, index) => ({
      ...node,
      position: getPosition(index, group, nodeGroups),
    })),
  }))
}

const getTarget = (objective, platform): string => {
  if (platform === 'instagram') {
    if (objective === 'growth') {
      return indexes.igFollowers
    }

    if (objective === 'conversations') {
      return indexes.engaged28D
    }
  }

  if (objective === 'traffic') {
    return indexes.websiteVisitors
  }

  return ''
}

export const getEdges = (objective, platform) => {
  const { lookalikesOrInterest, enticeEngage, engaged1Y, remindTraffic } = indexes

  const edges: Edge[] = [
    // lookalikes -> entice engage -> Fb/Ig engaged 1y
    {
      source: lookalikesOrInterest,
      target: enticeEngage,
      isActive: true,
    },
    {
      source: enticeEngage,
      target: engaged1Y,
      isActive: true,
    },
    // lookalikes -> entice traffic -> Ig followers || Ig engaged 28d || Website visitors 180d
    // {
    //   source: lookalikesOrInterest,
    //   target: enticeTraffic,
    //   isActive: true,
    // },
    // {
    //   source: enticeTraffic,
    //   target: getTarget(objective, platform),
    //   isActive: true,
    // },
    // Fb/Ig engaged 1y -> remind traffic -> Ig followers || Ig engaged 28d || Website visitors 180d
    {
      source: engaged1Y,
      target: remindTraffic,
      isActive: true,
    },
    {
      source: remindTraffic,
      target: getTarget(objective, platform),
      isActive: true,
    },
  ]

  return edges
}
