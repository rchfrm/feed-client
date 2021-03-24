import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import NotificationsList from '@/app/NotificationsList'
import NotificationCurrentInfo from '@/app/NotificationCurrentInfo'

import useNotificationStore from '@/app/stores/notificationsStore'

const getNotificationsStoreState = (state) => ({
  notifications: state.notifications,
  notificationsError: state.notificationsError,
  loading: state.loading,
  closeNotification: state.closeNotification,
})

const NotificationsContent = () => {
  const containerRef = React.useRef(null)

  // Read from store
  const {
    notifications,
    notificationsError,
    loading,
    closeNotification,
  } = useNotificationStore(getNotificationsStoreState, shallow)

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

}

export default NotificationsContent
