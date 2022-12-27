import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'
import ArtistImage from '@/elements/ArtistImage'
import NotificationDot from '@/elements/NotificationDot'
import HamburgerIcon from '@/icons/HamburgerIcon'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { UserContext } from '@/app/contexts/UserContext'
import brandColors from '@/constants/brandColors'

const SubNavButton = ({
  toggleSubNav,
  navOpen,
  hasNotifactions,
  className,
}) => {
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)
  const [fbPageId, setFbPageId] = React.useState('')
  const { hasPendingEmail } = React.useContext(UserContext)
  const { globalLoading } = React.useContext(InterfaceContext)

  React.useEffect(() => {
    const { facebook_page_id } = artist
    if (! artistId || ! facebook_page_id) return
    setFbPageId(facebook_page_id)
  // eslint-disable-next-line
  }, [artistId])

  const toggle = () => {
    if (artistLoading) {
      return
    }
    toggleSubNav()
  }

  return (
    <a
      role="button"
      onClick={toggle}
      className={[className, 'relative'].join(' ')}
      aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
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
      <p className={[
        'hidden md:block mb-0 pt-2 text-xs text-center hover:text-green',
        globalLoading ? 'text-black' : 'text-grey-2',
      ].join(' ')}
      >
        menu
      </p>
      {((hasNotifactions && ! navOpen && ! artistLoading) || hasPendingEmail) && (
        <NotificationDot size="medium" className="absolute -top-1 -right-1 z-5" />
      )}
    </a>
  )
}

SubNavButton.propTypes = {
  toggleSubNav: PropTypes.func.isRequired,
  navOpen: PropTypes.bool.isRequired,
  hasNotifactions: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

SubNavButton.defaultProps = {
  className: '',
}

export default SubNavButton
