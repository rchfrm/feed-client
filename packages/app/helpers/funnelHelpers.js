import { getArtistTournaments } from '@/helpers/sharedServer'

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
    title: 'cold',
    description: 'Engagement from new audiences.',
  },
  {
    id: 'entice_traffic',
    slug: 'cool',
    title: 'cool',
    description: 'Lorem ipsum cool followers.',
  },
  {
    id: 'remind_traffic',
    slug: 'warm',
    title: 'warm',
    description: 'Lorem ipsum warm followers.',
  },
]

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
