/* eslint-disable import/prefer-default-export */
import { requiredScopesAds } from '@/helpers/firebaseHelpers'
import * as utils from '@/helpers/utils'
import * as api from '@/helpers/api'
import facebook from '@/app/constants/facebook'

export const getFbAuthUrl = ({ redirectPath, requestedPermissions, state, isReauth }) => {
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

export const handleFbAuthRedirect = (auth, scopes, redirectPath) => {
  const { missingScopes: { ads: missingScopes }, providerIds } = auth
  const isReauth = scopes?.length || missingScopes.length || providerIds.includes('facebook.com')
  const requestedPermissions = scopes || (missingScopes.length ? missingScopes : null) || null
  const state = (Math.random() + 1).toString(36).substring(4)

  const url = getFbAuthUrl({
    redirectPath,
    requestedPermissions,
    state,
    isReauth,
  })

  utils.setLocalStorage('platformRedirect', JSON.stringify({ state, redirectPath }))
  window.location.href = url
}

/**
 * @param {string} pageId
 * @returns {Promise<any>}
 */
export const getFacebookPage = async (pageId) => {
  const requestUrl = '/actions/facebook/page'
  const payload = {
    pageId,
  }
  const errorTracking = {
    category: 'Connect Accounts',
    action: 'Get Facebook page',
  }
  return api.requestWithCatch('get', requestUrl, payload, errorTracking)
}
