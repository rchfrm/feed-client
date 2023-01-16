import React from 'react'

import Link from 'next/link'

import useBreakpointTest from '@/landing/hooks/useBreakpointTest'

import Login from '@/landing/Login'

import FeedLogo from '@/icons/FeedLogo'

import * as styles from '@/landing/TheHeader.module.css'
import { useRouter } from 'next/router'
import TheHeaderPageLinks from '@/landing/TheHeaderPageLinks'
import TheHeaderHamburgerMenu from '@/landing/TheHeaderHamburgerMenu'
import TryFeed from '@/landing/TryFeed'
import TheHeaderHamburger from '@/landing/TheHeaderHamburger'

export default function TheHeader() {
  const { pathname } = useRouter()
  const onHomePage = pathname === '/'

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
        'fixed',
        'top-0',
        'left-0',
        'z-50',
        'w-full',
        'bg-offwhite',
        styles.theHeader,
      ].join(' ')}
    >
      <div className={[
        'bmw',
        'flex',
        'justify-between',
        'p-5',
        'xs:px-8',
      ].join(' ')}
      >
        <div className={[
          'flex',
          'items-center',
        ].join(' ')}
        >
          <Link href="/">
            <a title="home" aria-label="Go Home" className="w-40">
              <FeedLogo
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                hasWordmark
              />
            </a>
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
            <>
              <nav className="flex">
                <TheHeaderPageLinks onHomePage={onHomePage} />
              </nav>
              {/* SIGNUP LINKS */}
              <div className={styles.signupLinks}>
                <Login
                  className="pr-8"
                  trackLocation="header"
                />
                <TryFeed
                  buttonText="Sign Up"
                  trackLocation="header"
                />
              </div>
            </>
          ) : (
            <TheHeaderHamburgerMenu linksOpen={linksOpen} toggleLinks={toggleLinks}>
              <TheHeaderPageLinks onHomePage={onHomePage} toggleLinks={toggleLinks} />
              <div className="mx-12 mt-10 py-4 border-t border-solid border-grey">
                <Login
                  className="mb-1"
                  trackLocation="header"
                />
                <TryFeed
                  className="flex justify-center"
                  buttonText="Sign Up"
                  trackLocation="header"
                />
              </div>
            </TheHeaderHamburgerMenu>
          )}
          {/* HAMBURGER */}
          <TheHeaderHamburger
            linksOpen={linksOpen}
            toggleLinks={toggleLinks}
            className={['sm:hidden'].join(' ')}
          />
        </div>
      </div>
    </header>
  )
}
