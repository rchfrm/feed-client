import create from 'zustand'
import produce from 'immer'

import { fetchNotifications } from '@/app/helpers/notificationsHelpers'

const initialState = {
  notificationsNew: [],
  notificationsOld: [],
  artistsWithNotifications: [],
}

// FETCH NOTIFICATIONS (called whenever artist mounts)
const getNotifications = (set) => async (artistId) => {
  const notifications = await fetchNotifications(artistId)
  const { notificationsNew, notificationsOld } = notifications.reduce((notificationsObj, notification) => {
    const { read } = notification
    return produce(notificationsObj, draftState => {
      if (read) {
        draftState.notificationsOld.push(notification)
      } else {
        draftState.notificationsNew.push(notification)
      }
    })
  }, {
    notificationsNew: [],
    notificationsOld: [],
  })
  set({ notificationsNew, notificationsOld })
}

// UPDATE A PROP ON A NOTIFICATION
const updateNotification = (set, get) => (notificationId, prop, value) => {
  const notifications = get().notificationsNew
  const notificationsUpdated = produce(notifications, draftNotifications => {
    return draftNotifications.map((notification) => {
      if (notification.id === notificationId) {
        notification[prop] = value
      }
      return notification
    })
  })
  set({ notificationsNew: notificationsUpdated })
}

// EXPORT
const [alertStore] = create((set, get) => ({
  // STATE
  notificationsNew: initialState.notificationsNew,
  notificationsOld: initialState.notificationsOld,
  artistsWithNotifications: initialState.artistsWithNotifications,
  // GETTERS
  getNotifications: getNotifications(set, get),
  // SETTERS
  setAsRead: (id) => updateNotification(set, get)(id, 'read', true),
  clear: () => set(initialState),
}))

export default alertStore
