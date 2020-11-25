import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import NotificationsLoader from '@/app/NotificationsLoader'
import NotificationsList from '@/app/NotificationsList'
import NotificationCurrentInfo from '@/app/NotificationCurrentInfo'

import useNotificationStore from '@/app/store/notificationsStore'

const getNotificationsStoreState = (state) => ({
  notificationsError: state.notificationsError,
  setDictionary: state.setDictionary,
  loading: state.loading,
  closeNotification: state.closeNotification,
})

const NotificationsContent = ({
  notificationsDictionary,
}) => {
  const containerRef = React.useRef(null)

  // Read from store
  const {
    notificationsError,
    setDictionary,
    loading,
    closeNotification,
  } = useNotificationStore(getNotificationsStoreState, shallow)

  // Set dictionary in store
  React.useEffect(() => {
    setDictionary(notificationsDictionary)
  }, [notificationsDictionary, setDictionary])

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
      <NotificationsList />
      <NotificationCurrentInfo containerRef={containerRef} />
    </div>
  )
}

NotificationsLoader.propTypes = {
  notificationsDictionary: PropTypes.object.isRequired,
}

export default NotificationsContent
