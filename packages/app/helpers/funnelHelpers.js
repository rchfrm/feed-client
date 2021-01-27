import { fetchTournaments } from '@/helpers/tournamentHelpers'

import * as ROUTES from '@/app/constants/routes'

import copy from '@/app/copy/funnelCopy'
import brandColors from '@/constants/brandColors'

// CONSTANTS
// ----------------

export const funnelOptions = [
  {
    title: 'Posts',
    id: 'posts',
  },
  {
    title: 'Stories',
    id: 'stories',
  },
]

export const getFunnelPropFromId = (funnelId, prop) => {
  const funnel = funnelOptions.find(({ id }) => id === funnelId)
  const propValue = funnel[prop]
  return propValue
}

export const audienceTypes = [
  {
    id: 'entice_engage',
    slug: 'cold',
    title: copy.cold.title,
    description: copy.cold.description,
    tooltip: copy.cold.tooltip,
    color: brandColors.blue,
  },
  {
    id: 'entice_traffic',
    slug: 'cool',
    title: copy.cool.title,
    description: copy.cool.description,
    tooltip: copy.cool.tooltip,
    color: brandColors.yellow,
  },
  {
    id: 'remind_traffic',
    slug: 'warm',
    title: copy.warm.title,
    description: copy.warm.description,
    tooltip: copy.warm.tooltip,
    color: brandColors.red,
  },
]

export const getAudiencePropFromSlug = (audienceSlug, prop) => {
  const audience = audienceTypes.find(({ slug }) => slug === audienceSlug)
  const propValue = audience[prop]
  return propValue
}

// Get tournament link
export const getAudienceTournamentLink = ({ audienceSlug, funnelSlug }) => {
  return {
    pathname: ROUTES.TOURNAMENTS,
    query: {
      audience: audienceSlug,
      adType: funnelSlug,
    },
  }
}

// FETCHING DATA
// --------------
export const watchFunction = (newProps, oldProps) => {
  const {
    artistId: newArtistId,
    activeFunnelId: newActiveFunnelId,
  } = newProps
  const {
    artistId: oldArtistId,
    activeFunnelId: oldActiveFunnelId,
  } = oldProps
  if (newArtistId !== oldArtistId) return true
  if (newActiveFunnelId !== oldActiveFunnelId) return true
  return false
}

export const fetchAudiences = async ({ artistId, activeFunnelId }) => {
  if (!artistId) return []
  const fetchAudienceTournaments = audienceTypes.map((audience) => {
    // GET ALL ARTIST TOURNAMENTS
    return fetchTournaments({
      artistId,
      audienceId: audience.id,
      adTypeId: activeFunnelId,
      limit: 1,
    })
  })
  return Promise.all(fetchAudienceTournaments)
}

// FORMAT DATA
// ------------------
export const formatData = (data) => {
  return audienceTypes.reduce((formattedData, audience, index) => {
    const { ads = null } = data[index][0] || {}
    formattedData[audience.slug] = {
      ...audience,
      ads,
    }
    return formattedData
  }, {})
}
