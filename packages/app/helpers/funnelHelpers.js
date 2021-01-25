import { getArtistTournaments } from '@/helpers/sharedServer'
import * as ROUTES from '@/app/constants/routes'

import copy from '@/app/copy/funnelCopy'

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

export const funnelHeats = [
  {
    id: 'entice_engage',
    slug: 'cold',
    title: copy.cold.title,
    description: copy.cold.description,
    tooltip: copy.cold.tooltip,
  },
  {
    id: 'entice_traffic',
    slug: 'cool',
    title: copy.cool.title,
    description: copy.cool.description,
    tooltip: copy.cool.tooltip,
  },
  {
    id: 'remind_traffic',
    slug: 'warm',
    title: copy.warm.title,
    description: copy.warm.description,
    tooltip: copy.warm.tooltip,
  },
]

// Get tournament link
export const getHeatTournamentLink = ({ heatSlug, funnelSlug }) => {
  return {
    pathname: ROUTES.TOURNAMENTS,
    query: {
      audience: heatSlug,
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

export const fetchHeats = async ({ artistId, activeFunnelId: funnelType }) => {
  if (!artistId) return []
  const fetchHeatTournaments = funnelHeats.map((heat) => {
    // GET ALL ARTIST TOURNAMENTS
    return getArtistTournaments({
      artistId,
      audienceId: `${heat.id}_${funnelType}`,
      expand: true,
      limit: 1,
    })
  })
  return Promise.all(fetchHeatTournaments)
}

// FORMAT DATA
// ------------------
export const formatData = (data) => {
  return funnelHeats.reduce((formattedData, heat, index) => {
    const { ads = null } = data[index][0] || {}
    formattedData[heat.slug] = {
      ...heat,
      ads,
    }
    return formattedData
  }, {})
}
