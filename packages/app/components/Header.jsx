import React from 'react'
import Router, { useRouter } from 'next/router'
import PeekElement from 'react-peek-element'
import useBrowserStore from '@/hooks/useBrowserStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useNotificationsStore from '@/app/stores/notificationsStore'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import FeedLogo from '@/icons/FeedLogo'
import TheSubNavButton from '@/app/TheSubNavButton'
import TheSubNav from '@/app/TheSubNav'
import * as ROUTES from '@/app/constants/routes'

const getTotalActiveNotifications = (state) => state.totalActiveNotifications

const Header = () => {
  const { width: windowWidth } = useBrowserStore()
  const [mobileHeader, setMobileHeader] = React.useState(null)

  const totalNotificationsUnread = useNotificationsStore(getTotalActiveNotifications)
  const isDesktopLayout = useBreakpointTest('md')
  const isLoggedIn = useLoggedInTest()
  const { pathname } = useRouter()
  const { subNavOpen, toggleSubNav } = React.useContext(InterfaceContext)

  React.useEffect(() => {
    setMobileHeader(! isDesktopLayout)
  }, [isDesktopLayout])

  const goHome = () => {
    if (pathname === ROUTES.HOME) {
      return
    }

    Router.push(ROUTES.HOME)
  }

  if (typeof mobileHeader !== 'boolean') {
    return null
  }

  return (
    <PeekElement
      usePlaceHolder
      config={{
        childProps: { style: { zIndex: 28, transform: subNavOpen ? 'none' : null }, className: 'peek-element' },
      }}
    >
      <header className={[
        'absolute md:hidden top-0 left-0 right-0',
        '-mx-6 sm:-mx-8 px-4 py-1 h-15',
        'flex justify-between items-center',
        'bg-black z-[28]',
      ].join(' ')}
      >
        <a
          onClick={goHome}
          role="button"
          title="home"
        >
          <FeedLogo className="w-8" id="header" />
        </a>
        <TheSubNavButton
          toggleSubNav={toggleSubNav}
          navOpen={subNavOpen}
          hasNotifactions={!! totalNotificationsUnread}
          className={['flex flex-col justify-center w-8 h-8'].join(' ')}
        />
      </header>

      <TheSubNav
        open={subNavOpen && isLoggedIn}
        toggle={toggleSubNav}
        windowWidth={windowWidth}
      />
    </PeekElement>
  )
}

export default Header
