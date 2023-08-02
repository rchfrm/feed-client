import { requestWithCatch } from '@/helpers/api'
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
  Edge, IDENTIFIERS,
  NODE_INDEXES,
  NodeIndexes,
  OverviewNode,
  OverviewNodeAudience,
  OverviewNodeBase, OverviewNodeCampaign,
  OverviewNodeEngageAdSet,
  OverviewNodeGroup,
  OverviewNodeGroupHandler,
  OverviewNodeGroupHandleType,
  OverviewNodeSubType,
  OverviewNodeTrafficAdSet,
  OverviewNodeType, OverviewPeriod,
} from '@/app/types/overview'
import { Dictionary } from 'ts-essentials'
import { getCurrencySymbol } from '@/helpers/utils'


const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
yesterday.setHours(0, 0, 0, 0)

const getAudienceGroupIndex = (name: string): NodeIndexes | undefined => {
  switch (true) {
    case (name.includes('Interest')):
      return NODE_INDEXES.INTERESTS
    case (name.includes('Lookalike')):
      return NODE_INDEXES.LOOKALIKES
    case name.includes('1y'):
      return NODE_INDEXES.ENGAGED_1Y
    case name.includes('28d'):
      return NODE_INDEXES.ENGAGED_28D
    case name.includes('followers'):
      return NODE_INDEXES.INSTAGRAM_FOLLOWERS
    case name.includes('visitors'):
      return NODE_INDEXES.WEBSITE_VISITORS
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
  adAccountId?: string,
): Audience[] => {
  const isTargetingFacebookOnly = platformTargeting.length === 1 && platformTargeting[0] === Platform.FACEBOOK
  const isTargetingInstagramOnly = platformTargeting.length === 1 && platformTargeting[0] === Platform.INSTAGRAM

  return audiences.filter((audience) => {
    if (adAccountId && audience.platform_account_id !== adAccountId) {
      return false
    }

    if (! audience.is_current) {
      return false
    }

    if (audience.is_deleted) {
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
  period: OverviewPeriod,
  adSpend?: DataSourceResponse,
): AdSet[] => {
  return adSets.filter((adSet) => {
    const { name, identifier, metrics } = adSet
    if (! adSpend) {
      return false
    }

    if (objective !== 'conversations' && name.startsWith('remind_engage')) {
      return false
    }

    const [, adSetOptimization] = identifier.split('_')
    if (objective === 'conversations' && adSetOptimization === 'traffic') {
      return false
    }

    const metricDates = Object.keys(metrics)
    if (metricDates.length === 0) {
      return false
    }

    const metricDatesInPeriod = metricDates.filter((dateString) => {
      const date = new Date(dateString)
      return date >= period.start && date <= period.end
    })
    return metricDatesInPeriod.length !== 0
  })
}

const nodeGroupsKeyedByType = (nodeGroups: OverviewNodeGroup[]): Record<OverviewNodeType, OverviewNodeGroup[]> => {
  return nodeGroups.reduce((acc: Record<OverviewNodeType, OverviewNodeGroup[]>, cur: OverviewNodeGroup): Record<OverviewNodeType, OverviewNodeGroup[]> => {
    const groupType = cur.type
    acc[groupType].push(cur)
    return acc
  }, { [OverviewNodeType.AUDIENCE]: [], [OverviewNodeType.CAMPAIGN]: [] })
}

const hasInterestsNode = (nodeGroups: OverviewNodeGroup[]): boolean => {
  const interestsNodeIndex = NODE_INDEXES.INTERESTS.split('-')[0]
  const interestsNodeGroup: OverviewNodeGroup = nodeGroups[interestsNodeIndex]
  const hasInterestsAudience = Boolean(interestsNodeGroup.nodes.find((node) => node.subType === OverviewNodeSubType.INTERESTS))
  const interestsEngageNodeIndex = NODE_INDEXES.INTERESTS_ENGAGE.split('-')[0]
  const interestsEngageNodeGroup: OverviewNodeGroup = nodeGroups[interestsEngageNodeIndex]
  const hasInterestsEngageAdSet = Boolean(interestsEngageNodeGroup.nodes.find((node) => node.index === NODE_INDEXES.INTERESTS_ENGAGE))
  return hasInterestsAudience && hasInterestsEngageAdSet
}

const getNodePositions = (
  nodeGroups: OverviewNodeGroup[],
): OverviewNodeGroup[] => {
  const keyedNodeGroups = nodeGroupsKeyedByType(nodeGroups)

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

    const isInterestsNode = node.subType === OverviewNodeSubType.INTERESTS || node.label.startsWith('INTERESTS') || node.subType === OverviewNodeSubType.CREATE
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
        || label.startsWith('INTERESTS')
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

const sumMetrics = (adSets: AdSet[], period: OverviewPeriod) => {
  const totals = {
    spend: 0,
    impressions: 0,
    clicks: 0,
    likes: 0,
    saves: 0,
    shares: 0,
    comments: 0,
  }

  let lastAdSpendDate: Date

  adSets.forEach(({ metrics }) => {
    if (! metrics) {
      return
    }

    Object.keys(metrics).forEach((dateString) => {
      const date = new Date(dateString)
      const values = metrics[dateString]
      const spend = Number(values.spend || 0)
      if ((! lastAdSpendDate || date > lastAdSpendDate) && spend) {
        lastAdSpendDate = date
      }

      if (date < period.start || date > period.end) return

      totals.spend += spend
      totals.impressions += Number(values.impressions || 0)
      totals.clicks += Number(values.clicks || 0)
      totals.likes += Number(values.actions?.post_reaction || 0)
      totals.saves += Number(values.actions?.onsite_conversion?.post_save || 0)
      totals.shares += Number(values.actions?.posts || 0)
      totals.comments += Number(values.actions?.comment || 0)
    })
  })

  return { totals, lastAdSpendDate }
}

const getEngagementRateAndCost = (adSets: AdSet[], period: OverviewPeriod): Pick<OverviewNodeEngageAdSet, 'engagementRate' | 'costPerEngagement' | 'lastAdSpendDate'> => {
  const {
    totals: {
      spend,
      impressions,
      clicks,
      likes,
      saves,
      shares,
      comments,
    },
    lastAdSpendDate,
  } = sumMetrics(adSets, period) || {}

  const totalEngagements = clicks + likes + shares + comments + saves
  const engagementRate = Number(((totalEngagements / impressions) * 100).toFixed(2))
  const costPerEngagement = Number((spend / totalEngagements).toFixed(3))

  return {
    engagementRate,
    costPerEngagement,
    lastAdSpendDate,
  }
}

const getClickRateAndCost = (adSets: AdSet[], period: OverviewPeriod): Pick<OverviewNodeTrafficAdSet, 'cpc' | 'ctr' | 'lastAdSpendDate'> => {
  const {
    totals: {
      clicks,
      spend,
      impressions,
    },
    lastAdSpendDate,
  } = sumMetrics(adSets, period) || {}
  const ctr = Number(((clicks / impressions) * 100).toFixed(2))
  const cpc = Number((spend / clicks).toFixed(3))
  return {
    ctr,
    cpc,
    lastAdSpendDate,
  }
}

const makeCreateAudienceNode = (): OverviewNodeAudience => {
  return {
    type: OverviewNodeType.AUDIENCE,
    subType: OverviewNodeSubType.CREATE,
    index: NODE_INDEXES.INTERESTS,
    platforms: [Platform.INSTAGRAM, Platform.FACEBOOK],
    label: 'Create interest targeting audience',
    isActive: false,
  }
}

const makeInterestAudienceNode = (interests: TargetingInterest[]): OverviewNodeAudience => {
  const interestsCount = interests.length - 2
  const interestsSortedByLength = interests.slice().sort((a, b) => a.name.length - b.name.length)
  const first2Interests = interestsSortedByLength.slice(0, 2).map((interest) => interest.name)
  const label = `People interested in ${interestsCount > 0 ? first2Interests.join(', ') : `**${first2Interests.join(' and ')}**`} ${interestsCount > 0 ? `and **${interestsCount}** more` : ''}`
  return {
    type: OverviewNodeType.AUDIENCE,
    subType: OverviewNodeSubType.INTERESTS,
    index: NODE_INDEXES.INTERESTS,
    platforms: [Platform.FACEBOOK, Platform.INSTAGRAM],
    label,
    isActive: interests.length > 0,
  }
}

export const getCampaignType = (identifier: keyof typeof NODE_INDEXES): string => {
  identifier.toUpperCase()
  if (identifier.endsWith('ENGAGE')) return 'engagement'
  if (identifier.endsWith('TRAFFIC')) return 'traffic'
  if (identifier.endsWith('LANDING_PAGE')) return 'landing_page_view'
  if (identifier.endsWith('CONVERSIONS')) return 'conversion'
}

export const getNodeGroups = (
  audiences: Audience[],
  lookalikesAudiences: LookalikeWithPlatform[],
  adSets: AdSet[],
  hasActiveBudget: boolean,
  hasInterestTargetingAccess: boolean,
  targetingInterests: TargetingInterest[],
  period: OverviewPeriod,
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
    const lookalike = lookalikes[0]
    const { name } = lookalikes[0]
    const platforms = lookalike.platform ? [lookalike.platform] : [Platform.FACEBOOK, Platform.INSTAGRAM]
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
      platforms,
      label: copy.lookalikesAudiencesLabel({ name, approximateCount, countries }),
      isActive: true,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  // Create ad sets node groups
  const adSetsKeyedByIdentifier: Dictionary<AdSet[]> = adSets.reduce((result, adSet) => {
    const { identifier } = adSet
    const key = identifier.replace(/(_stories)|(_posts)/, '').toUpperCase()

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
    const campaignType = getCampaignType(identifier as IDENTIFIERS)

    if (campaignType === 'engagement') {
      const { engagementRate, costPerEngagement, lastAdSpendDate } = getEngagementRateAndCost(adSets, period)
      node = Object.assign(nodeBase, {
        engagementRate,
        costPerEngagement,
        lastAdSpendDate,
      })
    }
    if (campaignType === 'traffic') {
      const { cpc, ctr, lastAdSpendDate } = getClickRateAndCost(adSets, period)
      node = Object.assign(nodeBase, {
        ctr,
        cpc,
        lastAdSpendDate,
      })
    }
    if (campaignType === 'landing_page_view') {
      // TODO : Add LPV results
      const { cpc, ctr, lastAdSpendDate } = getClickRateAndCost(adSets, period)
      node = Object.assign(nodeBase, {
        ctr,
        cpc,
        lastAdSpendDate,
      })
    }
    if (campaignType === 'conversion') {
      // TODO : Add conversions results
      const { cpc, ctr, lastAdSpendDate } = getClickRateAndCost(adSets, period)
      node = Object.assign(nodeBase, {
        ctr,
        cpc,
        lastAdSpendDate,
      })
    }

    if (node.lastAdSpendDate < yesterday || ! hasActiveBudget) {
      node.isActive = false
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  const hasTargetingInterests = targetingInterests.length > 0
  if (nodeGroups.length > 0 && hasInterestTargetingAccess) {
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
      if (a.label.includes('ENGAGE') && b.label.includes('TRAFFIC')) {
        return -1
      }
      if (a.label.includes('TRAFFIC') && b.label.includes('ENGAGE')) {
        return 1
      }
      if (a.label.startsWith('INTERESTS') && b.label.startsWith('ENTICE')) {
        return -1
      }
      if (a.label.startsWith('ENTICE') && b.label.startsWith('INTERESTS')) {
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
    return NODE_INDEXES.INSTAGRAM_FOLLOWERS
  }

  return NODE_INDEXES.WEBSITE_VISITORS
}

const isCampaignActive = (nodeGroups: OverviewNodeGroup[], campaignIndex: NodeIndexes): boolean => {
  const groupIndex = Number(campaignIndex.split('-')[0])
  const node = nodeGroups[groupIndex].nodes.find((node) => node.index === campaignIndex) as OverviewNodeCampaign
  return node.lastAdSpendDate > yesterday
}

export const getEdges = (
  nodeGroups: OverviewNodeGroup[],
  objective: string,
  platform: Platform,
  hasActiveBudget: boolean,
) => {
  const {
    LOOKALIKES,
    INTERESTS,
    ENGAGED_1Y,
    ENGAGED_28D,
    INTERESTS_ENGAGE,
    ENTICE_ENGAGE,
    ENTICE_TRAFFIC,
    REMIND_ENGAGE,
    REMIND_TRAFFIC,
  } = NODE_INDEXES

  // enticeEngage is in all objectives
  const edges: Edge[] = [
    {
      type: 'group',
      source: LOOKALIKES,
      target: ENTICE_ENGAGE,
      isActive: hasActiveBudget && isCampaignActive(nodeGroups, ENTICE_ENGAGE),
    },
    {
      type: 'group',
      source: ENTICE_ENGAGE,
      target: ENGAGED_1Y,
      isActive: hasActiveBudget && isCampaignActive(nodeGroups, ENTICE_ENGAGE),
    },
  ]

  if (hasInterestsNode(nodeGroups)) {
    const interestsEngageEdges: Edge[] = [
      {
        type: 'group',
        source: INTERESTS,
        target: INTERESTS_ENGAGE,
        isActive: hasActiveBudget && isCampaignActive(nodeGroups, INTERESTS_ENGAGE),
      },
      {
        type: 'group',
        source: INTERESTS_ENGAGE,
        target: ENGAGED_1Y,
        isActive: hasActiveBudget && isCampaignActive(nodeGroups, INTERESTS_ENGAGE),
      },
    ]
    edges.push(...interestsEngageEdges)
  }

  if (objective === 'conversations' && platform === Platform.INSTAGRAM) {
    const remindEngageEdges: Edge[] = [
      {
        type: 'group',
        source: ENGAGED_1Y,
        target: REMIND_ENGAGE,
        isActive: hasActiveBudget && isCampaignActive(nodeGroups, REMIND_ENGAGE),
      },
      {
        type: 'group',
        source: REMIND_ENGAGE,
        target: ENGAGED_28D,
        isActive: hasActiveBudget && isCampaignActive(nodeGroups, REMIND_ENGAGE),
      },
    ]
    edges.push(...remindEngageEdges)
  }

  if (objective !== 'conversations') {
    const trafficCampaigns: Edge[] = [
      {
        type: 'group',
        source: LOOKALIKES,
        target: ENTICE_TRAFFIC,
        isActive: hasActiveBudget && isCampaignActive(nodeGroups, ENTICE_TRAFFIC),
      },
      {
        type: 'group',
        source: ENGAGED_1Y,
        target: REMIND_TRAFFIC,
        isActive: hasActiveBudget && isCampaignActive(nodeGroups, ENTICE_TRAFFIC),
      },
    ]
    edges.push(...trafficCampaigns)

    if (platform === Platform.INSTAGRAM || objective === 'traffic' || objective === 'sales') {
      const trafficTargets: Edge[] = [
        {
          type: 'group',
          source: ENTICE_TRAFFIC,
          target: getTrafficTarget(objective, platform),
          isActive: hasActiveBudget && isCampaignActive(nodeGroups, ENTICE_TRAFFIC),
        },
        {
          type: 'group',
          source: REMIND_TRAFFIC,
          target: getTrafficTarget(objective, platform),
          isActive: hasActiveBudget && isCampaignActive(nodeGroups, ENTICE_TRAFFIC),
        },
      ]
      edges.push(...trafficTargets)
    }
  }

  return edges
}

export const getLastUpdatedAtDate = (adSets: AdSet[]): Date | undefined => {
  let lastUpdatedAtDate: Date
  adSets.forEach((adSet) => {
    const updatedAt = new Date(adSet.updated_at)
    if (! lastUpdatedAtDate || updatedAt > lastUpdatedAtDate) {
      lastUpdatedAtDate = updatedAt
    }
  })
  return lastUpdatedAtDate
}

export const countActiveAdSets = (adSets: AdSet[]): Map<string, number> => {
  const counts = new Map<string, number>()
  adSets.forEach((adSet) => {
    const identifier = adSet.identifier.replace(/(_stories)|(_posts)/g, '').toUpperCase()
    const campaignType = getCampaignType(identifier as IDENTIFIERS)
    let count = counts.get(campaignType) || 0
    count += 1
    counts.set(campaignType, count)
  })
  return counts
}

export const createActiveAdSetString = (counts: Map<string, number>): string => {
  const countArray = Array.from(counts)
  if (counts.size === 1) {
    const [optimisation, count] = countArray[0]
    return `There are currently **${count} active ${optimisation.replaceAll('_', ' ')} campaigns**`
  }
  const totalCount = countArray.reduce((acc, [, count]): number => acc + count, 0)
  const strings: string[] = Array.from(counts).map(([optimisation, count]) => {
    return `${count} ${optimisation.replaceAll('_', ' ')}`
  })
  return `There are currently **${totalCount} active campaigns** (${strings.slice(0, -1).join(', ')} and ${strings.slice(-1)})`
}

export const createBudgetSummaryString = (
  isCampaignBudget: boolean,
  currency: string,
  budget: number,
  daysRemaining?: number,
): string => {
  const currencySymbol = getCurrencySymbol(currency)
  if (isCampaignBudget) {
    return `**${daysRemaining} days** and **${currencySymbol}${budget}** remaining`
  }
  return ` a total budget of **${currencySymbol}${budget} a day**`
}

