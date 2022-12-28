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
import SideNavProfileButton from '@/app/HeaderProfileButton'

const getTotalActiveNotifications = (state) => state.totalActiveNotifications

const Header = () => {
  const { width: windowWidth } = useBrowserStore()

  const totalNotificationsUnread = useNotificationsStore(getTotalActiveNotifications)
  const isLoggedIn = useLoggedInTest()
  const { subNavOpen, toggleSubNav } = React.useContext(InterfaceContext)
  const { artistId, artistLoading } = React.useContext(ArtistContext)

  React.useEffect(() => {
    toggleSubNav(false)
  }, [artistId, artistLoading, toggleSubNav])

  if (artistLoading) {
    return null
  }

  return (
    <PeekElement
      usePlaceHolder
      config={{
        childProps: { style: { zIndex: 14, transform: subNavOpen ? 'none' : null }, className: 'peek-element' },
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
            toggleSubNav={toggleSubNav}
            navOpen={subNavOpen}
          />
        </div>
        <SideNavProfileButton
          toggleSubNav={toggleSubNav}
          isSubNavOpen={subNavOpen}
          hasNotifications={!! totalNotificationsUnread}
          className={['flex flex-col justify-center w-8 h-8 pointer-events-none'].join(' ')}
        />
      </header>
      <HeaderMenu
        isOpen={subNavOpen && isLoggedIn}
        toggle={toggleSubNav}
        windowWidth={windowWidth}
      />
    </PeekElement>
  )
}

export default Header
