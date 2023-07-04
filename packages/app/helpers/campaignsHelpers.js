import { requestWithCatch } from '@/helpers/api'
import copy from '@/app/copy/campaignsCopy'

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

export const getCampaigns = async (artistId) => {
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

const getAudienceGroupIndex = (name) => {
  switch (true) {
    case (name.includes('Interest') || name.includes('Lookalike')):
      return 0
    case name.includes('1y'):
      return 2
    case name.includes('28d'):
      return 4
    case name.includes('followers'):
      return 6
    case name.includes('visitors'):
      return 8
    default:
      break
  }
}

const getCampaignGroupIndex = (identifier) => {
  switch (true) {
    case identifier.includes('entice_engage'):
      return 1
    case identifier.includes('entice_traffic'):
      return 3
    case identifier.includes('remind_traffic'):
      return 5
    case identifier.includes('entice_landing'):
      return 7
    case identifier.includes('remind_engage'):
      return 9
    case identifier.includes('remind_landing'):
      return 11
    case identifier.includes('remind_conversions'):
      return 13
    case identifier.includes('off_platform'):
      return 15
    default:
      break
  }
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

const makeNodeGroup = ({ groupIndex, node }) => {
  const isAudience = node.type === 'audience'

  return {
    id: groupIndex.toString(),
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

export const getNodeGroups = (audiences, lookalikesAudiences, adSets) => {
  const nodeGroups = []

  // Create audiences node group(s)
  audiences.forEach((audience) => {
    const { name, platform, approximate_count: approximateCount, retention_days: retentionDays } = audience
    const groupIndex = getAudienceGroupIndex(name)

    const node = {
      type: 'audience',
      subType: 'custom',
      platform,
      label: copy.audiencesLabel({ name, approximateCount, retentionDays, platform }),
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
    const groupIndex = getAudienceGroupIndex(name)

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
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  // Create ad sets node groups
  const adSetsKeyedByIdentifier = adSets.reduce((result, adSet) => {
    const { identifier } = adSet
    const [a, b] = identifier.split('_')
    const key = `${a}_${b}`

    result[key] = result[key] || []
    result[key].push(adSet)
    return result
  }, {})

  Object.keys(adSetsKeyedByIdentifier).forEach((identifier) => {
    const groupIndex = getCampaignGroupIndex(identifier)

    const node = {
      type: 'campaign',
      label: identifier,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  // Add x and y position to each node
  return nodeGroups.map((group) => ({ ...group, nodes: group.nodes.map((node, index) => ({ ...node, position: getPosition(index, group, nodeGroups) })) }))
}

const getTarget = (objective, platform) => {
  if (platform === 'instagram') {
    if (objective === 'growth') {
      return '6'
    }

    if (objective === 'conversations') {
      return '4'
    }
  }

  if (objective === 'traffic') {
    return '8'
  }

  return ''
}

export const getEdges = (nodeGroups, objective, platform) => {
  const edges = [
    // lookalikes -> entice engage -> Fb/Ig engaged 1y
    { source: '0', target: '1', isActive: true },
    { source: '1', target: '2', isActive: true },

    // lookalikes -> entice traffic -> Ig followers || Ig engaged 28d || Website visitors 180d
    { source: '0', target: '3', isActive: true },
    { source: '3', target: getTarget(objective, platform), isActive: true },

    // Fb/Ig engaged 1y -> remind traffic -> Ig followers || Ig engaged 28d || Website visitors 180d
    { source: '2', target: '5', isActive: true },
    { source: '5', target: getTarget(objective, platform), isActive: true },
  ]

  return edges
}
