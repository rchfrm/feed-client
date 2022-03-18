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
export const setDefaultCallToAction = async ({ artistId, callToAction, hasSalesObjective }) => {
  const endpoint = `/artists/${artistId}`
  const payload = {
    preferences: {
      posts: {
        call_to_action: callToAction,
      },
      ...(hasSalesObjective && {
        conversions: {
          call_to_action: callToAction,
        },
      }),
    },
  }
  const errorTracking = {
    category: 'Ad Defaults',
    action: 'Set global call to action',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
}
