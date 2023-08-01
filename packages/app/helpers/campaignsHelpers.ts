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
} from '@/app/types/api'
import {
  Edge,
  OverviewNode,
  OverviewNodeBase, OverviewNodeEngageAdSet,
  OverviewNodeGroup,
  OverviewNodeGroupHandler,
  OverviewNodeGroupHandleType,
  OverviewNodeSubType, OverviewNodeTrafficAdSet,
  OverviewNodeType,
} from '@/app/types/overview'
import { Dictionary } from '@/types/common'

const indexes = {
  lookalikesOrInterest: '0',
  interests: '0-0',
  lookalikes: '0-1',
  enticeEngage: '1-0',
  enticeTraffic: '1-1',
  engaged1Y: '2-0',
  remindTraffic: '3-0',
  engaged28D: '4-0',
  igFollowers: '6-0',
  enticeLanding: '7',
  websiteVisitors: '8',
  remindEngage: '9-0',
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

const getPosition = (
  nodeIndex: number,
  group: OverviewNodeGroup,
  nodeGroups: OverviewNodeGroup[],
): { x: number, y: number } => {
  const { type, id } = group
  const isAudience = type === OverviewNodeType.AUDIENCE

  const audienceGroupNodeLengths = nodeGroups.filter((group) => group.type === OverviewNodeType.AUDIENCE).map((group) => group.nodes.length)
  const audienceMaxGroupNodesLength = Math.max(...audienceGroupNodeLengths)

  const audienceNodeHeight = 60
  const campaignNodeHeight = 85
  const nodeHeight = isAudience ? audienceNodeHeight : campaignNodeHeight
  const audienceNodeWidth = 208
  const gapX = audienceNodeWidth / 2
  const gapY = 20
  const spacingX = gapX + audienceNodeWidth
  const spacingY = gapY + nodeHeight
  const startValueY = isAudience
    ? 10
    : 10 + (spacingY * audienceMaxGroupNodesLength)
  const startValueX = isAudience ? startValueY : 10 + (audienceNodeWidth / 2) + gapY

  const nodeGroupsByType = nodeGroups.filter((group) => group?.type === type)
  const groupIndex = nodeGroupsByType.findIndex((group) => group.id === id)

  const getYPosition = (): number => {
    if (isAudience) {
      // If it's the node group with the most nodes, stack nodes from top to bottom
      if (group.nodes.length === audienceMaxGroupNodesLength) {
        return startValueY + (nodeIndex * spacingY)
      }

      // Else make sure the nodes are pushed down and stacked from top to bottom
      return startValueY + ((audienceMaxGroupNodesLength - (group.nodes.length - nodeIndex)) * spacingY)
    }

    return startValueY + (nodeIndex * spacingY)
  }

  return {
    x: startValueX + (spacingX * groupIndex),
    y: getYPosition(),
  }
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

const makeCreateAudienceNode = () => {
  return {
    type: OverviewNodeType.AUDIENCE,
    subType: OverviewNodeSubType.CREATE,
    label: 'Create interest targeting audience',
    isActive: false,
  }
}

export const getNodeGroups = (
  audiences: Audience[],
  lookalikesAudiences: LookalikeWithPlatform[],
  adSets: AdSet[],
  hasTargetingInterests: boolean,
): OverviewNodeGroup[] => {
  const nodeGroups: OverviewNodeGroup[] = []

  // Create audiences node group(s)
  audiences.forEach((audience) => {
    const { name, platform, approximate_count: approximateCount, retention_days: retentionDays } = audience
    const identifier = getAudienceGroupIdentifier(name)
    const groupIndex = indexes[identifier]?.split('-')[0]

    const node = {
      type: OverviewNodeType.AUDIENCE,
      subType: OverviewNodeSubType.CUSTOM,
      platform,
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
    const identifier = getAudienceGroupIdentifier(name)
    const groupIndex = indexes[identifier]?.split('-')[0]

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
    const groupIndex = indexes[identifier]?.split('-')[0]
    const nodeBase: OverviewNodeBase = {
      type: OverviewNodeType.CAMPAIGN,
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

  if (! hasTargetingInterests && nodeGroups.length > 0) {
    nodeGroups[0].nodes.unshift(makeCreateAudienceNode())
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
      return 0
    })
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

const getTrafficTarget = (objective, platform): string => {
  if (platform === Platform.INSTAGRAM && objective === 'growth') {
    return indexes.igFollowers
  }

  return indexes.websiteVisitors
}

export const getEdges = (nodeGroups, objective, platform) => {
  const {
    lookalikes,
    engaged1Y,
    engaged28D,
    enticeEngage,
    enticeTraffic,
    remindEngage,
    remindTraffic,
  } = indexes

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