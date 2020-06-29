import * as api from '@/helpers/api'
import firebase from '@/helpers/firebase'

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
