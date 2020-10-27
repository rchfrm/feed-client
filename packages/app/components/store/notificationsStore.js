import create from 'zustand'
import produce from 'immer'

const initialState = {
  notificationsNew: [],
  notificationsOld: [],
  artistsWithNotifications: [],
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
  // SETTERS
  setAsRead: (id) => updateNotification(set, get)(id, 'read', true),
  clear: () => set(initialState),
}))

export default alertStore
