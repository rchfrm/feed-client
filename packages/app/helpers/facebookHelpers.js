/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'

import { requiredScopesAccount } from '@/helpers/firebaseHelpers'
import facebook from '@/app/constants/facebook'

export const getFbRedirectUrl = (requestedPermissions, isReauth) => {
  const scopeRequests = requestedPermissions || requiredScopesAccount

  return `
    ${facebook.OAUTH_URL}?
    client_id=${facebook.APP_ID}&
    redirect_uri=${facebook.REDIRECT_URL}&
    state=empty&
    scope=${scopeRequests.join(',')}
    ${isReauth ? '&auth_type=rerequest' : ''}
  `
}

/**
 * @param {string} code
 * @param {string} redirectUri
 * @returns {Promise<any>}
 */
export const setFacebookAccessToken = async (code, redirectUrl) => {
  const requestUrl = '/actions/facebook/access_token'
  const payload = {
    code,
    redirect_uri: redirectUrl,
  }
  const errorTracking = {
    category: 'Connect Accounts',
    action: 'Exchange FB code for access token',
  }
  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}
