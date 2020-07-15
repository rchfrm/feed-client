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
export const getAllArtists = async (cursor, requestProps = {}) => {
  const endpoint = 'artists/all'
  // Add cursor to request props
  const requestPropsWithCursor = cursor ? { ...requestProps, after: cursor } : requestProps
  // Add request props
  const endpointWithProps = Object
    .entries(requestPropsWithCursor)
    .reduce((newEndpoint, [propName, propValue], index) => {
      const separator = index === 0 ? '?' : '&'
      // Add prop to endpoint
      return `${newEndpoint}${separator}${propName}=${propValue}`
    }, endpoint)
  return api.get(endpointWithProps)
}

/**
 * @param {string} [artistId]
 * @param {string} [status]
 * @returns {Promise<any>}
 */
export const updateArtistStatus = async (artistId, status) => {
  const endpointType = status === 'active' ? 'activate' : 'suspend'
  const endpoint = `artists/${artistId}/${endpointType}`
  return api.post(endpoint)
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
