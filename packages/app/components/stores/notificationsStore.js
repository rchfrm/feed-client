import create from 'zustand'
import produce from 'immer'

import { track } from '@/app/helpers/trackingHelpers'

import globalData from '@/app/tempGlobalData/globalData.json'

import {
  fetchNotifications,
  formatNotifications,
  markAsReadOnServer,
  dismissOnServer,
  formatDictionary,
} from '@/app/helpers/notificationsHelpers'

// GET FORMATTED DICTIONARY
const { allNotifications } = globalData
const dictionaryFormatted = formatDictionary(allNotifications)

const initialState = {
  artistId: '',
  userId: '',
  organizationIds: [],
  hasFbAuth: false,
  missingScopes: [],
  loading: true,
  notifications: [],
  totalActiveNotifications: 0,
  openedNotification: null,
  openedNotificationId: '',
  artistsWithNotifications: [],
  notificationsError: null,
  notificationDictionary: dictionaryFormatted,
}

// COUNT ACTIVE NOTIFICATIONS
// Active notifications are either:
// - Not hidden
// - Unread, or
// - Non-dismissible and incomplete
const countActiveNotifications = (notifications) => {
  return notifications.reduce((total, { hidden, isRead, isDismissible, isComplete }) => {
    if (hidden) return total
    if (!isRead) return total + 1
    if (!isDismissible && !isComplete) return total + 1
    return total
  }, 0)
}

const updateActiveNotificationsCount = (set) => (notifications) => {
  const totalActiveNotifications = countActiveNotifications(notifications)
  set({ totalActiveNotifications })
}

// RUN FORMAT NOTIFICATIONS
const runFormatNotifications = (set) => (notifications, dictionary) => {
  const notificationsFormatted = formatNotifications(notifications, dictionary || {})
  set({ notifications: notificationsFormatted })
}

// FETCH NOTIFICATIONS (called whenever artist mounts)
const fetchAndSetNotifications = (set, get) => async ({ artistId, userId, organizationIds, hasFbAuth, missingScopes }) => {
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
  const { notifications: notificationsRaw } = res
  // Format notifications
  const { notificationDictionary } = get()
  const notificationsFormatted = formatNotifications({
    notificationsRaw,
    dictionary: notificationDictionary || {},
    hasFbAuth,
    missingScopes,
  })
  // GET TOTAL ACTIVE NOTIFICATIONS
  const totalActiveNotifications = countActiveNotifications(notificationsFormatted)
  // SET
  set({
    artistId,
    userId,
    hasFbAuth,
    missingScopes,
    notifications: notificationsFormatted,
    totalActiveNotifications,
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
  const { notifications, openedNotificationId } = get()
  const notificationIndex = notifications.findIndex(({ id }) => id === notificationId)
  const notificationsUpdated = produce(notifications, draftNotifications => {
    if (notificationIndex === -1) return
    draftNotifications[notificationIndex][prop] = value
  })
  set({ notifications: notificationsUpdated })
  // Update opened notification (if necessary)
  if ((notificationId === openedNotificationId) && (notificationIndex > -1)) {
    const notificationUpdated = notificationsUpdated[notificationIndex]
    set({ openedNotification: notificationUpdated })
  }
  return notificationsUpdated
}

// SET NOTIFICATION AS OPEN
const setAsOpen = (set, get) => (notificationId, entityType, entityId) => {
  const { setAsRead, notifications } = get()
  const openedNotification = notifications.find(({ id }) => id === notificationId)
  const {
    id: openedNotificationId,
    isRead,
    isActionable,
    isDimissable,
    title,
    topic,
  } = openedNotification
  set({ openedNotification, openedNotificationId })
  // Set notification as read (in store)
  if (!isRead) {
    setAsRead(notificationId, entityType, entityId)
    track('notification_marked_read', {
      title,
      topic,
      isActionable,
      isDimissable,
    })
  }
}

// SET NOTIFICATION AS CLOSED
const closeNotification = (set) => () => {
  set({ openedNotification: null, openedNotificationId: null })
}

// SET NOTIFICATION AS READ
const setAsRead = (set, get) => (notificationId, entityType, entityId) => {
  const notificationsUpdated = updateNotification(set, get)(notificationId, 'isRead', true)
  // Update active notifications
  updateActiveNotificationsCount(set)(notificationsUpdated)
  // Set as read on server
  markAsReadOnServer(notificationId, entityType, entityId)
}

// SET NOTIFICATION AS DISMISSED
const setAsDismissed = (set, get) => (notificationId, entityType, entityId, isActionable) => {
  const { openedNotificationId, notifications } = get()
  const openedNotification = notifications.find(({ id }) => id === notificationId)
  const { title, topic } = openedNotification
  // Hide notification
  const notificationsUpdated = updateNotification(set, get)(notificationId, 'hidden', true)
  // Update active notifications
  updateActiveNotificationsCount(set)(notificationsUpdated)
  // Track
  track('notification_dismissed', {
    title,
    topic,
    isActionable,
  })
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
  const notificationsUpdated = updateNotification(set, get)(notificationId, 'isComplete', true)
  // Update active notifications
  updateActiveNotificationsCount(set)(notificationsUpdated)
}

// EXPORT
const useNotificationsStore = create((set, get) => ({
  // STATE
  artistId: initialState.artistId,
  userId: initialState.userId,
  organizationIds: initialState.organizationIds,
  loading: initialState.loading,
  notifications: initialState.notifications,
  totalActiveNotifications: initialState.totalActiveNotifications,
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
  closeNotification: () => closeNotification(set, get)(),
  completeNotification: (id) => setAsComplete(set, get)(id),
  clear: () => set(initialState),
}))

export default useNotificationsStore
