import React from 'react'
import PropTypes from 'prop-types'

import Mousetrap from 'mousetrap'
import shallow from 'zustand/shallow'

import useNotificationStore from '@/app/store/notificationsStore'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import MarkdownText from '@/elements/MarkdownText'
import NotificationItem from '@/app/NotificationItem'

import copy from '@/app/copy/notificationsCopy'

const readNotificationsStore = (state) => ({
  notifications: state.notifications,
  openNotificationId: state.openNotificationId,
  setAsOpen: state.setAsOpen,
  closeNotification: state.closeNotification,
})

const NotificationsList = ({ className }) => {
  const {
    notifications,
    openNotificationId,
    setAsOpen,
    closeNotification,
  } = useNotificationStore(readNotificationsStore, shallow)

  // NAVIGATE UP AND DOWN
  const navigateNotification = React.useCallback(({ key }) => {
    if (!openNotificationId) return
    const direction = key === 'ArrowDown' ? 'down' : 'up'
    const openNotificationIndex = notifications.findIndex(({ id }) => id === openNotificationId)
    const atStart = openNotificationIndex === 0
    const atEnd = openNotificationIndex === notifications.length - 1
    // Stop here if at end
    if ((direction === 'up' && atStart) || (direction === 'down' && atEnd)) return
    // Open next not
    const navToIndex = direction === 'up' ? openNotificationIndex - 1 : openNotificationIndex + 1
    const nextNotification = notifications[navToIndex]
    setAsOpen(nextNotification.id)
  }, [openNotificationId, notifications, setAsOpen])

  // SETUP KEYBOARD CONTROLS
  const isDesktopLayout = useBreakpointTest('md')
  React.useEffect(() => {
    if (!isDesktopLayout) {
      Mousetrap.unbind('up')
      Mousetrap.unbind('down')
      return
    }
    Mousetrap.bind('up', navigateNotification)
    Mousetrap.bind('down', navigateNotification)
    Mousetrap.bind('esc', closeNotification)
    return () => {
      Mousetrap.unbind('up')
      Mousetrap.unbind('down')
      Mousetrap.unbind('esc')
    }
  }, [navigateNotification, isDesktopLayout, closeNotification])

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
