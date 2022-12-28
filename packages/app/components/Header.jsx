import React from 'react'
import PeekElement from 'react-peek-element'
import useBrowserStore from '@/hooks/useBrowserStore'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useNotificationsStore from '@/app/stores/notificationsStore'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import LogoButton from '@/app/LogoButton'
import HeaderMenu from '@/app/HeaderMenu'
import HeaderMenuButton from '@/app/HeaderMenuButton'
import HeaderProfileButton from '@/app/HeaderProfileButton'

const getTotalActiveNotifications = (state) => state.totalActiveNotifications

const Header = () => {
  const { width: windowWidth } = useBrowserStore()

  const totalNotificationsUnread = useNotificationsStore(getTotalActiveNotifications)
  const isLoggedIn = useLoggedInTest()
  const { isMenuOpen, toggleMenu } = React.useContext(InterfaceContext)
  const { artistId, artistLoading } = React.useContext(ArtistContext)

  React.useEffect(() => {
    toggleMenu(false)
  }, [artistId, artistLoading, toggleMenu])

  if (artistLoading) {
    return null
  }

  return (
    <PeekElement
      usePlaceHolder
      config={{
        childProps: { style: { zIndex: 14, transform: isMenuOpen ? 'none' : null }, className: 'peek-element' },
      }}
    >
      <header className={[
        'relative md:hidden top-0 left-0 right-0',
        '-mx-6 sm:-mx-8 px-4 py-1 h-15',
        'flex justify-between items-center',
        'bg-black z-[12]',
      ].join(' ')}
      >
        <div className="flex items-center">
          <LogoButton className="w-8 mr-3" id="header" />
          <HeaderMenuButton
            toggle={toggleMenu}
          />
        </div>
        <HeaderProfileButton
          hasNotifications={!! totalNotificationsUnread}
        />
      </header>
      <HeaderMenu
        isOpen={isMenuOpen && isLoggedIn}
        toggle={toggleMenu}
        windowWidth={windowWidth}
      />
    </PeekElement>
  )
}

export default Header
