import produce from 'immer'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'
import * as api from '@/helpers/api'

export const sortUserArtists = (user) => {
  return produce(user, draft => {
    draft.artists = sortArtistsAlphabetically(Object.values(user.artists))
  })
}

/**
 * @param {object} user
 * @param {string} orgTypes 'owned' | 'all'
 * @returns {array}
 */
export const getUserOrganizations = (user, orgTypes = 'owned') => {
  const { organizations } = user
  return Object.values(organizations).reduce((orgs, org) => {
    const { role } = org
    // If handling all org types, add Org to array
    if (orgTypes === 'all') return [...orgs, org]
    // Else only add if owned or admin
    if (role === 'owner' || role === 'admin') return [...orgs, org]
    // Else skip org
    return orgs
  }, [])
}

// Set access token
/**
 * @param {string} code
 * @param {string} redirectUrl
 * @returns {Promise<any>}
 */
export const setAccessToken = async (authCode, platform, redirectUrl) => {
  const requestUrl = `/actions/${platform}/access_token`
  const payload = {
    [`${platform === 'facebook' ? 'code' : 'authCode'}`]: authCode,
    redirect_uri: redirectUrl,
  }
  const errorTracking = {
    category: 'User',
    action: `Exchange ${platform} code for access token`,
  }
  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}
