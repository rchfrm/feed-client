import * as api from '@/helpers/api'

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

// CALL TO ACTION
/**
 * @param {string} artistId
 * @param {string} callToAction
 * @returns {Promise<any>}
 */
export const setDefaultCallToAction = async ({ artistId, callToAction }) => {
  console.log('artistId', artistId)
  const endpoint = `/artists/${artistId}`
  const payload = { preferences: { posts: { call_to_action: callToAction } } }
  const errorTracking = {
    category: 'Ad Defaults',
    action: 'Set global call to action',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
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
