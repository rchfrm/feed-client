import React from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '@/app/contexts/UserContext'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import LogoButton from '@/app/LogoButton'
import SideNavProfiles from '@/app/SideNavProfiles'
import SideNavLinks from '@/app/SideNavLinks'
import SideNavToggleButton from '@/app/SideNavToggleButton'
import * as ROUTES from '@/app/constants/routes'

const SideNav = () => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const isLoggedIn = useLoggedInTest()
  const { user } = React.useContext(UserContext)
  const { pathname } = useRouter()
  const isGetStartedPage = pathname === ROUTES.GET_STARTED

  if (! isLoggedIn || user.is_email_verification_needed || isGetStartedPage) {
    return null
  }

  return (
    <div
      className={[
        'hidden md:flex flex-col justify-between',
        'fixed top-0 left-0 bottom-0 z-[22] w-20',
        'bg-black',
      ].join(' ')}
    >
      <div>
        <SideNavToggleButton
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
        <LogoButton className="w-full h-20" id="sideNav" />
        <SideNavProfiles />
      </div>
      <SideNavLinks />
    </div>
  )
}

export default SideNav
