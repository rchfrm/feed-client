import * as api from './api'

/**
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const getUser = async (token) => {
  return api.get('/users/me', token)
}

/**
 * @param {string} endpoint
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const getEndpoint = async (endpoint, token) => {
  return api.get(endpoint, token)
}

// ARTISTS
// -----------------------
/**
 * @param {string} [token]
 * @param {string} [cursor]
 * @returns {Promise<any>}
 */
export const getAllArtists = async (token, cursor) => {
  const pagination = cursor ? `&after=${cursor}` : ''
  const endpoint = `artists?all=1${pagination}`
  return api.get(endpoint, token)
}

// USERS
// -----------------------
/**
 * @param {string} [token]
 * @param {string} [cursor]
 * @returns {Promise<any>}
 */
export const getAllUsers = async (token, cursor) => {
  const pagination = cursor ? `&after=${cursor}` : ''
  const endpoint = `users?all=1${pagination}`
  return api.get(endpoint, token)
}

// TOURNAMENTS
// -----------------------
/**
 * @param {string} [artistId]
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const getArtistTournaments = async (artistId, token) => {
  // const endpoint = `/artists/${artistId}/tournaments?is_latest=1`
  const endpoint = `/artists/${artistId}/tournaments`
  return api.get(endpoint, token)
}
