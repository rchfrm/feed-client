import React from 'react'
import Router, { useRouter } from 'next/router'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useNotificationsStore from '@/app/stores/notificationsStore'
import FeedLogo from '@/icons/FeedLogo'
import SideNavButton from '@/app/SideNavButton'
import SubNavButton from '@/app/SubNavButton'
import * as ROUTES from '@/app/constants/routes'

const getTotalActiveNotifications = (state) => state.totalActiveNotifications

const showBadgeTest = ({ icon, hasBudget, missingDefaultLink, isSpendingPaused }) => {
  if (icon === 'controls') {
    if (! hasBudget && ! missingDefaultLink) {
      return true
    }

    if (isSpendingPaused && ! missingDefaultLink) {
      return true
    }
  }

  if (icon === 'posts' && missingDefaultLink) {
    return true
  }
  return false
}

const SideNav = () => {
  const isLoggedIn = useLoggedInTest()
  const { user } = React.useContext(UserContext)
  const { subNavOpen, toggleSubNav } = React.useContext(InterfaceContext)

  const { pathname } = useRouter()
  const isGetStartedPage = pathname === ROUTES.GET_STARTED
  const totalNotificationsUnread = useNotificationsStore(getTotalActiveNotifications)

  const {
    hasBudget,
    artist: {
      missingDefaultLink,
      isSpendingPaused,
    } = {},
  } = React.useContext(ArtistContext)

  const links = [
    {
      href: ROUTES.POSTS,
      title: 'posts',
      icon: 'posts',
      matchingHrefs: [ROUTES.POST],
    },
    {
      href: ROUTES.CONTROLS,
      title: 'controls',
      icon: 'controls',
      matchingHrefs: ROUTES.controlsPages,
    },
    {
      href: ROUTES.RESULTS,
      title: 'results',
      icon: 'results',
    },
    {
      href: ROUTES.INSIGHTS,
      title: 'insights',
      icon: 'insights',
    },
    {
      href: ROUTES.FAQS,
      title: 'FAQs',
      icon: 'faqs',
    },
  ]

  const testIfActive = (pathname, href, matchingHrefs) => {
    if (pathname === href) {
      return true
    }

    if (matchingHrefs?.includes(pathname)) {
      return true
    }

    return false
  }

  const goHome = () => {
    if (pathname === ROUTES.HOME) {
      return
    }

    Router.push(ROUTES.HOME)
  }

  if (! isLoggedIn || user.is_email_verification_needed || isGetStartedPage) {
    return null
  }

  return (
    <div
      id="SideNav"
      className={[
        'hidden md:flex',
        'fixed top-0 left-0 bottom-0 z-[22] w-auto',
        'flex-col justify-between',
        'py-2 px-2 bg-black',
      ].join(' ')}
    >
      <a
        onClick={goHome}
        role="button"
        title="home"
        className={['flex justify-center'].join(' ')}
      >
        <FeedLogo className="w-10" id="sideNav" />
      </a>
      <nav className={[
        'flex flex-row md:flex-col',
        'justify-between',
        'p-2 md:p-0',
      ].join(' ')}
      >
        {links.map(({ href, title, icon, matchingHrefs }) => {
          const showBadge = showBadgeTest({ icon, hasBudget, missingDefaultLink, isSpendingPaused })
          const isActive = testIfActive(pathname, href, matchingHrefs)

          return (
            <div className={['text-xs text-center md:p-0 my-3 mx-0 w-12'].join(' ')} key={href}>
              <SideNavButton
                title={title}
                icon={icon}
                href={href}
                matchingHrefs={matchingHrefs}
                isActive={isActive}
                showBadge={showBadge}
              />
            </div>
          )
        })}
      </nav>
      <SubNavButton
        toggleSubNav={toggleSubNav}
        navOpen={subNavOpen}
        hasNotifactions={!! totalNotificationsUnread}
        className={['flex flex-col justify-center w-10 mx-auto'].join(' ')}
      />
    </div>
  )
}

export default SideNav
