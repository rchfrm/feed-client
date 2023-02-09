import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import useNotificationStore from '@/app/stores/notificationsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ArtistImage from '@/elements/ArtistImage'
import Spinner from '@/elements/Spinner'

const getControlsStoreState = (state) => ({
  isControlsLoading: state.isControlsLoading,
  isSpendingPaused: state.isSpendingPaused,
})

const getNotificationsStoreState = (state) => ({
  isNotificationsLoading: state.isNotificationsLoading,
  integrationError: state.integrationError,
})

const ProfileButton = ({
  name,
  pageId,
  artistId,
  isActive,
  isExpanded,
  isLast,
  hasSpinner,
  isProfileSwitch,
  setShouldShowMore,
  className,
}) => {
  const { isControlsLoading, isSpendingPaused } = useControlsStore(getControlsStoreState)
  const { isNotificationsLoading, integrationError } = useNotificationStore(getNotificationsStoreState)
  const { artist, artistLoading, storeArtist } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const isLoading = artistLoading || isControlsLoading || isNotificationsLoading

  const color = ! hasSetUpProfile || Boolean(integrationError) ? 'red' : isSpendingPaused ? 'yellow' : 'green'
  const colorClasses = {
    green: {
      border: 'border-green',
      bg: 'bg-green',
      text: 'text-green',
    },
    yellow: {
      border: 'border-yellow',
      bg: 'bg-yellow',
      text: 'text-yellow',
    },
    red: {
      border: 'border-red',
      bg: 'bg-red',
      text: 'text-red-bg-dark',
    },
  }

  const updateArtist = () => {
    storeArtist(artistId, ! isActive)
    setShouldShowMore(false)
  }

  const switchProfiles = () => {
    setShouldShowMore((shouldShowMore) => ! shouldShowMore)
  }

  return (
    <button
      onClick={isProfileSwitch ? switchProfiles : updateArtist}
      className={[
        className,
        'relative overflow-hidden',
        'transition-width duration-500',
        'hover:bg-anthracite hover:text-green text-grey -mt-[1px]',
        'w-full h-14 px-4',
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
            isActive && ! isLoading ? `border-3 border-solid rounded-full ${colorClasses[color].border}` : null,
          ].join(' ')}
        >
          {artistLoading && hasSpinner ? (
            <Spinner className="w-6" />
          ) : (
            <ArtistImage pageId={pageId} name={name} className="w-6 h-6" />
          )}
        </figure>
        <p
          className={[
            'mb-0 text-left line-clamp-1 break-word transition-opacity',
            isExpanded ? 'opacity-1 w-auto delay-300 ml-2' : 'opacity-0 w-0 mr-0',
            isActive && ! isLoading ? colorClasses[color].text : null,
          ].join(' ')}
        >
          {name}
        </p>
      </div>
      <div className={[
        'absolute top-5 -right-3 h-5 w-5',
        'rounded-full',
        'transition-opacity',
        isExpanded && isActive ? 'delay-300 opacity-1' : 'opacity-0',
        isActive && ! isLoading ? colorClasses[color].bg : null,
      ].join(' ')}
      />
    </button>
  )
}

ProfileButton.propTypes = {
  name: PropTypes.string,
  pageId: PropTypes.string,
  artistId: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isExpanded: PropTypes.bool,
  isLast: PropTypes.bool,
  setShouldShowMore: PropTypes.func,
  hasSpinner: PropTypes.bool,
  isProfileSwitch: PropTypes.bool,
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
  isProfileSwitch: false,
  className: '',
}

export default ProfileButton
