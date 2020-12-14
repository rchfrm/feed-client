import get from 'lodash/get'

import * as api from '@/helpers/api'
import { track } from '@/app/helpers/trackingHelpers'

// * UTILS
// ------------------

/**
  * @param {string} requestType get | patch | post
  * @param {string} url
  * @param {object} payload
  * @param {object} trackError { category, action }
  * @param {string} token
  * @returns {Promise<object>} { res, error }
  * * Makes requests  and returns errors as if the request were succesful with an `error.message` key filled out
*/
const requestWithCatch = async (requestType, url, payload = null, trackError, token) => {
  if (!requestType) return console.error('Please include a request type')
  if (!url) return console.error('Please include a url')
  // eslint-disable-next-line import/namespace
  const res = await api[requestType](url, payload, token)
    .catch((error) => { return { error } })
  if (res.error) {
    const { error } = res
    const { code, context } = error
    const message = typeof error.response === 'object' ? error.response.data.error : error.message
    // Track error on sentry
    if (trackError) {
      const { category, action, ignoreErrorCodes = [] } = trackError
      // Ignore error codes
      if (!ignoreErrorCodes.includes(code)) {
        track({
          category,
          action,
          description: message,
          error: true,
        })
      }
    }
    return { error: { message, code, context } }
  }
  return { res }
}

// * ARTIST
// ------------------

/**
 * @param {string} artistId
 * @param {number} dailyBudget
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const updateDailyBudget = async (artistId, dailyBudget, verifyIdToken) => {
  return api.patch(`/artists/${artistId}`, { daily_budget: dailyBudget }, verifyIdToken)
}


// * INTEGRATIONS
// -------------------
/**
 * @param {string} artistId
 * @param {array} integrations
 * @returns {Promise<any>}
 * To delete: integrations = [{ platform: <platform_id>, value: null }]
 * To add/edit: integrations = [{ platform: <platform_id>, value: <account_id>, accountIdKey: <accountIdKey> } }]
 */
export const updateIntegration = async (artistId, integrations) => {
  const requestUrl = `/artists/${artistId}`
  const integrationsPayload = integrations.reduce((obj, integration) => {
    const { platform, value, accountIdKey } = integration
    // For deleting
    if (!value) {
      obj[platform] = null
      return obj
    }
    // For adding
    obj[platform] = {}
    obj[platform][accountIdKey] = value

    return obj
  }, {})
  const payload = { integrations: integrationsPayload }
  const errorTracking = {
    category: 'Integrations',
    action: 'Update integration',
  }
  return requestWithCatch('patch', requestUrl, payload, errorTracking)
}

// * DATA INSIGHTS
// -------------------

/**
 * @param {string} endpoint
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getEndpoint = async (endpoint, verifyIdToken) => {
  return api.get(endpoint, verifyIdToken)
}

/**
 * @param {string} path
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getPath = async (path, verifyIdToken) => {
  return api.get(path, verifyIdToken)
}

/**
 * @param {array} dataSources
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getDataSourceValue = async (dataSources, artistId) => {
  return api
    .get(`/artists/${artistId}/data_sources`, {
      name: dataSources.join(','),
    })
    .then(res => {
      // convert array to object with data source name as keys
      return res.reduce((obj, dataSource) => {
        obj[dataSource.name] = dataSource
        return obj
      }, {})
    })
}

/**
 * @param {string} dataSource
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getDataSourceProjection = async (dataSource, artistId) => {
  return api.get(`/artists/${artistId}/data_sources/${dataSource}/annualized`)
}

// * ASSETS / POSTS
//-------------------------

/**
* @param {number} limit
* @param {string} artistId
* @param {string} promotionStatus
* @param {string} [cursor]
* @returns {Promise<any>}
*/
export const getPosts = async ({ limit = 10, artistId, promotionStatus, cursor }) => {
  const queryParams = {
    limit,
    // add cursor if defined
    ...(cursor && { after: cursor }),
    // Filter by promotion status if not "all"
    ...(promotionStatus && promotionStatus !== 'all')
    && { promotion_status: promotionStatus },
    // Hide non-promotable posts if showing inactive
    ...(promotionStatus === 'inactive') && { is_promotable: 1 },
  }
  return api.get(`/artists/${artistId}/assets`, queryParams)
}

/**
 * @param {string} artistId
 * @param {string} [promotionStatus]
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getAssets = async (artistId, promotionStatus, verifyIdToken) => {
  const query = promotionStatus ? { promotion_status: promotionStatus } : {}

  return api.get(`/artists/${artistId}/assets`, query, verifyIdToken)
}

/**
 * @param {string} artistId
 * @param {string} postId
 * @param {boolean} promotionEnabled
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const togglePromotionEnabled = async (artistId, postId, promotionEnabled) => {
  const requestUrl = `/artists/${artistId}/assets/${postId}`
  const payload = { promotion_enabled: promotionEnabled }
  const errorTracking = {
    category: 'Posts',
    action: 'Toggle promotion enabled',
  }
  return requestWithCatch('patch', requestUrl, payload, errorTracking)
}

/**
 * @param {string} artistId
 * @param {boolean} enabled
 * @returns {Promise<any>}
 */
export const toggleDefaultPromotionStatus = async (artistId, enabled) => {
  return api.post('/actions/batchSetPromotionEnabled', { artist_id: artistId, enabled })
}


