import React from 'react'
import PropTypes from 'prop-types'
import useHover from '@/app/hooks/useHover'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import ThreeDotsIcon from '@/icons/ThreeDotsIcon'
import Spinner from '@/elements/Spinner'
import ArtistImage from '@/elements/ArtistImage'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'
import brandColors from '@/constants/brandColors'

const HeaderProfileButton = ({
  shouldShowMore,
  setShouldShowMore,
}) => {
  const [hoverRef, isHover] = useHover()
  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)
  const [fbPageId, setFbPageId] = React.useState('')

  const sortedArtists = sortArtistsAlphabetically(allArtists)
  const hasMultipleArtists = sortedArtists.length > 1

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
      className={[
        'relative h-8 flex rounded-full bg-anthracite p-1',
        isHover || shouldShowMore ? 'bg-green-text' : null,
      ].join(' ')}
      ref={hoverRef}
    >
      {hasMultipleArtists && (
        <ThreeDotsIcon
          orientation="vertical"
          className="mx-1"
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
    </button>
  )
}

HeaderProfileButton.propTypes = {
  shouldShowMore: PropTypes.bool.isRequired,
  setShouldShowMore: PropTypes.func.isRequired,
}

export default HeaderProfileButton
