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
export const formatNotifications = (notificationsRaw, dictionary) => {
  return notificationsRaw.map((notification) => {
    const {
      id,
      topic,
      data,
      created_at,
      is_dismissible: isDismissible,
      is_actionable: isActionable,
      is_complete: isComplete,
      formatted,
      // actioned_at,
    } = notification
    // Stop here if already formatted or no dictionary
    if (formatted || !dictionary) return notification
    const dictionaryEntry = dictionary[topic]
    const {
      title = 'Helpp',
      appMessage: description = 'La la la',
      ctaText,
      hide = false,
    } = dictionaryEntry || {}
    const date = moment(created_at).format('MM MMM')
    const ctaFallback = isDismissible ? 'Ok' : 'Resolve'
    return {
      id,
      topic,
      data,
      date,
      title,
      description,
      ctaText: ctaText || ctaFallback,
      isActionable,
      isDismissible,
      hidden: hide || isComplete,
      isRead: false,
      onClick: () => {},
      formatted: true,
    }
  })
}

// FETCH NOTIFICATIONS
export const fetchNotifications = async ({ artistId, userId, organizationIds }) => {
  const { res: notifications, error } = await appServer.getAllNotifications({ artistId, organizationIds, userId })
  if (error) return { error }
  console.log('server notifications', notifications)
  return { res: { notifications } }
}
