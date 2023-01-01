import React from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useNotificationsStore from '@/app/stores/notificationsStore'
import ProfileButton from '@/app/ProfileButton'
import SideNavProfileButtons from '@/app/SideNavProfileButtons'
import SideNavProfilesShowMore from '@/app/SideNavProfilesShowMore'
import SideNavProfilesConnectMore from '@/app/SideNavProfilesConnectMore'
import SideNavProfilesList from '@/app/ProfilesList'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'

const getNotificationsStoreState = (state) => ({
  totalActiveNotifications: state.totalActiveNotifications,
  artistsWithNotifications: state.artistsWithNotifications,
})

const SideNavProfiles = ({ isExpanded }) => {
  const [shouldShowMore, setShouldShowMore] = React.useState(false)

  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artistId, artist: { name, facebook_page_id } } = React.useContext(ArtistContext)
  const { totalActiveNotifications, artistsWithNotifications } = useNotificationsStore(getNotificationsStoreState)
  const maxProfiles = 3
  const sortedArtists = sortArtistsAlphabetically(allArtists)
  const containerRef = React.useRef(null)

  return (
    <>
      {sortedArtists.length <= maxProfiles ? (
        <SideNavProfileButtons
          artistsWithNotifications={artistsWithNotifications}
          isExpanded={isExpanded}
        />
      ) : (
        <>
          <ProfileButton
            name={name}
            pageId={facebook_page_id}
            artistId={artistId}
            hasNotifications={!! totalActiveNotifications}
            isActive
            isExpanded={isExpanded}
            hasSpinner
          />
          <div className="px-4" ref={containerRef}>
            <SideNavProfilesShowMore
              shouldShowMore={shouldShowMore}
              setShouldShowMore={setShouldShowMore}
              isExpanded={isExpanded}
            />
            {shouldShowMore && (
              <SideNavProfilesList
                artistsWithNotifications={artistsWithNotifications}
                shouldShowMore={shouldShowMore}
                setShouldShowMore={setShouldShowMore}
                className={['top-6', isExpanded ? 'left-[216px]' : 'left-24'].join(' ')}
              />
            )}
          </div>
        </>
      )}
      <div className="px-4">
        <SideNavProfilesConnectMore
          isExpanded={isExpanded}
        />
      </div>
    </>
  )
}

SideNavProfiles.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
}

export default SideNavProfiles
