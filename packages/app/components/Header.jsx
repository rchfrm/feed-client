import React from 'react'
import Router, { useRouter } from 'next/router'
import PeekElement from 'react-peek-element'
import useBrowserStore from '@/hooks/useBrowserStore'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useNotificationsStore from '@/app/stores/notificationsStore'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import FeedLogo from '@/icons/FeedLogo'
import SubNavMenuButton from '@/app/SubNavMenuButton'
import SubNavProfileButton from '@/app/SubNavProfileButton'
import SubNav from '@/app/SubNav'
import * as ROUTES from '@/app/constants/routes'

const getTotalActiveNotifications = (state) => state.totalActiveNotifications

const Header = () => {
  const { width: windowWidth } = useBrowserStore()

  const totalNotificationsUnread = useNotificationsStore(getTotalActiveNotifications)
  const isLoggedIn = useLoggedInTest()
  const { pathname } = useRouter()
  const { subNavOpen, toggleSubNav } = React.useContext(InterfaceContext)
  const { artistId, artistLoading } = React.useContext(ArtistContext)

  React.useEffect(() => {
    toggleSubNav(false)
  }, [artistId, artistLoading, toggleSubNav])

  const goHome = () => {
    if (pathname === ROUTES.HOME) {
      return
    }

    Router.push(ROUTES.HOME)
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
          <a
            onClick={goHome}
            role="button"
            title="home"
            className="mr-4"
          >
            <FeedLogo className="w-8" id="header" />
          </a>
          <SubNavMenuButton
            toggleSubNav={toggleSubNav}
            navOpen={subNavOpen}
          />
        </div>
        <SubNavProfileButton
          toggleSubNav={toggleSubNav}
          isSubNavOpen={subNavOpen}
          hasNotifications={!! totalNotificationsUnread}
          className={['flex flex-col justify-center w-8 h-8 pointer-events-none'].join(' ')}
        />
      </header>
      <SubNav
        open={subNavOpen && isLoggedIn}
        toggle={toggleSubNav}
        windowWidth={windowWidth}
      />
    </PeekElement>
  )
}

export default Header
