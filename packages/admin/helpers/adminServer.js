import * as api from '@/helpers/api'

// UTILS
// -----------------------
const getEndpointWithRequestProps = (endpoint, requestProps = {}) => {
  return Object.entries(requestProps)
    .reduce((newEndpoint, [propName, propValue], index) => {
      const separator = index === 0 ? '?' : '&'
      // Add prop to endpoint
      return `${newEndpoint}${separator}${propName}=${propValue}`
    }, endpoint)
}

// GENERIC
// -----------------------
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

// All artists
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
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestPropsWithCursor)
  return api.get(endpointWithProps)
}

// Single artist
/**
 * @param {string} [artistId]
 * @param {string} [cursor]
 * @param {object} [requestProps]
 * @returns {Promise<array>}
 */
export const getArtist = async (artistId, requestProps = {}) => {
  const endpoint = `/artists/${artistId}`
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestProps)
  // Convert result to array
  const artist = await api.get(endpointWithProps)
  return [artist]
}

// Update artist
/**
 * @param {string} [artistId]
 * @param {string} [status] activate || suspend
 * @returns {Promise<any>}
 */
export const updateArtistStatus = async (artistId, status) => {
  const endpoint = `artists/${artistId}/${status}`
  return api.post(endpoint)
}

/**
* @param {string} [artistId]
* @returns {Promise<any>}
*/
export const getAdminFacebookIntegration = (artistId) => {
  return api.get(`artists/${artistId}/integrations/facebook`)
}


// USERS
// -----------------------

/**
 * @param {string} [token]
 * @returns {Promise<array>}
 */
export const getUser = async (userId, requestProps = {}) => {
  const endpoint = userId ? `users/${userId}` : '/users/me'
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestProps)
  const user = await api.get(endpointWithProps)
  return [user]
}

/**
 * @param {string} [token]
 * @param {string} [cursor]
 * @returns {Promise<any>}
 */
export const getAllUsers = async (cursor, requestProps = {}) => {
  const endpoint = 'users'
  const requestPropsWithAll = { all: '1', ...requestProps }
  // const requestPropsWithAll = { all: '1' }
  const requestPropsWithCursor = cursor ? { ...requestPropsWithAll, after: cursor } : requestPropsWithAll
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestPropsWithCursor)
  return api.get(endpointWithProps)
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
