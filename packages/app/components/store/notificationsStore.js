import create from 'zustand'
import produce from 'immer'

import { fetchNotifications } from '@/app/helpers/notificationsHelpers'

const initialState = {
  artistId: '',
  notifications: [],
  totalUnreadNotifications: 0,
  openNotification: null,
  artistsWithNotifications: [],
}

// COUNT UNREAD NOTIFICATIONS
const countUnreadNotifications = (notifications) => {
  return notifications.reduce((total, { read }) => {
    if (read) return total
    return total + 1
  }, 0)
}

// FETCH NOTIFICATIONS (called whenever artist mounts)
const fetchAndSetNotifications = (set, get) => async (artistId) => {
  // If requesting for the same artist, just return data from store
  if (artistId === get().artistId) {
    return {
      notifications: get().notifications,
    }
  }
  // Else fetch notifications from server
  const { res, error } = await fetchNotifications(artistId)
  // Stop here if error
  if (error) return
  const { notifications, artistIds } = res
  // Get array of artist IDs with notifications
  const artistsWithNotifications = artistIds.map(({ id }) => id)
  // GET TOTAL UNREAD NOTIFICATIONS
  const totalUnreadNotifications = countUnreadNotifications(notifications)
  // SET
  set({
    artistId,
    notifications,
    totalUnreadNotifications,
    artistsWithNotifications,
  })
  // RETURN
  return { notifications }
}


// UPDATE A PROP ON A NOTIFICATION
const updateNotification = (set, get) => (notificationId, prop, value) => {
  const { notifications } = get()
  const notificationsUpdated = produce(notifications, draftNotifications => {
    const notificationIndex = draftNotifications.findIndex(({ id }) => id === notificationId)
    if (notificationIndex === -1) return
    draftNotifications[notificationIndex][prop] = value
  })
  set({ notifications: notificationsUpdated })
  return notificationsUpdated
}

// SET NOTIFICATION AS ACTIVE
const setAsOpen = (set, get) => (notificationId) => {
  const { setAsRead, notifications } = get()
  const openNotification = notifications.find(({ id }) => id === notificationId)
  set({ openNotification })
  // Set notification as read
  setAsRead(notificationId)
}

// SET NOTIFICATION AS READ
const setAsRead = (set, get) => (notificationId) => {
  const notificationsUpdated = updateNotification(set, get)(notificationId, 'read', true)
  const totalNotificationsUnread = countUnreadNotifications(notificationsUpdated)
  set({ totalNotificationsUnread })
}

// EXPORT
const useNotificationsStore = create((set, get) => ({
  // STATE
  artistId: initialState.artistId,
  notifications: initialState.notifications,
  totalUnreadNotifications: initialState.totalUnreadNotifications,
  openNotification: initialState.openNotification,
  artistsWithNotifications: initialState.artistsWithNotifications,
  // GETTERS
  fetchAndSetNotifications: fetchAndSetNotifications(set, get),
  // SETTERS
  setAsRead: (id) => setAsRead(set, get)(id),
  setAsOpen: (id) => setAsOpen(set, get)(id),
  clear: () => set(initialState),
}))

export default useNotificationsStore
