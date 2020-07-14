import * as api from '@/helpers/api'

/**
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const getUser = async () => {
  return api.get('/users/me')
}

/**
 * @param {string} endpoint
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const getEndpoint = async (endpoint) => {
  return api.get(endpoint)
}

// ARTISTS
// -----------------------
/**
 * @param {string} [token]
 * @param {string} [cursor]
 * @param {object} [requestProps]
 * @returns {Promise<any>}
 */
export const getAllArtists = async (cursor, requestProps) => {
  let endpoint = 'artists?all=1'
  // Add cursor if defined
  if (cursor) endpoint = `${endpoint}&after=${cursor}`
  // Add request props
  const endpointWithProps = !requestProps ? endpoint : Object
    .entries(requestProps)
    .reduce((newEndpoint, [propName, propValue]) => {
      // Ignore malformed props
      if (!propName || !propValue) return newEndpoint
      // Add prop to endpoint
      return `${newEndpoint}&${propName}=${propValue}`
    }, endpoint)
  return api.get(endpointWithProps)
}

// USERS
// -----------------------
/**
 * @param {string} [token]
 * @param {string} [cursor]
 * @returns {Promise<any>}
 */
export const getAllUsers = async (cursor) => {
  const pagination = cursor ? `&after=${cursor}` : ''
  const endpoint = `users?all=1${pagination}`
  return api.get(endpoint)
}

// TOURNAMENTS
// -----------------------
/**
 * @param {string} [artistId]
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const getArtistTournaments = async (artistId) => {
  // const endpoint = `/artists/${artistId}/tournaments?is_latest=1`
  const endpoint = `/artists/${artistId}/tournaments`
  return api.get(endpoint)
}

export const getTournament = async (artistId, campaignId, adsetId, tournamentId) => {
  const endpoint = `artists/${artistId}/campaigns/${campaignId}/adsets/${adsetId}/tournaments/${tournamentId}`
  return api.get(endpoint)
}

export const getCampaign = async (artistId, campaignId) => {
  const endpoint = `artists/${artistId}/campaigns/${campaignId}`
  return api.get(endpoint)
}

export const getAdset = async (artistId, campaignId, adsetId) => {
  const endpoint = `artists/${artistId}/campaigns/${campaignId}/adsets/${adsetId}`
  return api.get(endpoint)
}
