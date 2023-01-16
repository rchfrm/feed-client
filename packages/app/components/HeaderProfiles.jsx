import React from 'react'
import useNotificationsStore from '@/app/stores/notificationsStore'
import HeaderProfileButton from '@/app/HeaderProfileButton'
import SideNavProfilesList from '@/app/ProfilesList'

const getNotificationsStoreState = (state) => ({
  totalActiveNotifications: state.totalActiveNotifications,
})

const HeaderProfiles = () => {
  const [shouldShowMore, setShouldShowMore] = React.useState(false)
  const { totalActiveNotifications } = useNotificationsStore(getNotificationsStoreState)

  return (
    <div className="flex justify-center items-center w-full h-20">
      <HeaderProfileButton
        hasNotifications={!! totalActiveNotifications}
        shouldShowMore={shouldShowMore}
        setShouldShowMore={setShouldShowMore}
      />
      {shouldShowMore && (
        <SideNavProfilesList
          artistsWithNotifications={totalActiveNotifications}
          setShouldShowMore={setShouldShowMore}
        />
      )}
    </div>
  )
}

export default HeaderProfiles
