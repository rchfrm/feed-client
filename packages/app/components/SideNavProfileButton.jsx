import React from 'react'
import PropTypes from 'prop-types'
import ArtistImage from '@/elements/ArtistImage'
import NotificationDot from '@/elements/NotificationDot'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

const SideNavProfileButton = ({
  name,
  pageId,
  artistId,
  hasNotifications,
  isActive,
  className,
}) => {
  const { artistLoading, storeArtist } = React.useContext(ArtistContext)
  const { hasPendingEmail } = React.useContext(UserContext)

  const updateArtist = (artistId) => {
    storeArtist(artistId)
  }

  return (
    <button
      onClick={() => updateArtist(artistId)}
      className={[
        className,
        'relative',
        isActive ? 'border-3 border-solid border-green rounded-full' : null,
      ].join(' ')}
    >
      <figure className="rounded-full overflow-hidden">
        <ArtistImage pageId={pageId} name={name} className="w-full h-auto" />
      </figure>
      {((hasNotifications && ! artistLoading) || hasPendingEmail) && (
        <NotificationDot size="medium" className="absolute -top-1 -right-1 z-5" />
      )}
    </button>
  )
}

SideNavProfileButton.propTypes = {
  hasNotifications: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

SideNavProfileButton.defaultProps = {
  className: '',
}

export default SideNavProfileButton
