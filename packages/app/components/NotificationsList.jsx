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
  openedNotification: state.openedNotification,
  openedNotificationId: state.openedNotificationId,
  setAsOpen: state.setAsOpen,
  setAsDismissed: state.setAsDismissed,
  closeNotification: state.closeNotification,
})

const NotificationsList = ({ notifications, className }) => {
  const {
    openedNotification,
    openedNotificationId,
    setAsOpen,
    setAsDismissed,
    closeNotification,
  } = useNotificationStore(readNotificationsStore, shallow)

  // NAVIGATE UP AND DOWN
  const navigateNotification = React.useCallback(({ key }) => {
    if (!openedNotificationId) return
    const direction = key === 'ArrowDown' ? 'down' : 'up'
    const openedNotificationIndex = notifications.findIndex(({ id }) => id === openedNotificationId)
    const atStart = openedNotificationIndex === 0
    const atEnd = openedNotificationIndex === notifications.length - 1
    // Stop here if at end
    if ((direction === 'up' && atStart) || (direction === 'down' && atEnd)) return
    // Open next not
    const navToIndex = direction === 'up' ? openedNotificationIndex - 1 : openedNotificationIndex + 1
    const nextNotification = notifications[navToIndex]
    const { id, entityType, entityId } = nextNotification
    setAsOpen(id, entityType, entityId)
  }, [openedNotificationId, notifications, setAsOpen])

  // DISMISS NOTIFICATION
  const dismissNotification = React.useCallback(() => {
    const { id, entityType, entityId, isActionable, isComplete } = openedNotification
    // Do nothing if actionable and not complete
    if (isActionable || !isComplete) return
    // Dismiss
    setAsDismissed(id, entityType, entityId, isActionable)
  }, [openedNotification, setAsDismissed])

  // SETUP KEYBOARD CONTROLS
  const isDesktopLayout = useBreakpointTest('md')
  React.useEffect(() => {
    if (!isDesktopLayout) {
      Mousetrap.unbind('up')
      Mousetrap.unbind('down')
      Mousetrap.unbind('backspace')
      return
    }
    Mousetrap.bind('up', navigateNotification)
    Mousetrap.bind('down', navigateNotification)
    Mousetrap.bind('esc', closeNotification)
    Mousetrap.bind('backspace', dismissNotification)
    return () => {
      Mousetrap.unbind('up')
      Mousetrap.unbind('down')
      Mousetrap.unbind('esc')
    }
  }, [navigateNotification, isDesktopLayout, closeNotification, dismissNotification])

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
          const { id, hidden } = notification
          if (hidden) return null
          return <NotificationItem key={id} notification={notification} />
        })}
    </div>
  )
}

NotificationsList.propTypes = {
  notifications: PropTypes.array.isRequired,
  className: PropTypes.string,
}

NotificationsList.defaultProps = {
  className: null,
}


export default NotificationsList
