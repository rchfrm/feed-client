import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'
import ArtistImage from '@/elements/ArtistImage'
import NotificationDot from '@/elements/NotificationDot'
import HamburgerIcon from '@/icons/HamburgerIcon'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import brandColors from '@/constants/brandColors'

const HeaderProfileButton = ({
  hasNotifications,
  className,
}) => {
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)
  const [fbPageId, setFbPageId] = React.useState('')
  const { hasPendingEmail } = React.useContext(UserContext)

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
      onClick={() => {}}
      className={[className, 'relative'].join(' ')}
    >
      <figure className="rounded-full overflow-hidden">
        {artistLoading ? (
          <Spinner className="w-4/5 h-auto mx-auto my-0" />
        ) : (
          artistId ? (
            <ArtistImage pageId={fbPageId} name={artist.name} className="w-full h-auto" />
          ) : (
            <HamburgerIcon fill={brandColors.white} className="w-full h-auto" />
          )
        )}
      </figure>
      {((hasNotifications && ! artistLoading) || hasPendingEmail) && (
        <NotificationDot size="medium" className="absolute -top-1 -right-1 z-5" />
      )}
    </button>
  )
}

HeaderProfileButton.propTypes = {
  hasNotifications: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

HeaderProfileButton.defaultProps = {
  className: '',
}

export default HeaderProfileButton
