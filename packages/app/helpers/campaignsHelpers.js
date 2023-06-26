import { requestWithCatch } from '@/helpers/api'

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

const getAudienceGroupIndex = (name) => {
  switch (true) {
    case name.includes('Lookalike'):
      return 0
    case name.includes('1y'):
      return 2
    case name.includes('28d'):
      return 4
    case name.includes('7d'):
      return 6
    case name.includes('followers'):
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
    case identifier.includes('remind_engage'):
      return 7
    default:
      break
  }
}

const getPosition = (group, nodeGroups) => {
  const { type, id } = group
  const isAudience = type === 'audience'
  const spacing = 310
  const startValue = isAudience ? 10 : 90
  const nodeGroupsByType = nodeGroups.filter((group) => group?.type === type)
  const index = nodeGroupsByType.findIndex((group) => group.id === id)

  return {
    x: startValue + (spacing * index),
    y: isAudience ? 10 : 225,
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

  lookalikesAudiences.forEach((audience) => {
    const { name, approximate_count } = audience
    const groupIndex = getAudienceGroupIndex(name)

    const node = {
      type: 'audience',
      subType: 'lookalike',
      platform: '',
      label: `${name} - ${approximate_count}`,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  audiences.forEach((audience) => {
    const { name, platform, approximate_count } = audience
    const groupIndex = getAudienceGroupIndex(name)

    const node = {
      type: 'audience',
      subType: 'custom',
      platform,
      label: `${name} - ${approximate_count}`,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  adSets.forEach((adSet) => {
    const { name, identifier, platform, optimization_goal } = adSet
    const groupIndex = getCampaignGroupIndex(identifier)

    const node = {
      type: 'campaign',
      platform,
      label: `${name} - ${optimization_goal}`,
    }

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  return nodeGroups.map((group) => ({ ...group, position: getPosition(group, nodeGroups) }))
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
