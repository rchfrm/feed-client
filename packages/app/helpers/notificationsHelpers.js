import moment from 'moment'

import * as appServer from '@/app/helpers/appServer'

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
      is_dismissible: isDismissible,
      is_actionable: isActionable,
      is_complete: isComplete,
      formatted,
      // actioned_at,
    } = notification
    const dictionaryEntry = dictionary[topic]
    // Don't add notification if not in dictionary or if hidden in Dato
    if (!dictionaryEntry || dictionaryEntry.hide) return allNotifications
    // Just add notification if already formatted
    if (formatted || !dictionaryEntry) {
      return [...allNotifications, notification]
    }
    const {
      title = 'Helpp',
      appSummary: summary = '',
      appMessage: description = 'La la la',
      ctaText,
      hide = false,
    } = dictionaryEntry || {}
    const date = moment(created_at).format('MM MMM')
    const ctaFallback = isDismissible ? 'Ok' : 'Resolve'
    const formattedNotification = {
      id,
      entityType,
      entityId,
      topic,
      data,
      date,
      title,
      summary,
      description,
      ctaText: ctaText || ctaFallback,
      isActionable,
      isDismissible,
      hidden: hide || isComplete,
      isRead: false,
      onClick: () => {},
      formatted: true,
    }
    return [...allNotifications, formattedNotification]
  }, [])
}

// FETCH NOTIFICATIONS
export const fetchNotifications = async ({ artistId, userId, organizationIds }) => {
  const { res: notifications, error } = await appServer.getAllNotifications({ artistId, organizationIds, userId })
  if (error) return { error }
  console.log('server notifications', notifications)
  return { res: { notifications } }
}
