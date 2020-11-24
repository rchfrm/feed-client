import React from 'react'

import Error from '@/elements/Error'

import NotificationsLoader from '@/app/NotificationsLoader'
import NotificationsList from '@/app/NotificationsList'
import NotificationCurrentInfo from '@/app/NotificationCurrentInfo'

import useNotificationStore from '@/app/store/notificationsStore'

const getNotificationsError = state => state.notificationsError

const NotificationsContent = () => {
  const containerRef = React.useRef(null)
  const notificationsError = useNotificationStore(getNotificationsError)
  return (
    <div ref={containerRef} className="relative">
      <Error error={notificationsError} />
      <NotificationsList />
      <NotificationCurrentInfo containerRef={containerRef} />
    </div>
  )
}

export default NotificationsContent
