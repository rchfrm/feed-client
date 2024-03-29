import React from 'react'
import Link from 'next/link'
import useBreakpointTest from '@/landing/hooks/useBreakpointTest'
import Login from '@/landing/Login'
import FeedLogo from '@/icons/FeedLogo'
import TheHeaderHamburgerMenu from '@/landing/TheHeaderHamburgerMenu'
import TheHeaderHamburger from '@/landing/TheHeaderHamburger'
import TryFeed from '@/landing/TryFeed'
import brandColors from '@/constants/brandColors'

export default function TheHeader() {
  // For mobile hamburger menu
  const hamburgerBreakpoint = 'sm'
  const [linksOpen, setLinksOpen] = React.useState(false)
  const toggleLinks = React.useCallback((newState) => {
    const state = typeof newState === 'boolean' ? newState : ! linksOpen
    setLinksOpen(state)
  }, [linksOpen])

  // GET DESKTOP LAYOUT TEST
  const isDesktopLayout = useBreakpointTest(hamburgerBreakpoint)

  return (
    <header
      id="header"
      className={[
        'bmw',
        'flex',
        'justify-between',
        'p-4',
        'minContent:p-6',
        'md:max-w-screen-lg',
      ].join(' ')}
    >
      <div className={[
        'flex',
        'items-center',
      ].join(' ')}
      >
        <Link
          href="/"
          title="home"
          aria-label="Go Home"
        >
          <FeedLogo
            id="landing"
            className="w-24 minContent:w-36 md:w-40 h-auto"
            fill={brandColors.black}
            hasWordmark
          />
        </Link>
      </div>
      <div className={[
        'flex',
        'items-center',
        'justify-end',
        'pl-8',
        'grow',
        'sm:justify-start',
        'sm:pl-12',
      ].join(' ')}
      >
        {/* NAV LINKS */}
        {isDesktopLayout ? (
          <div className={[
            'flex',
            'flex-row-reverse',
            'items-center',
            'sm:ml-auto',
            'sm:flex-row',
          ].join(' ')}
          >
            <Login
              className="pr-8"
              trackLocation="header"
            />
            <TryFeed
              trackLocation="header"
            />
          </div>
        ) : (
          <TheHeaderHamburgerMenu linksOpen={linksOpen} toggleLinks={toggleLinks}>
            <div className={['mx-12 mt-10 minContent:mt-12 py-4 minContent:py-6 border-t border-solid border-grey flex flex-col gap-y-4 items-center'].join(' ')}>
              <Login
                className="flex justify-center w-2/3 min-w-[100px]"
                trackLocation="header"
              />
              <TryFeed
                className={[
                  'flex',
                  'justify-center',
                  'w-2/3',
                  'min-w-[100px]',
                  'h-12',
                ].join(' ')}
                trackLocation="header"
              />
            </div>
          </TheHeaderHamburgerMenu>
        )}
        <TheHeaderHamburger
          linksOpen={linksOpen}
          toggleLinks={toggleLinks}
          className={['sm:hidden'].join(' ')}
        />
      </div>
    </header>
  )
}
