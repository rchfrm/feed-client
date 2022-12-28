import React from 'react'
import useNotificationsStore from '@/app/stores/notificationsStore'
import SideNavProfileButton from '@/app/HeaderProfileButton'

const getTotalActiveNotifications = (state) => {
  return state.totalActiveNotifications
}

const SideNavProfiles = () => {
  const totalNotificationsUnread = useNotificationsStore(getTotalActiveNotifications)

  return (
    <div className="flex justify-center items-center w-full h-20">
      <SideNavProfileButton
        hasNotifications={!! totalNotificationsUnread}
        className="w-12"
      />
    </div>
  )
}

export default SideNavProfiles
