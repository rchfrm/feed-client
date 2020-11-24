import moment from 'moment'

import * as appServer from '@/app/helpers/appServer'

export const dummyNotificationsResponse = {
  notifications: [
    {
      id: 1,
      title: 'No shoes',
      description: 'You can\'t leave the house without shoes',
      action: null,
      read: false,
    },
    {
      id: 2,
      title: 'Click required',
      description: 'Please click the button when you get a chance.',
      action: 'click',
      read: false,
    },
    {
      id: 3,
      title: 'Old news baby',
      description: 'Yes, Helen, you might be my daughter-in-law. God shield you mean it not! daughter and mother So strive upon your pulse. What! pale again? My fear hath catch\'d your fondness.',
      action: 'click',
      read: true,
    },
  ],
  artistIds: [
    {
      id: '0mpyUFo2OApQnawtH6cB', // Feed
    },
    {
      id: 'AV2mykNXaD0IH7Pi0x0q', // Fat posstum
    },
    {
      id: 'xEFh1DcHLu7UoqZFe6qV', // Acid Reign
    },
  ],
}


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
    console.log('date', date)
    return {
      id,
      date,
      title: 'a',
    }
  })
}

// FETCH NOTIFICATIONS
export const fetchNotifications = async ({ artistId, organizationId, userId }) => {
  const { res: notificationsRaw, error } = await appServer.getAllNotifications({ artistId, organizationId, userId })
  if (error) return { error }
  console.log('server notifications', notificationsRaw)
  // Format notifications
  const notifications = formatNotifications(notificationsRaw)
  return { res: { notifications } }
}
