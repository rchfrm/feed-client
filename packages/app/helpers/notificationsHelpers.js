/* eslint-disable no-template-curly-in-string */

import moment from 'moment'

import { mixpanelExternalLinkClick } from '@/app/helpers/mixpanelHelpers'
import { track } from '@/app/helpers/trackingHelpers'

import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import * as appServer from '@/app/helpers/appServer'
import { requestWithCatch } from '@/helpers/api'

// * DICTIONARY
// ------------

// Convert dictionary into object keyed by error code
export const formatDictionary = (dictionaryArray = []) => {
  return dictionaryArray.reduce((dictionary, entry) => {
    const { topic } = entry
    // Handle duplicate
    if (dictionary[topic]) {
      console.error('duplicate topic: ', topic)
      return dictionary
    }
    // Add topic
    dictionary[topic] = { ...entry }
    return dictionary
  }, {})
}

const getEndpoint = (apiEndpoint, entityType, entityId) => {
  if (entityType === 'users') return apiEndpoint.replace('${user.id}', entityId)
  if (entityType === 'artists') return apiEndpoint.replace('${artist.id}', entityId)
  if (entityType === 'organizations') return apiEndpoint.replace('${organization.id}', entityId)
}

const getExternalLinkAction = (ctaLink, trackingPayload) => {
  // Tracks click in mixpanel and opens link
  return () => {
    mixpanelExternalLinkClick({
      url: ctaLink,
      eventName: 'notification_actioned',
      payload: trackingPayload,
      useNewTab: true,
    })
    return { res: 'incomplete' }
  }
}

const getFbRelinkAction = (hasFbAuth, missingScopes) => {
  if (hasFbAuth) {
    return firebaseHelpers.reauthFacebook(missingScopes)
  }
  return firebaseHelpers.linkFacebookAccount()
}

// GET ACTION to handle notification
/**
 * @param {string} entityType 'users' | 'artists' | 'organizations'
 * @param {string} entityId
 * @param {string} notificationId
 * @param {boolean} read
 * @returns {Promise<array>}
 */
export const getAction = ({
  ctaLink,
  apiMethod,
  apiEndpoint,
  entityType,
  entityId,
  topic,
  data,
  title,
  isDismissible,
  isActionable,
  hasFbAuth,
  missingScopes,
}) => {
  // Handle relink FB
  if (topic === 'facebook-expired-access-token') {
    return () => getFbRelinkAction(hasFbAuth, missingScopes)
  }
  // Handle no method or link
  if (!apiEndpoint && !ctaLink) return () => {}
  // Handle link
  if (ctaLink) {
    return getExternalLinkAction(ctaLink, {
      title,
      topic,
      isDismissible,
      isActionable,
    })
  }
  // Format endpoint
  const endpointFormatted = getEndpoint(apiEndpoint, entityType, entityId)
  // Build API request
  const payload = {
    ...data,
    topic,
  }
  const errorTracking = {
    category: 'Notifcations',
    action: `Action ${topic}`,
  }
  return () => {
    track('notification_actioned', {
      title,
      topic,
      isDismissible,
      isActionable,
    })
    requestWithCatch(apiMethod.toLowerCase(), endpointFormatted, payload, errorTracking)
  }
}

// * FETCHING FROM SERVER
// -----------------------

// FORMAT NOTIFICATIONS
export const formatNotifications = ({ notificationsRaw, dictionary = {}, hasFbAuth = false, missingScopes = [] }) => {
  return notificationsRaw.reduce((allNotifications, notification) => {
    const {
      id,
      topic,
      data,
      created_at,
      entityType,
      entityId,
      is_read: isRead,
      is_dismissible: isDismissible,
      is_actionable: isActionable,
      is_complete: isComplete,
      formatted,
      // actioned_at,
    } = notification
    const dictionaryEntry = dictionary[topic]
    // Don't add notification
    // - if not in dictionary
    // - if hidden in Dato
    // - if complete
    if (!dictionaryEntry || dictionaryEntry.hide || isComplete) return allNotifications
    // Just add notification if already formatted
    if (formatted || !dictionaryEntry) {
      return [...allNotifications, notification]
    }
    const {
      title,
      appSummary: summary,
      appMessage: description,
      ctaText,
      ctaLink,
      buttonType,
      apiMethod,
      apiEndpoint,
      hide = false,
    } = dictionaryEntry || {}
    const date = moment(created_at).format('DD MMM')
    const dateLong = moment(created_at).format('DD MMM YY')
    const ctaFallback = isDismissible ? 'Ok' : 'Resolve'
    // Get Action function
    const onAction = isActionable ? getAction({
      ctaLink,
      apiMethod,
      apiEndpoint,
      entityType,
      entityId,
      topic,
      data,
      title,
      isDismissible,
      isActionable,
      hasFbAuth,
      missingScopes,
    }) : () => {}
    // Return formatted notification
    const formattedNotification = {
      id,
      entityType,
      entityId,
      topic,
      data,
      date,
      dateLong,
      title,
      summary,
      description,
      ctaText: ctaText || ctaFallback,
      buttonType,
      isActionable,
      isDismissible,
      hidden: hide || isComplete,
      isComplete,
      isRead,
      onAction,
      formatted: true,
    }
    return [...allNotifications, formattedNotification]
  }, [])
}

// FETCH NOTIFICATIONS
export const fetchNotifications = async ({ artistId, userId, organizationIds }) => {
  const { res: notifications, error } = await appServer.getAllNotifications({ artistId, organizationIds, userId })
  if (error) return { error }
  return { res: { notifications } }
}


// * ACTIONS
// ----------

// MARK AS READ
/**
 * @param {string} notificationId
 * @param {string} entityType 'users' | 'artists' | 'organizations'
 * @param {string} entityId
 * @param {boolean} read
 * @returns {Promise<array>}
 */
export const markAsReadOnServer = async (notificationId, entityType = 'users', entityId, read = true) => {
  const endpoint = `${entityType}/${entityId}/notifications/${notificationId}`
  const { res, error } = await appServer.markNotificationAsRead(endpoint, read)
  if (error) return { error }
  return { res }
}

// DISMISS
/**
 * @param {string} notificationId
 * @param {string} entityType 'users' | 'artists' | 'organizations'
 * @param {string} entityId
 * @param {boolean} read
 * @returns {Promise<array>}
 */
export const dismissOnServer = async (notificationId, entityType = 'users', entityId) => {
  const endpoint = `${entityType}/${entityId}/notifications/${notificationId}`
  const { res, error } = await appServer.dismissNotification(endpoint)
  if (error) return { error }
  return { res }
}
