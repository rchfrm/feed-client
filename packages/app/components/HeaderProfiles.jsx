import React from 'react'
import useNotificationsStore from '@/app/stores/notificationsStore'
import HeaderProfileButton from '@/app/HeaderProfileButton'

const getTotalActiveNotifications = (state) => {
  return state.totalActiveNotifications
}

const HeaderProfiles = () => {
  const totalNotificationsUnread = useNotificationsStore(getTotalActiveNotifications)

  return (
    <div className="flex justify-center items-center w-full h-20">
      <HeaderProfileButton
        hasNotifications={!! totalNotificationsUnread}
        className="w-12"
      />
    </div>
  )
}

export default HeaderProfiles
