import { requestWithCatch } from '@/helpers/api'
import { capitalise } from '@/helpers/utils'
import copy from '@/app/copy/campaignsCopy'
import { Campaign } from '../types/api'

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

export const getAudiences = async (artistId) => {
  const endpoint = `/artists/${artistId}/audiences`
  const payload = null
  const errorTracking = {
    category: 'Campaigns',
    action: 'Get audiences',
  }

  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  return { res, error }
}

export const getLookalikesAudiences = async (artistId, audienceId) => {
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

export const getAdSets = async (artistId, campaignId) => {
  const endpoint = `artists/${artistId}/campaigns/${campaignId}/adsets`
  const payload = null
  const errorTracking = {
    category: 'Campaigns',
    action: 'Get ad sets',
  }

  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  return { res, error }
}

export const excludeAudiences = ({ audiences, adSets, objective, platform }) => {
  const customAudiencesIds = adSets.map((adSet) => adSet.targeting?.custom_audiences?.map((customAudience) => customAudience?.id)).flat() || []
  const uniqueCustomAudiencesIds = ([...new Set(customAudiencesIds)])
  const isInstagram = platform === 'instagram'

  return audiences.filter((audience) => {
    return audience.is_current
      && audience.retention_days !== 7
      && uniqueCustomAudiencesIds.includes(audience.platform_id)
      && (! audience.name.includes('Ig followers') || (objective === 'growth' && isInstagram))
      && (! audience.name.includes('28') || (objective === 'conversations' && isInstagram))
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
      if (group.nodes.length === maxGroupNodesLength) {
        return startValueY + (nodeIndex * spacingY)
      }

      return startValueY + ((maxGroupNodesLength - (group.nodes.length - nodeIndex)) * spacingY)
    }

    return startValueY + (maxGroupNodesLength * spacingY)
  }

  return {
    x: startValueX + (spacingX * groupIndex),
    y: getYPosition(),
  }
}

const makeNodeGroup = ({ groupIndex, node }) => {
  const isAudience = node.type === 'audience'

  return {
    id: groupIndex,
    type: node.type,
    subType: node.subType,
    isActive: true,
    nodes: [node],
    handlers: [
      {
        type: 'target',
        position: 'left',
      },
      {
        type: 'source',
        position: isAudience ? 'bottom' : 'right',
      },
    ],
  }
}

const makeOrAddToGroup = (groupIndex, node, nodeGroups) => {
  if (nodeGroups[groupIndex]) {
    nodeGroups[groupIndex].nodes.push(node)
    return
  }

  const nodeGroup = makeNodeGroup({ groupIndex, node })
  nodeGroups[groupIndex] = nodeGroup

  return nodeGroup
}

const sumMetrics = (adSets) => {
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

const getEngagementRateAndCost = (adSets) => {
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
  const engagementRate = Number((totalEngagements / impressions).toFixed(4))
  const costPerEngagement = Number((spend / totalEngagements).toFixed(4))

  return {
    engagementRate,
    costPerEngagement,
  }
}

const makeCreateAudienceNode = () => {
  return {
    type: 'audience',
    subType: 'create',
    label: 'Create interest targeting audience',
    isActive: false,
  }
}

export const getNodeGroups = (audiences, lookalikesAudiences, adSets, hasTargetingInterests) => {
  const nodeGroups = []

  // Create audiences node group(s)
  audiences.forEach((audience) => {
    const { name, platform, approximate_count: approximateCount, retention_days: retentionDays } = audience
    const identifier = getAudienceGroupIdentifier(name)
    const groupIndex = indexes[identifier]

    const node = {
      type: 'audience',
      subType: 'custom',
      platform,
      label: copy.audiencesLabel({ name, approximateCount, retentionDays, platform }),
      isActive: true,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  // Create lookalikes audiences node group
  const lookalikesAudiencesKeyedByAudienceId = lookalikesAudiences.reduce((result, audience) => {
    result[audience.audience_id] = result[audience.audience_id] || []
    result[audience.audience_id].push(audience)
    return result
  }, {})

  Object.values(lookalikesAudiencesKeyedByAudienceId).forEach((audiences) => {
    const { name, platform } = audiences[0]
    const identifier = getAudienceGroupIdentifier(name)
    const groupIndex = indexes[identifier]

    const { approximateCount, countries } = audiences.reduce((result, { approximate_count, countries_text }) => {
      return {
        approximateCount: result.approximateCount + approximate_count,
        countries: [...result.countries, countries_text],
      }
    }, { approximateCount: 0, countries: [] })

    const node = {
      type: 'audience',
      subType: 'lookalike',
      platform,
      label: copy.lookalikesAudiencesLabel({ name, approximateCount, countries }),
      isActive: true,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  // Create ad sets node groups
  const adSetsKeyedByIdentifier = adSets.reduce((result, adSet) => {
    const { identifier } = adSet
    const [a, b] = identifier.split('_')
    const key = `${a}${capitalise(b)}`

    result[key] = result[key] || []
    result[key].push(adSet)
    return result
  }, {})

  Object.entries(adSetsKeyedByIdentifier).forEach(([identifier, adSets]) => {
    const groupIndex = indexes[identifier]
    const { engagementRate, costPerEngagement } = getEngagementRateAndCost(adSets)

    const node = {
      type: 'campaign',
      label: identifier,
      engagementRate,
      costPerEngagement,
      campaignId: adSets[0].campaignId,
      isActive: true,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  if (! hasTargetingInterests && nodeGroups.length > 0) {
    nodeGroups[0].nodes.unshift(makeCreateAudienceNode())
  }

  // Add x and y position to each node
  return nodeGroups.map((group) => ({
    ...group,
    nodes: group.nodes.map((node, index) => ({
      ...node,
      position: getPosition(index, group, nodeGroups),
    })),
  }))
}

const getTarget = (objective, platform) => {
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

const makeEdgesBetweenNodes = (nodeGroups) => {
  return nodeGroups.map((nodeGroup) => nodeGroup.nodes.map((node, index) => {
    const isLast = index === nodeGroup.nodes.length - 1
    const isLol = index === nodeGroup.nodes.length - 2
    if (isLast || ! node.isActive) {
      return
    }

    return {
      type: 'node',
      source: `${nodeGroup.id}-${index}`,
      target: isLol ? nodeGroup.id : `${nodeGroup.id}-${index + 1}`,
      isActive: true,
    }
  })).flat().filter((edge) => edge)
}

export const getEdges = (nodeGroups, objective, platform) => {
  const { lookalikesOrInterest, enticeEngage, engaged1Y, remindTraffic } = indexes

  const edgesBetweenNodes = makeEdgesBetweenNodes(nodeGroups)

  const edges = [
    // edges between nodes
    ...edgesBetweenNodes,

    // edges between node groups
    // lookalikes -> entice engage -> Fb/Ig engaged 1y
    {
      type: 'group',
      source: lookalikesOrInterest,
      target: enticeEngage,
      isActive: true,
    },
    {
      type: 'group',
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
      type: 'group',
      source: engaged1Y,
      target: remindTraffic,
      isActive: true,
    },
    {
      type: 'group',
      source: remindTraffic,
      target: getTarget(objective, platform),
      isActive: true,
    },
  ]

  return edges
}
