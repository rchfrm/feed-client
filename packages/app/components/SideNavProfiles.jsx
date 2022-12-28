import React from 'react'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useNotificationsStore from '@/app/stores/notificationsStore'
import SideNavProfilesList from '@/app/SideNavProfilesList'
import SideNavProfileButton from '@/app/SideNavProfileButton'
import SideNavProfilesShowMore from '@/app/SideNavProfilesShowMore'
import SideNavProfilesConnectMore from '@/app/SideNavProfilesConnectMore'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'

const getNotificationsStoreState = (state) => ({
  totalActiveNotifications: state.totalActiveNotifications,
  artistsWithNotifications: state.artistsWithNotifications,
})

const SideNavProfiles = () => {
  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artistId, artist: { name, facebook_page_id } } = React.useContext(ArtistContext)
  const { totalActiveNotifications, artistsWithNotifications } = useNotificationsStore(getNotificationsStoreState)
  const maxProfiles = 3

  const sortedArtists = sortArtistsAlphabetically(allArtists)

  return (
    <>
      {sortedArtists.length <= maxProfiles ? (
        <SideNavProfilesList artistsWithNotifications={artistsWithNotifications} />
      ) : (
        <>
          <SideNavProfileButton
            name={name}
            pageId={facebook_page_id}
            artistId={artistId}
            hasNotifications={!! totalActiveNotifications}
            isActive
          />
          <div className="px-4">
            <SideNavProfilesShowMore />
          </div>
        </>
      )}
      <div className="px-4">
        <SideNavProfilesConnectMore />
      </div>
    </>
  )
}

export default SideNavProfiles
