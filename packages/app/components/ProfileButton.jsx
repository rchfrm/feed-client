import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import ArtistImage from '@/elements/ArtistImage'
import NotificationDot from '@/elements/NotificationDot'
import Spinner from '@/elements/Spinner'

const ProfileButton = ({
  name,
  pageId,
  artistId,
  hasNotifications,
  isActive,
  isExpanded,
  isLast,
  hasSpinner,
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
        'relative transition-width duration-500',
        'hover:bg-anthracite hover:text-green text-grey -mt-[1px]',
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
            isActive && ! artistLoading ? 'border-3 border-solid border-green rounded-full' : null,
          ].join(' ')}
        >
          {artistLoading && hasSpinner ? (
            <Spinner className={[isExpanded ? 'w-6' : 'w-12'].join(' ')} />
          ) : (
            <ArtistImage pageId={pageId} name={name} className={[isExpanded ? 'w-6 h-6' : 'w-12 h-12'].join(' ')} />
          )}
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
        <p
          className={[
            'mb-0 text-left line-clamp-2 break-word transition-opacity',
            isExpanded ? 'opacity-1 w-auto delay-300 ml-2' : 'opacity-0 w-0 mr-0',
          ].join(' ')}
        >
          {name}
        </p>
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
  hasSpinner: PropTypes.bool,
  className: PropTypes.string,
}

ProfileButton.defaultProps = {
  name: '',
  pageId: '',
  isActive: false,
  isExpanded: false,
  isLast: false,
  setShouldShowMore: () => {},
  hasSpinner: false,
  className: '',
}

export default ProfileButton
