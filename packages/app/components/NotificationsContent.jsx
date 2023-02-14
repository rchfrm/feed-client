import React from 'react'
// import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import NotificationsList from '@/app/NotificationsList'
import NotificationCurrentInfo from '@/app/NotificationCurrentInfo'

import useNotificationStore from '@/app/stores/notificationsStore'

import { parseUrl } from '@/helpers/utils'

const getNotificationsStoreState = (state) => ({
  notifications: state.notifications,
  notificationsError: state.notificationsError,
  isNotificationsLoading: state.isNotificationsLoading,
  closeNotification: state.closeNotification,
  setAsOpen: state.setAsOpen,
})

const NotificationsContent = () => {
  const containerRef = React.useRef(null)

  // Read from store
  const {
    notifications,
    notificationsError,
    isNotificationsLoading,
    closeNotification,
    setAsOpen,
  } = useNotificationStore(getNotificationsStoreState, shallow)

  // PARSE PAGE QUERY
  const { asPath: urlString } = useRouter()
  const [initialNotificationId, setInitialNotificationId] = React.useState('')
  React.useEffect(() => {
    const { query } = parseUrl(urlString)
    const id = query?.id
    if (! id) return
    setInitialNotificationId(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // OPEN INITIAL NOTIFICATION
  React.useEffect(() => {
    // Stop here if no ID in URL
    if (! initialNotificationId || isNotificationsLoading) return
    const initialNotification = notifications.find(({ id }) => id === initialNotificationId)
    // Stop here if no initial notification
    if (! initialNotification) return
    const { id, entityType, entityId } = initialNotification
    setAsOpen(id, entityType, entityId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotificationsLoading])

  // Close open notification on unmount
  React.useEffect(() => {
    return closeNotification
  }, [closeNotification])

  if (isNotificationsLoading) {
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
        hasError={!! notificationsError}
      />
      <NotificationCurrentInfo containerRef={containerRef} />
    </div>
  )
}

NotificationsContent.propTypes = {

}

export default NotificationsContent
