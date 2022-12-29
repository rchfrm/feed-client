import React from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ProfileButton from '@/app/ProfileButton'
import * as artistHelpers from '@/app/helpers/artistHelpers'

const SideNavProfileButtons = ({ artistsWithNotifications }) => {
  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  const sortedArtists = artistHelpers.sortArtistsAlphabetically(allArtists)

  return (
    sortedArtists.map(({ id, name, facebook_page_id }) => {
      const isActive = id === artistId && ! artistLoading
      const hasNotification = artistsWithNotifications.includes(id)

      return (
        <ProfileButton
          key={id}
          name={name}
          pageId={facebook_page_id}
          artistId={id}
          hasNotifications={hasNotification}
          isActive={isActive}
        />
      )
    })
  )
}

SideNavProfileButtons.propTypes = {
  artistsWithNotifications: PropTypes.array.isRequired,
}

export default SideNavProfileButtons