/**
 * @param {string} artistId
 * @param {boolean} enabled
 * @returns {Promise<any>}
 */
export const patchArtistPromotionStatus = async (artistId, enabled) => {
  return api.patch(`/artists/${artistId}`, { preferences: { posts: { promotion_enabled_default: enabled } } })
}


/**
 * @param {array} artistIds
 * @param {string} accessToken
 * @returns {Promise<any>}
 * Returns errors as if the request were succesful with a `error` key filled out
 */
export const updateAccessToken = async (artistIds, accessToken) => {
  const requests = artistIds.map((artistId) => {
    return api.patch(`/artists/${artistId}`, {
      integrations: {
        facebook: {
          access_token: accessToken,
        },
      },
    })
  })
  const results = await Promise.allSettled(requests)
  // Test for errors that aren't related to no access to account
  const errors = results.filter((res) => {
    const { status } = res
    const errorMessage = get(res, 'reason.response.data.error', null)
    return status === 'rejected' && !errorMessage.includes('does not have access to page id')
  })
  // If there are errors, pass the first one
  if (errors.length) {
    const message = get(errors[0], 'reason.message', 'Error')
    return { error: { message } }
  }
  return { res: results }
}

// Set link on post
/**
* @param {string} artistId
* @param {string} assetId
* @param {string} linkId
* @returns {Promise<object>} { res, error }
*/
export const setPostLink = (artistId, assetId, linkId) => {
  const requestUrl = `/artists/${artistId}/assets/${assetId}`
  const payload = {
    link_spec: {
      type: 'linkbank',
      data: {
        id: linkId,
      },
    },
  }
  const errorTracking = {
    category: 'Links',
    action: 'Set link as post link',
  }
  return requestWithCatch('patch', requestUrl, payload, errorTracking)
}



// * TARGETING
// --------------------------

// Fetch initial settings
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const getTargetingSettings = async (artistId) => {
  const requestUrl = `/artists/${artistId}/targeting`
  return requestWithCatch('get', requestUrl)
}

// Fetch popular locations
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const getTargetingPopularLocations = async (artistId) => {
  const requestUrl = `/artists/${artistId}/targeting/geo_locations`
  return requestWithCatch('get', requestUrl)
}

// Save new targeting settings
/**
* @param {string} artistId
* @param {object} newState
* @param {array} cities
* @param {array} countries
* @returns {Promise<object>} { res, error }
*/
export const saveTargetingSettings = async (artistId, payload) => {
  const requestUrl = `/artists/${artistId}/targeting`
  return requestWithCatch('patch', requestUrl, payload)
}


// * LINKS
// ----------------

// Fetch artist links
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const fetchSavedLinks = (artistId) => {
  const requestUrl = `/artists/${artistId}/linkbank`
  const errorTracking = {
    category: 'Links',
    action: 'Fetch saved links',
  }
  return requestWithCatch('get', requestUrl, null, errorTracking)
}


// Update link
/**
* @param {string} artistId
* @param {object} link
* @param {string} action add | edit | delete
* @returns {Promise<object>} { res, error }
*/
export const updateLink = (artistId, link, action, force, usedLinkErrorCode) => {
  const method = `${action}_link`
  const requestUrl = `/artists/${artistId}/linkbank?method=${method}`
  const { id, name, href, folder_id } = link
  const payload = {
    ...(id && { id }),
    name,
    href,
    force,
    ...(folder_id && { folder_id }),
  }
  const errorTracking = {
    category: 'Links',
    action: `${action} link`,
    ignoreErrorCodes: [usedLinkErrorCode],
  }
  return requestWithCatch('post', requestUrl, payload, errorTracking)
}

// Update a folder
/**
* @param {string} artistId
* @param {object} folder
* @param {string} action add | edit | delete
* @returns {Promise<object>} { res, error }
*/
export const updateFolder = (artistId, folder, action, force) => {
  const method = `${action}_folder`
  const requestUrl = `/artists/${artistId}/linkbank?method=${method}`
  const { name, id } = folder
  const payload = { name, id, force }
  const errorTracking = {
    category: 'Links',
    action: `${action} folder`,
  }
  return requestWithCatch('post', requestUrl, payload, errorTracking)
}

// Set link as default
/**
* @param {string} artistId
* @param {string} linkId
* @returns {Promise<object>} { res, error }
*/
export const setLinkAsDefault = (artistId, linkId) => {
  const requestUrl = `/artists/${artistId}`
  const payload = { preferences: { posts: { default_link_id: linkId } } }
  const errorTracking = {
    category: 'Links',
    action: 'Set link as default',
  }
  return requestWithCatch('patch', requestUrl, payload, errorTracking)
}


// * REFERRALS
// --------------------------

/**
 * @param {string} code
 * @returns {Promise<any>}
 */
export const testReferralCode = async (code) => {
  const requestUrl = '/accounts/referrer'
  const payload = { referrer_code: code }
  const dummyToken = 'lulz' // stops trying to find token
  const errorTracking = {
    category: 'Links',
    action: 'Set link as default',
  }
  return requestWithCatch('post', requestUrl, payload, errorTracking, dummyToken)
}



// * INTEGRATION ERRORS
// --------------------------

/**
 * @param {string} artistId
 * @param {string} postId
 * @param {string} link
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getIntegrationErrors = async (artistId) => {
  return api.get(`/artists/${artistId}/integrations/errors`)
}
