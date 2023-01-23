import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ArtistImage from '@/elements/ArtistImage'
import Spinner from '@/elements/Spinner'

const ProfileButton = ({
  name,
  pageId,
  artistId,
  isActive,
  isExpanded,
  isLast,
  hasSpinner,
  setShouldShowMore,
  className,
}) => {
  const { artistLoading, storeArtist } = React.useContext(ArtistContext)

  const updateArtist = () => {
    storeArtist(artistId)
    setShouldShowMore(false)
  }

  return (
    <button
      onClick={updateArtist}
      className={[
        className,
        'relative overflow-hidden',
        'transition-width duration-500',
        'hover:bg-anthracite hover:text-green text-grey -mt-[1px]',
        'w-full h-16 px-4',
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
            <Spinner className="w-9" />
          ) : (
            <ArtistImage pageId={pageId} name={name} className="w-9 h-9" />
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
      <div className={[
        'absolute top-5 -right-3 h-6 w-6',
        'rounded-full bg-green',
        'transition-opacity',
        isExpanded && isActive ? 'delay-300 opacity-1' : 'opacity-0',
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
