import React from 'react'

import NotificationsLoader from '@/app/NotificationsLoader'
import NotificationsList from '@/app/NotificationsList'
import NotificationCurrentInfo from '@/app/NotificationCurrentInfo'

const NotificationsContent = () => {
  const containerRef = React.useRef(null)
  return (
    <div ref={containerRef} className="relative">
      <NotificationsList />
      <NotificationCurrentInfo containerRef={containerRef} />
    </div>
  )
}

export default NotificationsContent
