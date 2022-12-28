import React from 'react'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useNotificationsStore from '@/app/stores/notificationsStore'
import SideNavProfileButton from '@/app/SideNavProfileButton'
import SideNavProfilesConnectMore from '@/app/SideNavProfilesConnectMore'
import ChevronIcon from '@/icons/ChevronIcon'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import brandColors from '@/constants/brandColors'

const getNotificationsStoreState = (state) => ({
  totalActiveNotifications: state.totalActiveNotifications,
  artistsWithNotifications: state.artistsWithNotifications,
})

const SideNavProfiles = () => {
  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artistId, artistLoading, artist: { name, facebook_page_id } } = React.useContext(ArtistContext)
  const { totalActiveNotifications, artistsWithNotifications } = useNotificationsStore(getNotificationsStoreState)
  const maxProfiles = 3

  const sortedArtists = React.useMemo(() => {
    return artistHelpers.sortArtistsAlphabetically(allArtists)
  // eslint-disable-next-line
  }, [user])

  return (
    <>
      {sortedArtists.length <= maxProfiles ? (
        sortedArtists.map(({ id, name, facebook_page_id }) => {
          const isActive = id === artistId && ! artistLoading
          const hasNotification = artistsWithNotifications.includes(id)

          return (
            <div key={id} className={['flex justify-center items-center w-full h-20', isActive ? 'bg-blackHover' : null].join(' ')}>
              <SideNavProfileButton
                name={name}
                pageId={facebook_page_id}
                artistId={id}
                hasNotifications={hasNotification}
                isActive={isActive}
                className="w-12"
              />
            </div>
          )
        })
      ) : (
        <>
          <div className="flex justify-center items-center w-full h-20 bg-blackHover">
            <SideNavProfileButton
              name={name}
              pageId={facebook_page_id}
              artistId={artistId}
              hasNotifications={!! totalActiveNotifications}
              className="w-12"
              isActive
            />
          </div>
          <div className="w-full px-4">
            <button className={[
              'flex justify-center items-center',
              'h-12 w-full mb-0',
              'border-b border-solid border-grey-3 text-white',
            ].join(' ')}
            >
              <ChevronIcon direction="down" className="w-2" fill={brandColors.white} />
            </button>
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
