import React from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ProfileButton from '@/app/ProfileButton'
import ProfilesConnectMore from '@/app/ProfilesConnectMore'
import SideNavProfileButtons from '@/app/SideNavProfileButtons'
import SideNavProfilesSwitchProfile from '@/app/SideNavProfilesSwitchProfile'
import ProfilesList from '@/app/ProfilesList'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'

const SideNavProfiles = ({ isExpanded }) => {
  const [shouldShowMore, setShouldShowMore] = React.useState(false)

  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artistId, artist: { name, facebook_page_id } } = React.useContext(ArtistContext)
  const maxProfiles = 3
  const sortedArtists = sortArtistsAlphabetically(allArtists)
  const containerRef = React.useRef(null)

  return (
    <>
      {sortedArtists.length <= maxProfiles ? (
        <SideNavProfileButtons
          isExpanded={isExpanded}
        />
      ) : (
        <>
          <ProfileButton
            name={name}
            pageId={facebook_page_id}
            artistId={artistId}
            isActive
            isExpanded={isExpanded}
            hasSpinner
          />
          <div className="px-4" ref={containerRef}>
            <SideNavProfilesSwitchProfile
              shouldShowMore={shouldShowMore}
              setShouldShowMore={setShouldShowMore}
              isExpanded={isExpanded}
            />
            {shouldShowMore && (
              <ProfilesList
                shouldShowMore={shouldShowMore}
                setShouldShowMore={setShouldShowMore}
                className={['top-6', isExpanded ? 'left-[216px]' : 'left-24'].join(' ')}
              />
            )}
          </div>
        </>
      )}
      <div className="px-4">
        <ProfilesConnectMore
          isExpanded={isExpanded}
          className="h-14"
        />
      </div>
    </>
  )
}

SideNavProfiles.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
}

export default SideNavProfiles
