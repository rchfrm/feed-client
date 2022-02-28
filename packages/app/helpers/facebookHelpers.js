/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'

import { requiredScopesAds } from '@/helpers/firebaseHelpers'
import * as utils from '@/helpers/utils'

import facebook from '@/app/constants/facebook'

export const getFbRedirectUrl = ({ redirectPath, requestedPermissions, state, isReauth }) => {
  const scopeRequests = requestedPermissions || requiredScopesAds
  const redirectUrl = `${process.env.react_app_url}${redirectPath}`

  return `
${facebook.OAUTH_URL}?
client_id=${facebook.APP_ID}&
redirect_uri=${redirectUrl}&
state=${state}&
scope=${scopeRequests.join(',')}
${isReauth ? '&auth_type=rerequest' : ''}`
}

export const handleFbRedirect = (auth, scopes, redirectPath) => {
  const { missingScopes: { ads: missingScopes }, providerIds } = auth
  const isReauth = scopes?.length || missingScopes.length || providerIds.includes('facebook.com')
  const requestedPermissions = scopes || (missingScopes.length ? missingScopes : null) || null
  const state = (Math.random() + 1).toString(36).substring(4)

  const url = getFbRedirectUrl({
    redirectPath,
    requestedPermissions,
    state,
    isReauth,
  })

  utils.setLocalStorage('fbRedirect', JSON.stringify({ state, redirectPath }))
  window.location.href = url
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
