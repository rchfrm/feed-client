import React from 'react'

import NotificationsLoader from '@/app/NotificationsLoader'
import NotificationCurrentInfo from '@/app/NotificationCurrentInfo'

const NotificationsContent = () => {
  const containerRef = React.useRef(null)
  return (
    <div ref={containerRef} className="relative">
      <NotificationsLoader listClass="md:pr-5" />
      <NotificationCurrentInfo containerRef={containerRef} />
    </div>
  )
}

export default NotificationsContent
