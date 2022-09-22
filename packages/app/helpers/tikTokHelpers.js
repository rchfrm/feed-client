import * as api from '@/helpers/api'
import tiktok from '@/app/constants/tiktok'
import { setLocalStorage } from '@/helpers/utils'


export const getTikTokAuthUrl = (redirectPath, csrfState) => {
  const redirectUrl = `${process.env.react_app_url}${redirectPath}`

  return `${tiktok.OAUTH_URL}?app_id=${tiktok.APP_ID}&redirect_uri=${redirectUrl}&state=${csrfState}`
}

export const handleTikTokAuthRedirect = (redirectPath) => {
  const csrfState = (Math.random() + 1).toString(36).substring(4)
  const url = getTikTokAuthUrl(redirectPath, csrfState)

  setLocalStorage('tikTokRedirect', JSON.stringify({ state: csrfState }))
  window.location.href = url
}

// Set access token
/**
 * @param {string} code
 * @param {string} redirectUrl
 * @returns {Promise<any>}
 */
export const setTikTokAccessToken = async (authCode) => {
  const requestUrl = ''
  const payload = {
    authCode,
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
