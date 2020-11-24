import React from 'react'
import PropTypes from 'prop-types'

import useNotificationStore from '@/app/store/notificationsStore'

import MarkdownText from '@/elements/MarkdownText'
import NotificationItem from '@/app/NotificationItem'

import copy from '@/app/copy/notificationsCopy'

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
      {!notifications.length ? (
        // No notifications
        <MarkdownText
          className={[
            'px-8',
            'md:px-6',
          ].join(' ')}
          markdown={copy.noNotificationsCopy}
        />
      )
        // List of notifications
        : notifications.map((notification) => {
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
