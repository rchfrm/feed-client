/* eslint-disable no-template-curly-in-string */

/* *****
* README
* See `/docs/notifications.md` for an explanation of how this works
*/

import moment from 'moment'
import Router from 'next/router'

import { mixpanelExternalLinkClick } from '@/helpers/mixpanelHelpers'
import { track } from '@/helpers/trackingHelpers'
import { handleFbAuthRedirect } from '@/app/helpers/facebookHelpers'

import * as appServer from '@/app/helpers/appServer'
import { requestWithCatch } from '@/helpers/api'

import * as ROUTES from '@/app/constants/routes'

// To parse cases like {{ this }} and {{{ this }}}
const RE_TEMPLATE = /\{?\{\{\s([a-z0-9_]+)\s\}\}\}?/g

// * DICTIONARY
// ------------

// Convert dictionary into object keyed by error code
export const formatDictionary = (dictionaryArray = []) => {
  return dictionaryArray.reduce((dictionary, entry) => {
    const { topic } = entry
    // Handle duplicate
    if (dictionary[topic]) {
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

const getLinkAction = (ctaType, ctaLink, trackingPayload) => {
  // INTERNAL
  if (ctaType === 'link_int') {
    return () => Router.push(ctaLink)
  }
  // EXTERNAL:
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
  ctaType,
  apiMethod,
  apiEndpoint,
  entityType,
  entityId,
  topic,
  data,
  title,
  isDismissible,
  isActionable,
  auth,
}) => {
  // Handle relink FB
  if (ctaType === 'fb_reauth') {
    const { required_scope: requiredScope = [] } = data
    return () => handleFbAuthRedirect(auth, requiredScope, ROUTES.NOTIFICATIONS)
  }

  // Handle no method or link
  if (! apiEndpoint && ! ctaLink) return () => {}
  // Handle link
  if (ctaLink) {
    let link = ctaLink
    // Check if link uses a variable, if it does extract the correct link from the data object
    const match = RE_TEMPLATE.exec(ctaLink)
    if (match) {
      const [, variable] = match
      link = data[variable]
    }
    return getLinkAction(ctaType, link, {
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

const getKeysAndSubstringsFromTemplate = (template) => {
  const keys = {}
  const result = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = RE_TEMPLATE.exec(template)
    if (! match) {
      break
    }

    const [substring, key] = match

    if (key in keys) {
      continue
    }

    result.push({ key, substring })
    keys[key] = true
  }

  return result
}

const formatNotificationText = (text, data) => {
  const keysAndSubstrings = getKeysAndSubstringsFromTemplate(text)

  keysAndSubstrings.forEach(({ key, substring }) => {
    // Replace all entries of '{{ profile_name }}' with data['profile_name']
    text = text.replace(RegExp(substring, 'g'), data[key])
  })

  return text
}

// * FETCHING FROM SERVER
// -----------------------

// FORMAT NOTIFICATIONS
export const formatNotifications = ({ notificationsRaw, dictionary = {}, auth = {} }) => {
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
      type,
      // actioned_at,
    } = notification
    const dictionaryEntry = dictionary[topic]
    // Don't add notification
    // - if not in dictionary
    // - if hidden in Dato
    // - if complete
    // Just add notification if already formatted
    if (formatted) {
      return [...allNotifications, notification]
    }
    const {
      title,
      ctaType,
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
    // Get Action function
    const onAction = getAction({
      ctaLink,
      ctaType,
      apiMethod,
      apiEndpoint,
      entityType,
      entityId,
      topic,
      data,
      title,
      isDismissible,
      isActionable,
      auth,
    })
    // Return formatted notification
    const formattedNotification = {
      id,
      entityType,
      entityId,
      topic,
      data,
      date,
      dateLong,
      title: formatNotificationText(title, data),
      summary: formatNotificationText(summary, data),
      description: formatNotificationText(description, data),
      buttonType,
      ctaType,
      ctaLink,
      ctaText,
      isActionable,
      isDismissible,
      isComplete,
      hidden: hide || isComplete,
      isRead,
      onAction,
      formatted: true,
      type,
    }
    return [...allNotifications, formattedNotification]
  }, [])
}

// FETCH NOTIFICATIONS
export const fetchNotifications = async ({ artistId, userId, organizationIds }) => {
  return appServer.getAllNotifications({ artistId, organizationIds, userId })
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
  const payload = { is_read: read }
  const errorTracking = {
    category: 'Notifications',
    action: 'Mark notification as read',
  }
  return requestWithCatch('patch', endpoint, payload, errorTracking)
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
  const errorTracking = {
    category: 'Notifications',
    action: 'Delete/dismiss notification',
  }
  return requestWithCatch('delete', endpoint, null, errorTracking)
}
