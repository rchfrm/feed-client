import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import ArtistImage from '@/elements/ArtistImage'
import NotificationDot from '@/elements/NotificationDot'

const ProfileButton = ({
  name,
  pageId,
  artistId,
  hasNotifications,
  isActive,
  isExpanded,
  isLast,
  setShouldShowMore,
  className,
}) => {
  const { artistLoading, storeArtist } = React.useContext(ArtistContext)
  const { hasPendingEmail } = React.useContext(UserContext)

  const updateArtist = () => {
    storeArtist(artistId)
    setShouldShowMore(false)
  }

  return (
    <button
      onClick={updateArtist}
      className={[
        className,
        'relative',
        'hover:bg-anthracite hover:text-green text-grey-2 -mt-[1px]',
        isExpanded ? 'w-full h-12 px-4' : 'w-20 h-20 justify-center',
        isActive ? 'bg-anthracite' : null,
      ].join(' ')}
    >
      <div className={[
        'relative w-full h-full flex items-center',
        isExpanded ? null : 'justify-center',
        ! isLast ? 'border-b border-solid border-anthracite' : null,
      ].join(' ')}
      >
        <figure
          className={[
            'rounded-full overflow-hidden flex-shrink-0',
            isActive ? 'border-3 border-solid border-green rounded-full' : null,
          ].join(' ')}
        >
          <ArtistImage pageId={pageId} name={name} className={[isExpanded ? 'w-6 h-6' : 'w-12 h-12'].join(' ')} />
          {((hasNotifications && ! artistLoading) || hasPendingEmail) && (
            <NotificationDot
              size={isExpanded ? 'small' : 'medium'}
              className={[
                'absolute z-5',
                isExpanded ? 'top-1 right-0.5' : 'top-2 right-2',
              ].join(' ')}
            />
          )}
        </figure>
        {isExpanded && (
          <p className="ml-2 mb-0 text-left line-clamp-2 break-word">{name}</p>
        )}
      </div>
    </button>
  )
}

ProfileButton.propTypes = {
  name: PropTypes.string,
  pageId: PropTypes.string,
  artistId: PropTypes.string.isRequired,
  hasNotifications: PropTypes.bool.isRequired,
  isActive: PropTypes.bool,
  isExpanded: PropTypes.bool,
  isLast: PropTypes.bool,
  setShouldShowMore: PropTypes.func,
  className: PropTypes.string,
}

ProfileButton.defaultProps = {
  name: '',
  pageId: '',
  isActive: false,
  isExpanded: false,
  isLast: false,
  setShouldShowMore: () => {},
  className: '',
}

export default ProfileButton
