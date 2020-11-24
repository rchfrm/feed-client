import create from 'zustand'
import produce from 'immer'

import { fetchNotifications } from '@/app/helpers/notificationsHelpers'

const initialState = {
  artistId: '',
  userId: '',
  notifications: [],
  totalUnreadNotifications: 0,
  openNotification: null,
  openNotificationId: '',
  artistsWithNotifications: [],
  notificationsError: null,
}

// COUNT UNREAD NOTIFICATIONS
const countUnreadNotifications = (notifications) => {
  return notifications.reduce((total, { read }) => {
    if (read) return total
    return total + 1
  }, 0)
}

// FETCH NOTIFICATIONS (called whenever artist mounts)
const fetchAndSetNotifications = (set) => async ({ artistId, userId }) => {
  // Else fetch notifications from server
  const { res, error } = await fetchNotifications({ artistId, userId })
  // Stop here if error
  if (error) {
    const notificationsError = {
      message: `Failed to load notifications: ${error.message}`,
    }
    set({ notificationsError })
    return
  }
  const { notifications, artistIds = [] } = res
  console.log('FORMATTED notifications', notifications)
  // Get array of artist IDs with notifications
  const artistsWithNotifications = artistIds.map(({ id }) => id)
  // GET TOTAL UNREAD NOTIFICATIONS
  const totalUnreadNotifications = countUnreadNotifications(notifications)
  // SET
  set({
    artistId,
    userId,
    notifications,
    totalUnreadNotifications,
    artistsWithNotifications,
    notificationsError: null,
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

// SET NOTIFICATION AS OPEN
const setAsOpen = (set, get) => (notificationId) => {
  const { setAsRead, notifications } = get()
  const openNotification = notifications.find(({ id }) => id === notificationId)
  const { id: openNotificationId } = openNotification
  set({ openNotification, openNotificationId })
  // Set notification as read
  setAsRead(notificationId)
}

// SET NOTIFICATION AS CLOSED
const closeNotification = (set) => () => {
  set({ openNotification: null, openNotificationId: null })
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
  userId: initialState.userId,
  notifications: initialState.notifications,
  totalUnreadNotifications: initialState.totalUnreadNotifications,
  openNotification: initialState.openNotification,
  openNotificationId: initialState.openNotificationId,
  artistsWithNotifications: initialState.artistsWithNotifications,
  notificationsError: initialState.notificationsError,
  // GETTERS
  fetchAndSetNotifications: fetchAndSetNotifications(set, get),
  // SETTERS
  setAsRead: (id) => setAsRead(set, get)(id),
  setAsOpen: (id) => setAsOpen(set, get)(id),
  closeNotification: () => closeNotification(set, get)(),
  clear: () => set(initialState),
}))

export default useNotificationsStore
