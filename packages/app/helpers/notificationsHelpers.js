/* eslint-disable no-template-curly-in-string */

import moment from 'moment'

import * as appServer from '@/app/helpers/appServer'
import { requestWithCatch } from '@/helpers/api'

// * DICTIONARY
// ------------

// Convert dictionary into object keyed by error code
export const formatDictionary = (dictionaryArray = []) => {
  console.log('dictionaryArray', dictionaryArray)
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

// GET ACTION to handle notification
/**
 * @param {string} entityType 'users' | 'artists' | 'organizations'
 * @param {string} entityId
 * @param {string} notificationId
 * @param {boolean} read
 * @returns {Promise<array>}
 */
export const getAction = ({
  apiMethod,
  apiEndpoint,
  entityType,
  entityId,
  topic,
  data,
}) => {
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
  return () => requestWithCatch(apiMethod.toLowerCase(), endpointFormatted, payload, errorTracking)
}

// * FETCHING FROM SERVER
// -----------------------

// FORMAT NOTIFICATIONS
export const formatNotifications = (notificationsRaw, dictionary = {}) => {
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
      apiMethod,
      apiEndpoint,
      hide = false,
    } = dictionaryEntry || {}
    const date = moment(created_at).format('MM MMM')
    const dateLong = moment(created_at).format('MM MMM YY')
    const ctaFallback = isDismissible ? 'Ok' : 'Resolve'
    // Get Action function
    const onAction = isActionable ? getAction({
      apiMethod,
      apiEndpoint,
      entityType,
      entityId,
      topic,
      data,
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
