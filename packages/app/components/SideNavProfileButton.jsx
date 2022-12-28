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
        'relative flex justify-center items-center w-full h-20',
        'hover:bg-blackHover',
        isActive ? 'bg-blackHover' : null,
      ].join(' ')}
    >
      <figure
        className={[
          'rounded-full overflow-hidden',
          isActive ? 'border-3 border-solid border-green rounded-full' : null,
        ].join(' ')}
      >
        <ArtistImage pageId={pageId} name={name} className="w-12 h-auto" />
        {((hasNotifications && ! artistLoading) || hasPendingEmail) && (
          <NotificationDot size="medium" className="absolute top-2 right-2 z-5" />
        )}
      </figure>
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
