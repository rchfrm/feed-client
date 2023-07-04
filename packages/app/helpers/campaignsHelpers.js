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
  const customAudiencesIds = adSets.map((adSet) => adSet.targeting.custom_audiences.map((customAudience) => customAudience.id)).flat()
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
    case name.includes('Lookalike'):
      return 0
    case name.includes('1y'):
      return 2
    case name.includes('28d'):
      return 4
    case name.includes('followers'):
      return 6
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
    case identifier.includes('entice_landing_page'):
      return 5
    case identifier.includes('remind_traffic'):
      return 7
    case identifier.includes('remind_engage'):
      return 9
    case identifier.includes('remind_landing_page'):
      return 11
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

export const getEdges = (nodeGroups) => {
  const edges = []

  nodeGroups.forEach((group, index) => {
    if (index === nodeGroups.length - 1) {
      return
    }
    edges.push({ source: group.id, target: (index + 1).toString(), isActive: true })
  })

  return edges
}
