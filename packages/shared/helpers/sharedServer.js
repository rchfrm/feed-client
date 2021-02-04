import * as api from '@/helpers/api'
import firebase from '@/helpers/firebase'

// GENERIC
/**
* @param {string} [endpoint]
* @returns {Promise<any>}
*/
export const getEndpoint = async (endpoint) => {
  return api.get(endpoint)
}

// USER
/**
* @param {string} [verifyIdToken]
* @returns {Promise<any>}
*/
export const getUser = async (verifyIdToken) => {
  return api.get('/users/me', verifyIdToken)
}

/**
 * @param {object} { firstName, lastName, referrerCode }
 * @param {string} [verify_id_token]
 * @returns {Promise<any>}
 */
export const createUser = async ({
  firstName,
  lastName,
  referrerCode,
}, token) => {
  if (!token) token = await firebase.getIdTokenOrFail()
  return api
    .post('/accounts/register', {
      first_name: firstName,
      last_name: lastName,
      ...(referrerCode && { referrer_code: referrerCode }),
      token,
    }, false)
}

/**
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const updateUser = async (firstName, lastName, email, verifyIdToken) => {
  return api
    .patch('/users/me', {
      first_name: firstName,
      last_name: lastName,
      email,
    }, verifyIdToken)
}


// TOURNAMENTS
// -----------------------
/**
 * @param {string} [artistId]
 * @param {boolean} [expand]
 * @param {number} [offset]
 * @returns {Promise<any>}
 */
export const getArtistTournaments = async ({ artistId, expand, audienceId, offset, limit }) => {
  let hasQuery = false
  let queryMod
  let endpoint = `/artists/${artistId}/tournaments`
  if (expand) {
    endpoint = `${endpoint}?expand=true`
    hasQuery = true
  }
  if (offset) {
    queryMod = hasQuery ? '&' : '?'
    endpoint = `${endpoint}${queryMod}offset=${offset}`
    hasQuery = true
  }
  if (limit) {
    queryMod = hasQuery ? '&' : '?'
    endpoint = `${endpoint}${queryMod}limit=${limit}`
    hasQuery = true
  }
  if (audienceId) {
    queryMod = hasQuery ? '&' : '?'
    endpoint = `${endpoint}${queryMod}identifier=${audienceId}`
    hasQuery = true
  }
  return api.get(endpoint)
}

/**
 * @param {string} [artistId]
 * @param {string} [campaignId]
 * @param {string} [adsetId]
 * @param {string} [tournamentId]
 * @param {boolean} [expand]
 * @returns {Promise<any>}
 */
export const getTournament = async (artistId, campaignId, adsetId, tournamentId, expand) => {
  const endpoint = `artists/${artistId}/campaigns/${campaignId}/adsets/${adsetId}/tournaments/${tournamentId}${expand && '?expand=true'}`
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
