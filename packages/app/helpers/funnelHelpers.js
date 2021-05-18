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
    slug: 'growA',
    title: copy.growA.title,
    description: copy.growA.description,
    tooltip: copy.growA.tooltip,
    color: brandColors.blue,
    isEligibleForStories: false,
  },
  {
    id: 'entice_traffic',
    slug: 'growB',
    title: copy.growB.title,
    description: copy.growB.description,
    tooltip: copy.growB.tooltip,
    color: brandColors.yellow,
    isEligibleForStories: true,
  },
  {
    id: 'remind_traffic',
    slug: 'nurture',
    title: copy.nurture.title,
    description: copy.nurture.description,
    tooltip: copy.nurture.tooltip,
    color: brandColors.red,
    isEligibleForStories: true,
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

// WATCH FUNCTION to trigger updates
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

// FORMAT DATA
export const formatData = (data) => {
  return audienceTypes.reduce((formattedData, audience, index) => {
    const { status, ads = null } = data[index][0] || {}
    formattedData[audience.slug] = {
      ...audience,
      status,
      ads,
    }
    return formattedData
  }, {})
}

// FETCH DATA
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
  const data = await Promise.all(fetchAudienceTournaments)
  return formatData(data)
}
