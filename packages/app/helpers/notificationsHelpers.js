import moment from 'moment'

import * as appServer from '@/app/helpers/appServer'

// * DICTIONARY
// ------------

// Convert dictionary into object keyed by error code
export const formatDictionary = (dictionaryArray = []) => {
  return dictionaryArray.reduce((dictionary, entry) => {
    const {
      code,
      subcode,
    } = entry
    // Handle duplicate
    if (dictionary[code] && !subcode) {
      console.error('duplicate error code: ', code)
      return dictionary
    }
    // Add subcode entry to already handled code
    if (dictionary[code]) {
      dictionary[code][subcode] = { ...entry }
      return dictionary
    }
    // Add subcode entry to new code
    if (subcode) {
      dictionary[code] = {
        [subcode]: { ...entry },
      }
      return dictionary
    }
    // Add code without subcode
    dictionary[code] = { ...entry }
    return dictionary
  }, {})
}

// * FETCHING FROM SERVER
// -----------------------

// FORMAT NOTIFICATIONS
const formatNotifications = (notificationsRaw) => {
  return notificationsRaw.map(({
    id,
    created_at,
    actioned_at,
    is_dismissible,
    is_actionable,
    is_complete,
    topic,
  }) => {
    const date = moment(created_at).format('MM MMM')
    return {
      id,
      date,
      title: 'a',
    }
  })
}

// FETCH NOTIFICATIONS
export const fetchNotifications = async ({ artistId, userId, organizationIds }) => {
  const { res: notificationsRaw, error } = await appServer.getAllNotifications({ artistId, organizationIds, userId })
  if (error) return { error }
  console.log('server notifications', notificationsRaw)
  // Format notifications
  const notifications = formatNotifications(notificationsRaw)
  return { res: { notifications } }
}
