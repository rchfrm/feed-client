import { requestWithCatch } from '@/helpers/api'
import { capitalise } from '@/helpers/utils'
import copy from '@/app/copy/campaignsCopy'
import {
  AdSet,
  Audience,
  Campaign,
  DataSourceResponse,
  Lookalike,
  LookalikeWithPlatform,
  Platform,
  RetentionPeriods,
  TargetingInterest,
} from '@/app/types/api'
import {
  Edge,
  NODE_INDEXES,
  NodeIndexes,
  OverviewNode,
  OverviewNodeAudience,
  OverviewNodeBase,
  OverviewNodeEngageAdSet,
  OverviewNodeGroup,
  OverviewNodeGroupHandler,
  OverviewNodeGroupHandleType,
  OverviewNodeSubType,
  OverviewNodeTrafficAdSet,
  OverviewNodeType,
} from '@/app/types/overview'
import { Dictionary } from '@/types/common'

const getAudienceGroupIndex = (name: string): NodeIndexes | undefined => {
  switch (true) {
    case (name.includes('Interest')):
      return NODE_INDEXES.interests
    case (name.includes('Lookalike')):
      return NODE_INDEXES.lookalikes
    case name.includes('1y'):
      return NODE_INDEXES.engaged1Y
    case name.includes('28d'):
      return NODE_INDEXES.engaged28D
    case name.includes('followers'):
      return NODE_INDEXES.igFollowers
    case name.includes('visitors'):
      return NODE_INDEXES.websiteVisitors
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

export const excludeAdSets = (
  adSets: AdSet[],
  objective: string,
  adSpend?: DataSourceResponse,
): AdSet[] => {
  return adSets.filter((adSet) => {
    if (! adSpend) {
      return false
    }

    if (objective !== 'conversations' && adSet.name.startsWith('remind_engage')) {
      return false
    }

    const [, adSetOptimization] = adSet.identifier.split('_')
    if (objective === 'conversations' && adSetOptimization === 'traffic') {
      return false
    }

    return true
  })
}

const nodeGroupsKeyedByType = (nodeGroups: OverviewNodeGroup[]): {
  maxNodesInGroup: number,
  keyedNodeGroups: Record<OverviewNodeType, OverviewNodeGroup[]>,
} => {
  let maxNodesInGroup = nodeGroups[0].nodes.length
  const keyedNodeGroups = nodeGroups.reduce((acc: Record<OverviewNodeType, OverviewNodeGroup[]>, cur: OverviewNodeGroup): Record<OverviewNodeType, OverviewNodeGroup[]> => {
    const groupType = cur.type
    const nodeCount = cur.nodes.length

    if (nodeCount > maxNodesInGroup) {
      maxNodesInGroup = nodeCount
    }

    acc[groupType].push(cur)

    return acc
  }, { [OverviewNodeType.AUDIENCE]: [], [OverviewNodeType.CAMPAIGN]: [] })
  return {
    maxNodesInGroup,
    keyedNodeGroups,
  }
}

const getNodePositions = (
  nodeGroups: OverviewNodeGroup[],
): OverviewNodeGroup[] => {
  const { maxNodesInGroup, keyedNodeGroups } = nodeGroupsKeyedByType(nodeGroups)

  const audienceNodeHeight = 60
  const campaignNodeHeight = 85
  const audienceNodeWidth = 208
  const gapX = audienceNodeWidth / 2
  const gapY = 20
  const spacingX = gapX + audienceNodeWidth
  const spacingY = gapY + campaignNodeHeight

  const hasActiveInterestTargeting = hasInterestsNode(nodeGroups)

  const getPosition = (nodeIndex: number, group: OverviewNodeGroup): { x: number, y: number } => {
    const node = group.nodes[nodeIndex]
    const { type, id } = group
    const isAudience = type === OverviewNodeType.AUDIENCE

    const isInterestsNode = node.subType === OverviewNodeSubType.INTERESTS || node.label.startsWith('interests') || node.subType === OverviewNodeSubType.CREATE
    const interestsRowHeight = ! isInterestsNode
      ? hasActiveInterestTargeting
        ? audienceNodeHeight + campaignNodeHeight + (3 * gapY)
        : audienceNodeHeight + (2 * gapY)
      : 0

    const startValueY = isAudience
      ? 10 + interestsRowHeight
      : 10 + interestsRowHeight + audienceNodeHeight + gapY
    const startValueX = isAudience ? 10 : 10 + (audienceNodeWidth / 2) + gapY

    const nodeGroupsOfSameType = keyedNodeGroups[type]
    const groupIndex = nodeGroupsOfSameType.findIndex((group) => group.id === id)
    const groupContainsInterest = group.nodes.find(({ subType, label }) => {
      return (
        subType === OverviewNodeSubType.CREATE
        || subType === OverviewNodeSubType.INTERESTS
        || label.startsWith('interests')
      )
    })

    return {
      x: startValueX + (spacingX * groupIndex),
      y: startValueY + (spacingY * (groupContainsInterest && ! isInterestsNode ? nodeIndex - 1 : nodeIndex)),
    }
  }

  return nodeGroups.map((group) => ({
    ...group,
    nodes: group.nodes.map((node, index) => ({
      ...node,
      position: getPosition(index, group),
    })),
  }))
}

const makeNodeGroup = (groupIndex: string, node: OverviewNodeBase): OverviewNodeGroup => {
  const isAudience = node.type === OverviewNodeType.AUDIENCE

  const handlers: OverviewNodeGroupHandler[] = [
    {
      type: OverviewNodeGroupHandleType.SOURCE,
      position: isAudience ? 'bottom' : 'right',
    },
  ]

  if (groupIndex !== '0') {
    handlers.push({
      type: OverviewNodeGroupHandleType.TARGET,
      position: 'left',
    })
  }

  return {
    id: groupIndex,
    type: node.type,
    subType: node.subType,
    isActive: true,
    nodes: [node],
    handlers,
  }
}

const makeOrAddToGroup = (groupIndex: string, node: OverviewNodeBase, nodeGroups: OverviewNodeGroup[]) => {
  if (nodeGroups[groupIndex]) {
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

const getEngagementRateAndCost = (adSets: AdSet[]): Pick<OverviewNodeEngageAdSet, 'engagementRate' | 'costPerEngagement'> => {
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

const getClickRateAndCost = (adSets: AdSet[]): Pick<OverviewNodeTrafficAdSet, 'cpc' | 'ctr'> => {
  const {
    clicks,
    spend,
    impressions,
  } = sumMetrics(adSets) || {}
  const ctr = Number(((clicks / impressions) * 100).toFixed(2))
  const cpc = Number((spend / clicks).toFixed(3))
  return {
    ctr,
    cpc,
  }
}

const makeCreateAudienceNode = (): OverviewNodeAudience => {
  return {
    type: OverviewNodeType.AUDIENCE,
    subType: OverviewNodeSubType.CREATE,
    index: NODE_INDEXES.interests,
    platforms: [Platform.INSTAGRAM, Platform.FACEBOOK],
    label: 'Create interest targeting audience',
    isActive: false,
  }
}

const makeInterestAudienceNode = (interests: TargetingInterest[]): OverviewNodeAudience => {
  const interestsCount = interests.length - 2
  const interestsSortedByLength = interests.slice().sort((a, b) => a.name.length - b.name.length)
  const first3Interests = interestsSortedByLength.slice(0, 2).map((interest) => interest.name)
  return {
    type: OverviewNodeType.AUDIENCE,
    subType: OverviewNodeSubType.INTERESTS,
    index: NODE_INDEXES.interests,
    platforms: [Platform.FACEBOOK, Platform.INSTAGRAM],
    label: `People interested in ${first3Interests.join(', ')} and **${interestsCount}** more`,
    isActive: interests.length > 0,
  }
}

export const getNodeGroups = (
  audiences: Audience[],
  lookalikesAudiences: LookalikeWithPlatform[],
  adSets: AdSet[],
  targetingInterests: TargetingInterest[],
): OverviewNodeGroup[] => {
  const nodeGroups: OverviewNodeGroup[] = []

  // Create audiences node group(s)
  audiences.forEach((audience) => {
    const { name, platform, approximate_count: approximateCount, retention_days: retentionDays } = audience
    const nodeIndex = getAudienceGroupIndex(name)
    const groupIndex = nodeIndex?.split('-')[0]

    const node: OverviewNodeAudience = {
      type: OverviewNodeType.AUDIENCE,
      subType: OverviewNodeSubType.CUSTOM,
      index: nodeIndex,
      platforms: [platform],
      label: copy.audiencesLabel({ name, approximateCount, retentionDays, platform }),
      isActive: true,
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
    const nodeIndex = getAudienceGroupIndex(name)
    const groupIndex = nodeIndex?.split('-')[0]

    const { approximateCount, countries } = lookalikes.reduce((result, { approximate_count, countries_text }) => {
      return {
        approximateCount: result.approximateCount + approximate_count,
        countries: [...result.countries, countries_text],
      }
    }, { approximateCount: 0, countries: [] })

    const node: OverviewNodeAudience = {
      type: OverviewNodeType.AUDIENCE,
      subType: OverviewNodeSubType.LOOKALIKE,
      index: nodeIndex,
      platforms: [platform],
      label: copy.lookalikesAudiencesLabel({ name, approximateCount, countries }),
      isActive: true,
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
    const nodeIndex = NODE_INDEXES[identifier]
    const groupIndex = nodeIndex?.split('-')[0]
    const nodeBase: OverviewNodeBase = {
      type: OverviewNodeType.CAMPAIGN,
      index: nodeIndex,
      label: identifier,
      isActive: true,
    }
    let node: OverviewNode
    const isEngagementCampaign = identifier.endsWith('Engage')
    if (isEngagementCampaign) {
      const { engagementRate, costPerEngagement } = getEngagementRateAndCost(adSets)
      node = Object.assign(nodeBase, {
        engagementRate,
        costPerEngagement,
      })
    } else {
      const { cpc, ctr } = getClickRateAndCost(adSets)
      node = Object.assign(nodeBase, {
        ctr,
        cpc,
      })
    }


    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  const hasTargetingInterests = targetingInterests.length > 0
  if (nodeGroups.length > 0) {
    if (! hasTargetingInterests) {
      nodeGroups[0].nodes.unshift(makeCreateAudienceNode())
    } else {
      nodeGroups[0].nodes.unshift(makeInterestAudienceNode(targetingInterests))
    }
  }

  // Sort campaign nodes so that "lower value interactions" appear first
  nodeGroups.forEach((nodeGroup) => {
    if (nodeGroup.type === OverviewNodeType.AUDIENCE || nodeGroup.nodes.length < 2) return

    nodeGroup.nodes.sort((a, b) => {
      if (a.label.includes('Engage') && b.label.includes('Traffic')) {
        return -1
      }
      if (a.label.includes('Traffic') && b.label.includes('Engage')) {
        return 1
      }
      if (a.label.startsWith('interests') && b.label.startsWith('entice')) {
        return -1
      }
      if (a.label.startsWith('entice') && b.label.startsWith('interests')) {
        return 1
      }
      return 0
    })
  })

  // Add x and y position to each node
  return getNodePositions(nodeGroups)
}

const getTrafficTarget = (objective, platform): string => {
  if (platform === Platform.INSTAGRAM && objective === 'growth') {
    return NODE_INDEXES.igFollowers
  }

  return NODE_INDEXES.websiteVisitors
}

const hasInterestsNode = (nodeGroups: OverviewNodeGroup[]): boolean => {
  const enticeNodeGroup: OverviewNodeGroup = nodeGroups[NODE_INDEXES.lookalikesOrInterest]
  return Boolean(enticeNodeGroup.nodes.find((node) => node.subType === OverviewNodeSubType.INTERESTS))
}

export const getEdges = (nodeGroups: OverviewNodeGroup[], objective: string, platform: Platform) => {
  const {
    lookalikes,
    interests,
    engaged1Y,
    engaged28D,
    interestsEngage,
    enticeEngage,
    enticeTraffic,
    remindEngage,
    remindTraffic,
  } = NODE_INDEXES

  // enticeEngage is in all objectives
  const edges: Edge[] = [
    {
      type: 'group',
      source: lookalikes,
      target: enticeEngage,
      isActive: true,
    },
    {
      type: 'group',
      source: enticeEngage,
      target: engaged1Y,
      isActive: true,
    },
  ]

  if (hasInterestsNode(nodeGroups)) {
    const interestsEngageEdges: Edge[] = [
      {
        type: 'group',
        source: interests,
        target: interestsEngage,
        isActive: true,
      },
      {
        type: 'group',
        source: interestsEngage,
        target: engaged1Y,
        isActive: true,
      },
    ]
    edges.push(...interestsEngageEdges)
  }

  if (objective === 'conversations' && platform === Platform.INSTAGRAM) {
    const remindEngageEdges: Edge[] = [
      {
        type: 'group',
        source: engaged1Y,
        target: remindEngage,
        isActive: true,
      },
      {
        type: 'group',
        source: remindEngage,
        target: engaged28D,
        isActive: true,
      },
    ]
    edges.push(...remindEngageEdges)
  }

  if (objective !== 'conversations') {
    const trafficCampaigns: Edge[] = [
      {
        type: 'group',
        source: lookalikes,
        target: enticeTraffic,
        isActive: true,
      },
      {
        type: 'group',
        source: engaged1Y,
        target: remindTraffic,
        isActive: true,
      },
    ]
    edges.push(...trafficCampaigns)

    if (platform === Platform.INSTAGRAM || objective === 'traffic' || objective === 'sales') {
      const trafficTargets: Edge[] = [
        {
          type: 'group',
          source: enticeTraffic,
          target: getTrafficTarget(objective, platform),
          isActive: true,
        },
        {
          type: 'group',
          source: remindTraffic,
          target: getTrafficTarget(objective, platform),
          isActive: true,
        },
      ]
      edges.push(...trafficTargets)
    }
  }

  return edges
}
