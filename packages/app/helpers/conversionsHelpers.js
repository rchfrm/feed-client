import * as api from '@/helpers/api'

// UPDATE CONVERSIONS LINK
/**
 * @param {string} artistId
 * @param {string} linkId
 * @returns {Promise<any>}
 */
export const updateDefaultConversionsLink = (artistId, linkId) => {
  const requestUrl = `/artists/${artistId}`
  const payload = { preferences: { conversions: { default_link_id: linkId } } }
  const errorTracking = {
    category: 'Links',
    action: 'Set link as conversions default',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

// GET FACEBOOK PIXEL EVENTS
/**
 * @returns {Promise<any>}
 */
export const getFacebookPixelEvents = async (artistId, pixelId) => {
  const endpoint = `/artists/${artistId}/pixels/${pixelId}/stats`
  const payload = {}
  const errorTracking = {
    category: 'Conversions',
    action: 'Get Facebook Pixel Events',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

// UPDATE FACEBOOK PIXEL EVENT
/**
 * @param {string} artistId
 * @param {string} event
 * @returns {Promise<any>}
 */
export const updateFacebookPixelEvent = async (artistId, event) => {
  const endpoint = `/artists/${artistId}`
  const payload = { preferences: { conversions: { facebook_pixel_event: event } } }
  const errorTracking = {
    category: 'Conversions',
    action: 'Save Facebook Pixel Event',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
}

// GET CALL TO ACTIONS
/**
 * @returns {Promise<any>}
 */
export const getCallToActions = async () => {
  const endpoint = '/preferences/call_to_actions'
  const payload = {}
  const errorTracking = {
    category: 'Conversions',
    action: 'Get Call to Actions',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

// UPDATE CALL TO ACTION
/**
 * @param {string} artistId
 * @param {string} callToAction
 * @returns {Promise<any>}
 */
export const updateCallToAction = async (artistId, callToAction) => {
  const endpoint = `/artists/${artistId}`
  const payload = { preferences: { conversions: { call_to_action: callToAction } } }
  const errorTracking = {
    category: 'Conversions',
    action: 'Save Call to Action',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
}

// ENABLE CONVERSIONS
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const enableConversions = async (artistId) => {
  const endpoint = `/artists/${artistId}`
  const payload = { conversions_enabled: true }
  const errorTracking = {
    category: 'Conversions',
    action: 'Enable conversions',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
}

// UPDATE CONVERSIONS PREFERENCES
/**
 * @param {string} artistId
 * @param {object} preferences
 * @returns {Promise<any>}
 */
export const updateConversionsPreferences = (artistId, { defaultLinkId, facebookPixelEvent, callToAction }) => {
  const requestUrl = `/artists/${artistId}`
  const conversions = {
    default_link_id: defaultLinkId,
    facebook_pixel_event: facebookPixelEvent,
    call_to_action: callToAction,
  }
  const payload = { preferences: { conversions } }
  const errorTracking = {
    category: 'Conversions',
    action: 'Set conversions preferences',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}
