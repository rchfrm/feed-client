import React from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import Login from '@/Login'
import TryFeed from '@/TryFeed'
import TheHeaderPageLinks from '@/TheHeaderPageLinks'
import TheHeaderHamburgerMenu from '@/TheHeaderHamburgerMenu'
import TheHeaderHamburger from '@/TheHeaderHamburger'

import FeedLogo from '@/elements/FeedLogo'
import FeedWordmark from '@/elements/FeedWordmark'

import * as styles from '@/TheHeader.module.css'

export default function TheHeader() {
  const { pathname } = useRouter()
  const onHomePage = pathname === '/'

  // For mobile hamburger menu
  const hamburgerBreakpoint = 'sm'
  const [linksOpen, setLinksOpen] = React.useState(false)
  const toggleLinks = React.useCallback((newState) => {
    const state = typeof newState === 'boolean' ? newState : !linksOpen
    setLinksOpen(state)
  }, [linksOpen])

  // GET DESKTOP LAYOUT TEST
  const isDesktopLayout = useBreakpointTest(hamburgerBreakpoint)

  return (
    <header id="header" className={styles.theHeader}>
      <div className={['bmw', styles.theHeaderInner].join(' ')}>
        <div className={styles.theHeaderLogoContainer}>
          <Link href="/">
            <a
              title="home"
              aria-label="Go Home"
            >
              <FeedLogo className={styles.theHeaderLogo} />
            </a>
          </Link>
          <Link href="/">
            <a
              title="home"
              aria-label="Go Home"
              // className="hidden xs:inline"
            >
              <FeedWordmark className={styles.theHeaderWordmark} />
            </a>
          </Link>
        </div>
        <div className={styles.theHeaderNav}>
          {/* NAV LINKS */}
          {/*{isDesktopLayout ? (*/}
          {/*  <nav className="flex">*/}
          {/*    <TheHeaderPageLinks onHomePage={onHomePage} />*/}
          {/*  </nav>*/}
          {/*) : (*/}
          {/*  <TheHeaderHamburgerMenu linksOpen={linksOpen} toggleLinks={toggleLinks}>*/}
          {/*    <TheHeaderPageLinks onHomePage={onHomePage} toggleLinks={toggleLinks} />*/}
          {/*  </TheHeaderHamburgerMenu>*/}
          {/*)}*/}
          {/* SIGNUP LINKS */}
          <div className={styles.signupLinks}>
            {/*<TryFeed*/}
            {/*  className={[styles.tryFeed, styles.navLink].join(' ')}*/}
            {/*  buttonText="Join"*/}
            {/*  trackLocation="header"*/}
            {/*/>*/}
            <Login
              className={[styles.logIn, styles.navLink].join(' ')}
              trackLocation="header"
            />
          </div>
          {/* HAMBURGER */}
          {/*<TheHeaderHamburger*/}
          {/*  linksOpen={linksOpen}*/}
          {/*  toggleLinks={toggleLinks}*/}
          {/*  className={['sm:hidden'].join(' ')}*/}
          {/*/>*/}
        </div>
      </div>
    </header>
  )
}
