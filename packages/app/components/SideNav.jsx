import React from 'react'
import { useRouter } from 'next/router'
import SideNavButton from '@/app/SideNavButton'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import * as ROUTES from '@/app/constants/routes'

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

const testIfActive = (pathname, href, matchingHrefs) => {
  if (pathname === href) return true
  if (matchingHrefs?.includes(pathname)) return true
  return false
}

const SideNav = () => {
  const isLoggedIn = useLoggedInTest()
  const { user } = React.useContext(UserContext)

  const { pathname } = useRouter()
  const isGetStartedPage = pathname === ROUTES.GET_STARTED

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

  if (! isLoggedIn || user.is_email_verification_needed || isGetStartedPage) {
    return null
  }

  return (
    <div
      id="ThePageButtons"
      className={[
        'fixed md:top-0 left-0 bottom-0 z-100',
        'w-full md:w-auto',
        'md:pt-32 px-2 bg-black',
      ].join(' ')}
    >
      <nav className={[
        'flex flex-row md:flex-col',
        'justify-between xs:justify-center md:justify-between',
        'p-2 md:p-0',
      ].join(' ')}
      >
        {links.map(({ href, title, icon, matchingHrefs }) => {
          const showBadge = showBadgeTest({ icon, hasBudget, missingDefaultLink, isSpendingPaused })
          const isActive = testIfActive(pathname, href, matchingHrefs)

          return (
            <div className={['text-xs text-center py-0 px-5 mx-2 md:p-0 md:my-3 md:mx-0 w-auto md:w-12'].join(' ')} key={href}>
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
    </div>
  )
}

export default SideNav
