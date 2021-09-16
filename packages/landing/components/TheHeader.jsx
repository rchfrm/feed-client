import React from 'react'
// import { useRouter } from 'next/router'

import Link from 'next/link'

import useBreakpointTest from '@/landing/hooks/useBreakpointTest'

import Login from '@/landing/Login'

import FeedLogo from '@/icons/FeedLogo'
import FeedWordmark from '@/landing/elements/FeedWordmark'

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
            <a title="home" aria-label="Go Home">
              <FeedLogo
                className={styles.theHeaderLogo}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </a>
          </Link>
          <Link href="/">
            <a title="home" aria-label="Go Home" className="hidden xs:inline">
              <FeedWordmark className={styles.theHeaderWordmark} />
            </a>
          </Link>
        </div>
        <div className={styles.theHeaderNav}>
          {/* NAV LINKS */}
          {isDesktopLayout ? (
            <nav className="flex">
              <TheHeaderPageLinks onHomePage={onHomePage} />
            </nav>
          ) : (
            <TheHeaderHamburgerMenu linksOpen={linksOpen} toggleLinks={toggleLinks}>
              <TheHeaderPageLinks onHomePage={onHomePage} toggleLinks={toggleLinks} />
            </TheHeaderHamburgerMenu>
          )}
          {/* SIGNUP LINKS */}
          <div className={styles.signupLinks}>
            <Login
              className={[styles.logIn, styles.navLink].join(' ')}
              trackLocation="header"
            />
            <TryFeed
              className={[styles.tryFeed, styles.navLink].join(' ')}
              buttonText="Join"
              trackLocation="header"
            />

          </div>
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
