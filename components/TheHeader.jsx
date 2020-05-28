// IMPORT PACKAGES
import React from 'react'
import Router, { useRouter } from 'next/router'
// IMPORT COMPONENTS
import * as ROUTES from '../constants/routes'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT HOOKS
import useLoggedInTest from './hooks/useLoggedInTest'
import useOnResize from './hooks/useOnResize'
import useOnScroll from './hooks/useOnScroll'
// IMPORT ELEMENTS
import FeedLogo from './icons/FeedLogo'
import TheSubNavButton from './TheSubNavButton'
import PageHeader from './PageHeader'
import TheSubNav from './TheSubNav'
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'
// IMPORT STYLES
import styles from './TheHeader.module.css'

function TheHeader() {
  // Check if logged in or not
  const isLoggedIn = useLoggedInTest()
  // Handle flash of oversized logo
  const [logoOpacity, setLogoOpacity] = React.useState(0)
  React.useEffect(() => {
    setLogoOpacity(1)
  }, [])
  // HANDLE SUB-NAV OPENING AND CLOSING
  const [showSubNav, setShowSubNav] = React.useState(false)
  const { subNavOpen, toggleSubNav, setSubNav } = React.useContext(InterfaceContext)
  const [logoTextColor, setLogoTextColor] = React.useState(brandColors.textColor)
  React.useEffect(() => {
    // Toggle logo text
    setLogoTextColor(subNavOpen ? brandColors.bgColor : brandColors.textColor)
    // Toggle sub nav
    const show = subNavOpen && isLoggedIn
    setShowSubNav(show)
  }, [subNavOpen])
  // Close sub-nav after artist changes
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  React.useEffect(() => {
    setSubNav(false)
  }, [artistId, artistLoading])
  // Go to home page
  const { pathname } = useRouter()
  const goHome = () => {
    if (pathname === ROUTES.HOME) return
    Router.push(ROUTES.HOME)
  }

  // SCROLLING
  // Get layout type
  const isMobileLayout = React.useRef(true)
  const setMobileLayout = () => {
    const isDesktopLayout = window.matchMedia('(min-width: 993px)').matches
    isMobileLayout.current = !isDesktopLayout
  }
  useOnResize({ callback: setMobileLayout })
  // Cache scroll vars
  const scrollCache = React.useRef({
    scrolledBy: 0,
    startUpscrollAt: 0,
  })
  const resetScrollCache = () => {
    scrollCache.current = {
      scrolledBy: 0,
      startUpscrollAt: 0,
    }
  }
  // On scroll toggle header
  const hiddenHeader = React.useRef(false)
  const toggleHeader = (state) => {
    if (state) {
      resetScrollCache()
      hiddenHeader.current = false
      return
    }
    hiddenHeader.current = true
  }
  const onScroll = React.useCallback(({ scrollTop, direction, delta }) => {
    // Do nothing if desktop
    if (!isMobileLayout.current) return
    // Show full header if scrolled above 40px
    const shrinkAt = 60
    if (scrollTop < shrinkAt) {
      toggleHeader(true)
      return
    }
    // The required amount to show the header
    const requiredScrollToShow = 30
    // When scrolling up...
    if (direction === 'up') {
      // If scrolling up and it's already visible STOP HERE
      if (!hiddenHeader.current) return
      // Else start calcing when it started scrolling
      scrollCache.current.startUpscrollAt = scrollCache.current.startUpscrollAt || scrollTop
      scrollCache.current.scrolledBy = scrollCache.current.startUpscrollAt - scrollTop
    } else {
      resetScrollCache()
    }
    // Show full header if scrolled up by required amount
    if (scrollCache.current.scrolledBy > requiredScrollToShow) {
      toggleHeader(true)
      return
    }
    // Else hide header if scrolling down fast enough
    if (delta > 1) {
      toggleHeader(false)
    }
  }, [])
  // Listen to scroll
  useOnScroll({ callback: onScroll, getDirection: true, getDelta: true, throttle: 20 })

  return (
    <header className={[
      styles.TheHeader,
      subNavOpen.open ? '_subNavOpen' : '',
      hiddenHeader.current ? styles._hidden : '',
    ].join(' ')}
    >
      {/* BG */}
      {isLoggedIn && <div className={[styles.background, styles.scrollHide].join(' ')} />}
      {/* LOGO */}
      <a
        id="TheLogo"
        onClick={goHome}
        role="button"
        title="home"
        className={[styles.logoContainer, styles.scrollHide].join(' ')}
      >
        <FeedLogo
          className={styles.logo}
          style={{ opacity: logoOpacity }}
          textColor={logoTextColor}
        />
      </a>
      {/* Page Header */}
      <PageHeader className={styles.pageTitle} />
      {/* Subnav button */}
      {isLoggedIn && (
        <TheSubNavButton
          toggleSubNav={toggleSubNav}
          navOpen={subNavOpen}
          className={[styles.subNavButton, styles.scrollHide].join(' ')}
        />
      )}
      {/* THE SUBNAV */}
      <TheSubNav show={showSubNav} setShow={toggleSubNav} />
    </header>
  )
}

export default TheHeader
