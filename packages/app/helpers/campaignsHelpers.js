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

const makeNode = ({ type, subType, platform, label }) => {
  const isCampaign = type === 'campaign'

  return {
    type,
    subType,
    platform,
    label,
    handlers: [
      {
        type: 'target',
        position: 'left',
      },
      {
        type: 'source',
        position: isCampaign ? 'right' : 'bottom',
      },
    ],
  }
}

const getPosition = (index) => {
  switch (index) {
    case 0:
      return 10
    case 1:
      return 90
    case 2:
      return 320
    case 3:
      return 400
    case 4:
      return 630
    case 5:
      return 710
    case 6:
      return 940
    case 7:
      return 1030
    case 8:
      return 1270
    default:
      break
  }
}

const makeNodeGroup = ({ index, node }) => {
  return {
    id: index.toString(),
    type: node.type,
    subType: node.subType,
    position: { x: getPosition(index), y: node.type === 'audience' ? 10 : 225 },
    isActive: true,
    nodes: [node],
  }
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

const makeOrAddToGroup = (index, node, nodeGroups) => {
  if (nodeGroups[index]) {
    nodeGroups[index].nodes.push(node)
    return
  }

  const nodeGroup = makeNodeGroup({ index, node })
  nodeGroups[index] = nodeGroup
  return nodeGroup
}

export const getNodeGroups = (audiences, lookalikesAudiences, adSets) => {
  const nodeGroups = []

  audiences.forEach((audience) => {
    const { name, platform, approximate_count } = audience
    const groupIndex = getAudienceGroupIndex(name)

    const node = makeNode({
      type: 'audience',
      subType: 'custom',
      platform,
      label: `${name} - ${approximate_count}`,
    })

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  lookalikesAudiences.forEach((audience) => {
    const { name, approximate_count } = audience
    const groupIndex = getAudienceGroupIndex(name)

    const node = makeNode({
      type: 'audience',
      subType: 'lookalike',
      platform: '',
      label: `${name} - ${approximate_count}`,
    })

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  adSets.forEach((adSet) => {
    const { name, identifier, platform, optimization_goal } = adSet
    const groupIndex = getCampaignGroupIndex(identifier)

    const node = makeNode({
      type: 'campaign',
      platform,
      label: `${name} - ${optimization_goal}`,
    })

    makeOrAddToGroup(groupIndex, node, nodeGroups)
  })

  return nodeGroups
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
