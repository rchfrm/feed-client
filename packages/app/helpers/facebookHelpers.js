/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'

import { requiredScopesAccount } from '@/helpers/firebaseHelpers'
import * as ROUTES from '@/app/constants/routes'

const url = 'https://graph.facebook.com/v8.0/'

export const getInstagramBusinessUsername = async (ig_business_id, fb_access_token) => {
  const endpoint = `${url + ig_business_id}?fields=username&access_token=${fb_access_token}`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
    })
    if (res.ok) {
      const jsonResponse = await res.json()
      return jsonResponse.username
    }
    throw new Error('Request to GET Instagram Username failed')
  } catch (err) {
    return err
  }
}

export const getFbRedirectUri = (requestedPermissions) => {
  const scopeRequests = requestedPermissions || requiredScopesAccount
  const facebookAppId = '617771208738795'
  const redirectUri = `https://localhost:3001${ROUTES.CONNECT_ACCOUNTS}`
  const stateParam = ''

  return `https://www.facebook.com/v12.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${redirectUri}&state=${stateParam}&scope=${scopeRequests.join(',')}`
}

/**
 * @param {string} facebookCode
 * @param {string} redirectUri
 * @returns {Promise<any>}
 */
export const setFacebookAccessToken = async (code, redirectUri) => {
  const requestUrl = '/actions/facebook/access_token'
  const payload = {
    code,
    redirect_uri: redirectUri,
  }
  const errorTracking = {
    category: 'Connect Accounts',
    action: 'Exchange FB code for access token',
  }
  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}
