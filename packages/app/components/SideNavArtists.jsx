import React from 'react'
import PropTypes from 'prop-types'
import useBillingStore from '@/app/stores/billingStore'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useNotificationsStore from '@/app/stores/notificationsStore'
import ArtistImage from '@/elements/ArtistImage'
import Select from '@/elements/Select'
import NotificationDot from '@/elements/NotificationDot'
import SideNavProfilesConnectMore from '@/app/SideNavProfilesConnectMore'
import DisabledActionPrompt from '@/app/DisabledActionPrompt'
import * as artistHelpers from '@/app/helpers/artistHelpers'

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
})

const ARTIST_SELECT_OPTIONS = ({
  currentArtistId,
  artists,
  updateArtist,
  artistsWithNotifications,
  isDisabled,
}) => {
  const artistOptions = React.useMemo(() => {
    return artists.map(({ id, name: artistName }) => {
      const name = artistsWithNotifications.includes(id) ? `${artistName} *` : artistName
      return { value: id, name }
    })
  }, [artists, artistsWithNotifications])

  const handleChange = (e) => {
    updateArtist(e.target.value)
  }

  return (
    <Select
      className="mb-5"
      handleChange={handleChange}
      selectedValue={currentArtistId}
      options={artistOptions}
      name="Selected Profile"
      label="Selected Profile"
      version="box white sans"
      disabled={isDisabled}
    />
  )
}

const getArtistsWithNotifications = (state) => state.artistsWithNotifications

const SubNavArtists = ({ className }) => {
  const { user } = React.useContext(UserContext)
  const { artists: allArtists, role } = user
  const { artistId, storeArtist, artist: { hasGrowthPlan } } = React.useContext(ArtistContext)
  const maxArtists = 3
  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const otherOrganizationProfiles = organizationArtists.filter(({ id }) => id !== artistId)
  const hasAllOtherProfilesOnNoPlan = artistHelpers.hasAllProfilesOnNoPlan(otherOrganizationProfiles)
  const isDisabled = ! hasGrowthPlan && hasAllOtherProfilesOnNoPlan && role !== 'admin'

  const updateArtist = (artistId) => {
    storeArtist(artistId)
  }

  // FETCH NOTIFICATIONS from other artists, and remove the current artist
  const artistsWithNotifications = useNotificationsStore(getArtistsWithNotifications)
  const otherArtistNotifications = React.useMemo(() => {
    return artistsWithNotifications.filter((id) => id !== artistId)
  }, [artistsWithNotifications, artistId])

  const sortedArtists = React.useMemo(() => {
    return artistHelpers.sortArtistsAlphabetically(allArtists)
  // eslint-disable-next-line
  }, [user])

  // If no artists, don't show artist links
  if (sortedArtists.length === 1) return <SideNavProfilesConnectMore className="mb-5 md:mb-2" />

  // Show select component if too many artists
  if (sortedArtists.length > maxArtists) {
    return (
      <div className="relative flex flex-col">
        {!! otherArtistNotifications.length && (
          <NotificationDot size="medium" style={{ top: '1.5rem', right: '-0.25rem' }} />
        )}
        <ARTIST_SELECT_OPTIONS
          updateArtist={updateArtist}
          artists={sortedArtists}
          currentArtistId={artistId}
          artistsWithNotifications={artistsWithNotifications}
          isDisabled={isDisabled}
        />
        {isDisabled && (
          <DisabledActionPrompt
            section="profile-select"
            version="small"
            className="-mt-3 mb-6 md:mb-4 no-underline"
          />
        )}
        <div className="mb-0 md:pt-3 md:mb-3 h4--text">
          <SideNavProfilesConnectMore />
        </div>
      </div>
    )
  }

  // Else show more explicit selector
  return (
    <div className={[className, 'flex flex-col -mt-4'].join(' ')}>
      <ul className={['relative mb-5 w-auto md:pb-0 md:mb-0'].join(' ')}>
        {sortedArtists.map(({ id, name, facebook_page_id }) => {
          const isActiveProfile = id === artistId
          const disabledClass = isDisabled && ! isActiveProfile ? 'pointer-events-none opacity-30' : null
          const hasNotification = otherArtistNotifications.includes(id)

          return (
            <li
              key={id}
              className={[
                disabledClass,
                'text-lg mb-5',
                isActiveProfile ? 'opacity-100' : 'opacity-50',
              ].join(' ')}
            >
              <a className={['relative flex items-center no-underline'].join(' ')} role="button" onClick={() => updateArtist(id)}>
                {hasNotification && (
                  <NotificationDot className="ml-8" style={{ top: '0rem', left: '-0.25rem' }} />
                )}
                <figure
                  className={[
                    'overflow-hidden h-8 w-8 mr-5 rounded-full',
                    isActiveProfile ? 'opacity-100 border-2 border-solid border-white' : 'opacity-50',
                  ].join(' ')}
                >
                  <ArtistImage className="h-auto w-full" pageId={facebook_page_id} />
                </figure>
                <figcaption>{name}</figcaption>
              </a>
            </li>
          )
        })}
        {isDisabled && (
          <DisabledActionPrompt
            section="profile-select"
            version="small"
            className="mb-6 md:mb-4 no-underline"
          />
        )}
        {sortedArtists.length > 0 && (
          <li className="md:hidden pt-3 text-lg">
            <SideNavProfilesConnectMore />
          </li>
        )}
      </ul>
      {sortedArtists.length > 0 && (
        <div className="hidden md:block pt-5 pb-3 text-lg">
          <SideNavProfilesConnectMore />
        </div>
      )}
    </div>
  )
}

SubNavArtists.propTypes = {
  className: PropTypes.string,
}

SubNavArtists.defaultProps = {
  className: '',
}

export default SubNavArtists
