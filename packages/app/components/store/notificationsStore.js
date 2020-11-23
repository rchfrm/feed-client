import create from 'zustand'
import produce from 'immer'

import { fetchNotifications } from '@/app/helpers/notificationsHelpers'

const initialState = {
  artistId: '',
  notificationsNew: [],
  notificationsOld: [],
  artistsWithNotifications: [],
}

// FETCH NOTIFICATIONS (called whenever artist mounts)
const fetchAndSetNotifications = (set, get) => async (artistId) => {
  // If requesting for the same artist, just return data from store
  if (artistId === get().artistId) {
    return {
      notificationsNew: get().notificationsNew,
      notificationsOld: get().notificationsOld,
    }
  }
  // Else fetch notifications from server
  const { res, error } = await fetchNotifications(artistId)
  // Stop here if error
  if (error) return
  const { notifications, artistIds } = res
  // Split notifications into old and new
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
  // Get array of artist IDs with notifications
  const artistsWithNotifications = artistIds.map(({ id }) => id)
  // SET
  set({ notificationsNew, notificationsOld, artistsWithNotifications, artistId })
  // RETURN
  return { notificationsNew, notificationsOld }
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
const useNotificationsStore = create((set, get) => ({
  // STATE
  artistId: initialState.artistId,
  notificationsNew: initialState.notificationsNew,
  notificationsOld: initialState.notificationsOld,
  artistsWithNotifications: initialState.artistsWithNotifications,
  // GETTERS
  fetchAndSetNotifications: fetchAndSetNotifications(set, get),
  // SETTERS
  setAsRead: (id) => updateNotification(set, get)(id, 'read', true),
  clear: () => set(initialState),
}))

export default useNotificationsStore
