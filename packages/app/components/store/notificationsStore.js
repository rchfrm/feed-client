import create from 'zustand'
import produce from 'immer'

import {
  fetchNotifications,
  formatNotifications,
  markAsReadOnServer,
  dismissOnServer,
} from '@/app/helpers/notificationsHelpers'

const initialState = {
  artistId: '',
  userId: '',
  organizationIds: [],
  loading: true,
  notifications: [],
  totalUnreadNotifications: 0,
  openedNotification: null,
  openedNotificationId: '',
  artistsWithNotifications: [],
  notificationsError: null,
  notificationDictionary: null,
}

// COUNT UNREAD NOTIFICATIONS
const countUnreadNotifications = (notifications) => {
  return notifications.reduce((total, { isRead }) => {
    if (isRead) return total
    return total + 1
  }, 0)
}

// RUN FORMAT NOTIFICATIONS
const runFormatNotifications = (set) => (notifications, dictionary) => {
  const notificationsFormatted = formatNotifications(notifications, dictionary || {})
  // SET
  set({
    notifications: notificationsFormatted,
  })
}

// FETCH NOTIFICATIONS (called whenever artist mounts)
const fetchAndSetNotifications = (set, get) => async ({ artistId, userId, organizationIds }) => {
  set({ loading: true })
  // Else fetch notifications from server
  const { res, error } = await fetchNotifications({ artistId, userId, organizationIds })
  // Stop here if error
  if (error) {
    const notificationsError = {
      message: `Failed to load notifications: ${error.message}`,
    }
    set({ notificationsError, loading: false })
    return
  }
  const { notifications } = res
  // Format notifications
  const { notificationDictionary } = get()
  console.log('notificationDictionary', notificationDictionary)
  const notificationsFormatted = formatNotifications(notifications, notificationDictionary || {})
  console.log('FORMATTED notifications', notificationsFormatted)
  // GET TOTAL UNREAD NOTIFICATIONS
  const totalUnreadNotifications = countUnreadNotifications(notifications)
  // SET
  set({
    artistId,
    userId,
    notifications: notificationsFormatted,
    totalUnreadNotifications,
    notificationsError: null,
    loading: false,
  })
  // RETURN
  return { notifications }
}

// SET OTHER USER ARTISTS with notifications
const setArtistsWithNotifications = (set) => (userArtists) => {
  // Get array of artist IDs with notifcations
  const artistIds = userArtists.reduce((ids, { id, notification_count }) => {
    if (!notification_count) return ids
    return [...ids, id]
  }, [])
  // Set state
  set({ artistsWithNotifications: artistIds })
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
const setAsOpen = (set, get) => (notificationId, entityType, entityId) => {
  const { setAsRead, notifications } = get()
  const openedNotification = notifications.find(({ id }) => id === notificationId)
  const { id: openedNotificationId, isRead } = openedNotification
  set({ openedNotification, openedNotificationId })
  // Set notification as read (in store)
  if (!isRead) {
    setAsRead(notificationId, entityType, entityId)
  }
}

// SET NOTIFICATION AS CLOSED
const closeNotification = (set) => () => {
  set({ openedNotification: null, openedNotificationId: null })
}

// SET NOTIFICATION AS READ
const setAsRead = (set, get) => (notificationId, entityType, entityId) => {
  const notificationsUpdated = updateNotification(set, get)(notificationId, 'isRead', true)
  const totalNotificationsUnread = countUnreadNotifications(notificationsUpdated)
  set({ totalNotificationsUnread })
  // Set as read on server
  markAsReadOnServer(notificationId, entityType, entityId)
}

// SET NOTIFICATION AS DISMISSED
const setAsDismissed = (set, get) => (notificationId, entityType, entityId, isActionable) => {
  const { openedNotificationId } = get()
  // Hide notification
  updateNotification(set, get)(notificationId, 'hidden', true)
  // Close notification (if currently open)
  if (notificationId === openedNotificationId) {
    closeNotification(set)()
  }
  // Set as dismissed on server (if not actionable)
  if (!isActionable) {
    dismissOnServer(notificationId, entityType, entityId)
  }
}

// SET NOTIFICATION AS COMPLETE
const setAsComplete = (set, get) => (notificationId) => {
  updateNotification(set, get)(notificationId, 'isComplete', true)
}

// EXPORT
const useNotificationsStore = create((set, get) => ({
  // STATE
  artistId: initialState.artistId,
  userId: initialState.userId,
  organizationIds: initialState.organizationIds,
  loading: initialState.loading,
  notifications: initialState.notifications,
  totalUnreadNotifications: initialState.totalUnreadNotifications,
  openedNotification: initialState.openedNotification,
  openedNotificationId: initialState.openedNotificationId,
  artistsWithNotifications: initialState.artistsWithNotifications,
  notificationsError: initialState.notificationsError,
  notificationDictionary: initialState.notificationDictionary,
  // GETTERS
  fetchAndSetNotifications: fetchAndSetNotifications(set, get),
  setArtistsWithNotifications: (userArtists = []) => setArtistsWithNotifications(set)(userArtists),
  // SETTERS
  runFormatNotifications: (notifications, dictionary) => runFormatNotifications(set, get)(notifications, dictionary),
  setAsRead: (id, entityType, entityId) => setAsRead(set, get)(id, entityType, entityId),
  setAsOpen: (id, entityType, entityId) => setAsOpen(set, get)(id, entityType, entityId),
  setAsDismissed: (id, entityType, entityId, isActionable) => setAsDismissed(set, get)(id, entityType, entityId, isActionable),
  setDictionary: (notificationDictionary) => set({ notificationDictionary }),
  closeNotification: () => closeNotification(set, get)(),
  completeNotification: (id) => setAsComplete(set, get)(id),
  clear: () => set(initialState),
}))

export default useNotificationsStore
