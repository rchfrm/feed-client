import React from 'react'
import PeekElement from 'react-peek-element'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import FeedLogo from '@/icons/FeedLogo'
import LogoButton from '@/app/LogoButton'
import HeaderMenu from '@/app/HeaderMenu'
import HeaderMenuButton from '@/app/HeaderMenuButton'
import HeaderProfileButton from '@/app/HeaderProfileButton'
import ProfilesList from '@/app/ProfilesList'

const Header = () => {
  const [shouldShowMore, setShouldShowMore] = React.useState(false)
  const isLoggedIn = useLoggedInTest()

  const { hasNav, isMenuOpen, toggleMenu } = React.useContext(InterfaceContext)
  const { artistId, artistLoading } = React.useContext(ArtistContext)

  React.useEffect(() => {
    toggleMenu(false)
  }, [artistId, artistLoading, toggleMenu])

  if (! hasNav) {
    return <FeedLogo id="header" className="absolute top-3 left-3" />
  }

  return (
    <PeekElement
      usePlaceHolder
      config={{
        childProps: { style: { zIndex: 22, transform: isMenuOpen ? 'none' : null }, className: 'peek-element md:hidden' },
      }}
    >
      <header className={[
        'relative top-0 left-0 right-0',
        '-mx-3 sm:-mx-8 px-4 py-1 h-15',
        'flex justify-between items-center',
        'bg-black',
      ].join(' ')}
      >
        <div className="flex items-center">
          <LogoButton className="w-8 mr-3" id="header" />
          <HeaderMenuButton
            toggle={toggleMenu}
          />
        </div>
        <HeaderProfileButton
          shouldShowMore={shouldShowMore}
          setShouldShowMore={setShouldShowMore}
        />
        {shouldShowMore && (
          <ProfilesList
            shouldShowMore={shouldShowMore}
            setShouldShowMore={setShouldShowMore}
            className="top-20 right-6"
            hasConnectMore
          />
        )}
      </header>
      <HeaderMenu
        isOpen={isMenuOpen && isLoggedIn}
        toggle={toggleMenu}
      />
    </PeekElement>
  )
}

export default Header
