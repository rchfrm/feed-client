import React from 'react'
import PropTypes from 'prop-types'

import useNotificationStore from '@/app/store/notificationsStore'

import NotificationItem from '@/app/NotificationItem'

const getNotifications = state => state.notifications

const NotificationsList = ({ className }) => {
  const notifications = useNotificationStore(getNotifications)
  return (
    <div
      className={[
        'breakout--width',
        'md:pr-5',
        className,
      ].join(' ')}
    >
      {notifications.map((notification) => {
        const { id } = notification
        return <NotificationItem key={id} notification={notification} />
      })}
    </div>
  )
}

NotificationsList.propTypes = {
  className: PropTypes.string,
}

NotificationsList.defaultProps = {
  className: null,
}


export default NotificationsList
