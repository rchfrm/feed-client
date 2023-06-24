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

export const makeNodes = (audiences, adSets) => {
  const nodes = []
  let audienceIndex = 0
  let audienceX = 10
  let campaignIndex = 1
  let campaignX = 90

  for (let index = 0; index < audiences.length; index += 1) {
    const { name, platform, approximate_count } = audiences[index]

    const node = {
      id: audienceIndex.toString(),
      type: 'audience',
      position: { x: audienceX, y: 10 },
      data: {
        platform,
        label: `${name} - ${approximate_count}`,
      },
      isActive: false,
      handlers: [
        ...(index !== 0 ? [{
          type: 'target',
          position: 'left',
        }] : []),
        ...(index !== audiences.length - 1 ? [{
          type: 'source',
          position: 'bottom',
        }] : []),
      ],
    }

    nodes.splice(audienceIndex, 0, node)
    audienceIndex += 2
    audienceX += 310
  }

  for (let index = 0; index < adSets.length; index += 1) {
    const { name, optimization_goal } = adSets[index]

    const node = {
      id: campaignIndex.toString(),
      type: 'campaign',
      position: { x: campaignX, y: 135 },
      data: {
        label: `${name} - ${optimization_goal}`,
      },
      isActive: false,
      handlers: [
        {
          type: 'target',
          position: 'left',
        },
        {
          type: 'source',
          position: 'right',
        },
      ],
    }

    nodes.splice(campaignIndex, 0, node)
    campaignIndex += 2
    campaignX += 310
  }

  return nodes
}

export const makeEdges = (nodes) => {
  const edges = []

  nodes.forEach((node, index) => {
    if (index === nodes.length - 1) {
      return
    }
    edges.push({ source: node.id, target: (index + 1).toString(), isActive: false })
  })

  return edges
}
