import * as api from '@/helpers/api'

export const updateDefaultConversionsLink = (artistId, linkId) => {
  const requestUrl = `/artists/${artistId}`
  const payload = { preferences: { converions: { default_link_id: linkId } } }
  const errorTracking = {
    category: 'Links',
    action: 'Set link as conversions default',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

export const getFacebookPixelEvents = async () => {
  const endpoint = '/preferences/facebook_pixel_events'
  const payload = {}
  const errorTracking = {
    category: 'Conversions',
    action: 'Get Facebook Pixel Events',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

export const updateFacebookPixelEvent = async (artistId, event) => {
  const endpoint = `/artists/${artistId}`
  const payload = { preferences: { conversions: { facebook_pixel_event: event } } }
  const errorTracking = {
    category: 'Conversions',
    action: 'Save Facebook Pixel Event',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
}

export const getCallToActions = async () => {
  const endpoint = '/preferences/call_to_actions'
  const payload = {}
  const errorTracking = {
    category: 'Conversions',
    action: 'Get Call to Actions',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

export const updateCallToAction = async (artistId, callToAction) => {
  const endpoint = `/artists/${artistId}`
  const payload = { preferences: { conversions: { call_to_action: callToAction } } }
  const errorTracking = {
    category: 'Conversions',
    action: 'Save Call to Action',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
}

export const enableConversions = async (artistId) => {
  const endpoint = `/artists/${artistId}`
  const payload = { conversions_enabled: true }
  const errorTracking = {
    category: 'Conversions',
    action: 'Enable conversions',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
}
