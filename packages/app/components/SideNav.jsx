import React from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useOnResize from '@/landing/hooks/useOnResize'
import LogoButton from '@/app/LogoButton'
import SideNavProfiles from '@/app/SideNavProfiles'
import SideNavPrimaryLinks from '@/app/SideNavPrimaryLinks'
import SideNavToggleButton from '@/app/SideNavToggleButton'
import * as ROUTES from '@/app/constants/routes'

const SideNav = () => {
  const { width } = useOnResize()
  const isLoggedIn = useLoggedInTest()
  const { user } = React.useContext(UserContext)
  const contentElement = React.useRef(null)
  const { pathname } = useRouter()
  const isGetStartedPage = pathname === ROUTES.GET_STARTED
  const { isNavExpanded, toggleNav } = React.useContext(InterfaceContext)

  React.useEffect(() => {
    const isMobile = width < 992

    if (! isNavExpanded || ! isMobile) {
      return
    }

    toggleNav()
  }, [width, isNavExpanded, toggleNav])

  if (! isLoggedIn || user.is_email_verification_needed || isGetStartedPage) {
    return null
  }

  return (
    <div
      className={[
        'hidden md:flex flex-col justify-between',
        'fixed top-0 left-0 bottom-0 z-[22] font-display',
        isNavExpanded ? 'w-[200px]' : 'w-20',
        'md:transition-all md:duration-500',
        'bg-black',
      ].join(' ')}
    >
      <div ref={contentElement}>
        <SideNavToggleButton
          isExpanded={isNavExpanded}
          toggleNav={toggleNav}
        />
        <LogoButton
          id="sideNav"
          className={['w-full transition-all duration-500', isNavExpanded ? 'h-30' : 'h-20'].join(' ')}
          hasWordmark={isNavExpanded}
        />
        <SideNavProfiles
          isExpanded={isNavExpanded}
        />
      </div>
      <SideNavPrimaryLinks isExpanded={isNavExpanded} />
    </div>
  )
}

export default SideNav
