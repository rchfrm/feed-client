import * as api from '@/helpers/api'

export const getTikTokRedirectUrl = () => {
  console.log('Create redirect url')
}

export const handleTikTokRedirect = () => {
  console.log('Do the actual redirect')
}

// Set access token
/**
 * @param {string} code
 * @param {string} redirectUrl
 * @returns {Promise<any>}
 */
export const setTikTokAccessToken = async (code, redirectUrl) => {
  const requestUrl = ''
  const payload = {
    code,
    redirect_uri: redirectUrl,
  }
  const errorTracking = {
    category: 'Connect Accounts',
    action: 'Exchange TikTok code for access token',
  }
  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}

// Update access token
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const updateTikTokAccessToken = (artistId) => {
  const requestUrl = `/artists/${artistId}/access_token`
  const payload = null
  const errorTracking = {
    category: 'Artist',
    action: 'Update TikTok access token',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}
