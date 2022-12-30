import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import ChevronIcon from '@/icons/ChevronIcon'
import Spinner from '@/elements/Spinner'
import ArtistImage from '@/elements/ArtistImage'
import NotificationDot from '@/elements/NotificationDot'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'
import brandColors from '@/constants/brandColors'

const HeaderProfileButton = ({
  hasNotifications,
  shouldShowMore,
  setShouldShowMore,
}) => {
  const [isHover, setIsHover] = React.useState(false)
  const { hasPendingEmail, user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)
  const [fbPageId, setFbPageId] = React.useState('')

  const sortedArtists = sortArtistsAlphabetically(allArtists)
  const hasMultipleArtists = sortedArtists.length > 1

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMousLeave = () => {
    setIsHover(false)
  }

  const handleClick = () => {
    setShouldShowMore((shouldShowMore) => ! shouldShowMore)
  }

  React.useEffect(() => {
    const { facebook_page_id } = artist
    if (! artistId || ! facebook_page_id) {
      return
    }

    setFbPageId(facebook_page_id)
  // eslint-disable-next-line
  }, [artistId])

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMousLeave}
      className={['relative h-8 flex rounded-full bg-anthracite p-1', hasMultipleArtists ? 'pl-3 pr-1' : null].join(' ')}
    >
      {hasMultipleArtists && (
        <ChevronIcon
          direction={shouldShowMore ? 'up' : 'down'}
          className="mr-2"
          fill={isHover || shouldShowMore ? brandColors.green : brandColors.white}
        />
      )}
      <figure className="w-6 h-6 rounded-full overflow-hidden">
        {artistLoading ? (
          <Spinner />
        ) : (
          <ArtistImage pageId={fbPageId} name={artist.name} className="w-6 h-6" />
        )}
      </figure>
      {((hasNotifications && ! artistLoading) || hasPendingEmail) && (
        <NotificationDot size="small" className="absolute top-0 right-0 z-5" />
      )}
    </button>
  )
}

HeaderProfileButton.propTypes = {
  hasNotifications: PropTypes.bool.isRequired,
  shouldShowMore: PropTypes.bool.isRequired,
  setShouldShowMore: PropTypes.func.isRequired,
}

export default HeaderProfileButton
