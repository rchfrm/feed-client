import * as api from '@/helpers/api'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'

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
export const getUser = async () => {
  const requestUrl = '/users/me'
  const errorTracking = {
    category: 'Login',
    action: 'Get User',
  }
  return api.requestWithCatch('get', requestUrl, null, errorTracking)
}

/**
 * @param {object} { firstName, lastName, referrerCode }
 * @param {string} [verify_id_token]
 * @returns {Promise<any>}
 */
export const createUser = async ({
  firstName,
  lastName,
  email,
  referrerCode,
}, token) => {
  if (!token) token = await firebaseHelpers.getIdTokenOrFail()
  const requestUrl = '/accounts/register'
  const payload = {
    first_name: firstName,
    last_name: lastName,
    ...(email && { email }),
    ...(referrerCode && { referrer_code: referrerCode }),
    token,
  }
  const errorTracking = {
    category: 'Signup',
    action: 'Create User',
  }
  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}

/**
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const patchUser = async ({ firstName, lastName, email, contactEmail }) => {
  const requestUrl = 'users/me'
  const hasContactEmail = typeof contactEmail !== 'undefined'
  const payload = {
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...(email && { email }),
    ...(hasContactEmail && { contact_email: contactEmail }),
  }
  const errorTracking = {
    category: 'User',
    action: 'Patch user',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}