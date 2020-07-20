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
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} [verify_id_token]
 * @returns {Promise<any>}
 */
export const createUser = async (first_name, last_name, verify_id_token) => {
  if (!verify_id_token) verify_id_token = await firebase.getIdTokenOrFail()
  return api
    .post('/accounts/register', {
      first_name,
      last_name,
      token: verify_id_token,
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
