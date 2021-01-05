import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import NotificationsList from '@/app/NotificationsList'
import NotificationCurrentInfo from '@/app/NotificationCurrentInfo'

import useNotificationStore from '@/app/store/notificationsStore'

const getNotificationsStoreState = (state) => ({
  notifications: state.notifications,
  notificationsError: state.notificationsError,
  setDictionary: state.setDictionary,
  loading: state.loading,
  closeNotification: state.closeNotification,
  runFormatNotifications: state.runFormatNotifications,
})

const NotificationsContent = ({
  notificationsDictionary,
}) => {
  const containerRef = React.useRef(null)

  // Read from store
  const {
    notifications,
    notificationsError,
    setDictionary,
    loading,
    closeNotification,
    runFormatNotifications,
  } = useNotificationStore(getNotificationsStoreState, shallow)

  // Set dictionary in store
  React.useEffect(() => {
    setDictionary(notificationsDictionary)
    runFormatNotifications(notifications, notificationsDictionary)
  // eslint-disable-next-line
  }, [notificationsDictionary, notifications.length])

  // Close open notification on unmount
  React.useEffect(() => {
    return closeNotification
  }, [closeNotification])

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <Error error={notificationsError} />
      <NotificationsList
        notifications={notifications}
        hasError={!!notificationsError}
      />
      <NotificationCurrentInfo containerRef={containerRef} />
    </div>
  )
}

NotificationsContent.propTypes = {
  notificationsDictionary: PropTypes.object.isRequired,
}

export default NotificationsContent
