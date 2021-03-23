import React from 'react'
import PropTypes from 'prop-types'

import Mousetrap from 'mousetrap'
import shallow from 'zustand/shallow'

import useNotificationStore from '@/app/stores/notificationsStore'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useDismissNotification from '@/app/hooks/useDismissNotification'

import MarkdownText from '@/elements/MarkdownText'
import NotificationItem from '@/app/NotificationItem'

import copy from '@/app/copy/notificationsCopy'

const readNotificationsStore = (state) => ({
  openedNotification: state.openedNotification,
  openedNotificationId: state.openedNotificationId,
  setAsOpen: state.setAsOpen,
  closeNotification: state.closeNotification,
})

const NotificationsList = ({ notifications, hasError, className }) => {
  const {
    openedNotification,
    openedNotificationId,
    setAsOpen,
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

  // GET DISMISS FUNCTION
  const dismissNotification = useDismissNotification(openedNotification)

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

  const visibleNotifications = React.useMemo(() => {
    return notifications.filter(({ hidden }) => !hidden)
  }, [notifications])

  return (
    <div
      className={[
        visibleNotifications.length ? 'breakout--width md:pr-5' : null,
        className,
      ].join(' ')}
    >
      {!visibleNotifications.length && !hasError ? (
        // No notifications
        <MarkdownText markdown={copy.noNotificationsCopy} />
      )
        // List of notifications
        : visibleNotifications.map((notification) => {
          const { id, hidden } = notification
          if (hidden) return null
          return <NotificationItem key={id} notification={notification} />
        })}
    </div>
  )
}

NotificationsList.propTypes = {
  hasError: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  className: PropTypes.string,
}

NotificationsList.defaultProps = {
  className: null,
}


export default NotificationsList
