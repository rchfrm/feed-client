// IMPORT PACKAGES
import React from 'react'

// IMPORT ASSETS
import ThreeDotsIcon from '../icons/ThreeDots'
// IMPORT COMPONENTS
// IMPORT CONSTANTS
import brandColors from '../../constants/brandColors'
import NotificationContent from '../NotificationContent'
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { NotificationsContext } from '../contexts/Notifications'
// IMPORT ELEMENTS
import Button from '../elements/Button'
import Nothing from '../elements/Nothing'
import PageHeader from '../PageHeader'
import Spinner from '../elements/Spinner'
// IMPORT HELPERS
// IMPORT PAGES
// IMPORT STYLES
import styles from '../NotificationsPage.module.css'

function NotificationsPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  const { loading: notificationsLoading } = React.useContext(NotificationsContext)

  if (notificationsLoading) {
    return <Spinner width={50} color={brandColors.green} />
  }
  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="Notifications" />

      <Notifications />

    </div>
  )
}

export default NotificationsPage

function Notifications() {
  const { notifications = {} } = React.useContext(NotificationsContext)
  const notificationKeys = Object.keys(notifications)
  if (!notificationKeys.length) {
    return (
      <NoNotifications />
    )
  }
  // Turn notifications into list
  const notificationsList = []
  notificationKeys.forEach(id => {
    const notification = notifications[id]
    // Only display 'incomplete' notifications
    if (!notification.is_complete) {
      notificationsList.push(
        <Notification key={id} notification={notification} />,
      )
    }
  })

  return (
    <ul className={styles['notifications-list']}>
      {notificationsList}
    </ul>
  )
}

const NoNotifications = () => {
  return (
    <p className={styles.noNotifactions}>You have no notifications</p>
  )
}

function Notification(props) {
// REDEFINE PROPS AS VARIABLES
  const { notification } = props
  const { topic } = notification
  const content = NotificationContent[topic]
  // END REDEFINE PROPS AS VARIABLES

  return (
    <li key={notification.id}>

      <div className={styles['read-border']} style={{ backgroundColor: brandColors.black }} />

      <div className={styles['notification-content']}>

        <div className={styles['notification-content-top']}>

          <div className={styles['notification-words']}>
            <h2>{content.title}</h2>
            {content.message}
          </div>

          <div className={styles['notification-context-menu']}>
            {/* TODO: Allow users to click context menu and mark a notification as read or unread */}
            <ThreeDotsIcon height="1.666em" />
          </div>

        </div>

        <NotificationAction action={content.action} actionText={content.actionText} isActionable={notification.is_actionable} />

      </div>
    </li>
  )
}

function NotificationAction({ isActionable, action, actionText }) {
  if (!isActionable) {
    return <Nothing />
  }

  const handleClick = e => {
    e.preventDefault()
    action()
  }

  return (
    <div className="notification-action">
      <Button
        version="black"
        onClick={handleClick}
      >
        {actionText}
      </Button>
    </div>
  )
}
