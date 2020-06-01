
// IMPORT PACKAGES
import React from 'react'
import Router, { useRouter } from 'next/router'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT HOOKS
import useLoggedInTest from './hooks/useLoggedInTest'
// IMPORT ELEMENTS
import FeedLogo from './icons/FeedLogo'
import TheSubNavButton from './TheSubNavButton'
import PageHeader from './PageHeader'
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'
import * as ROUTES from '../constants/routes'
// IMPORT STYLES
import styles from './TheHeader.module.css'

function TheHeaderContents({ windowWidth, subNavOpen, toggleSubNav }) {
  // Check if logged in or not
  const isLoggedIn = useLoggedInTest()
  // Handle flash of oversized logo
  const [logoOpacity, setLogoOpacity] = React.useState(0)
  React.useEffect(() => {
    setLogoOpacity(1)
  }, [])
  // Toggle logo text on subnav
  const [logoTextColor, setLogoTextColor] = React.useState(brandColors.textColor)
  React.useEffect(() => {
    setLogoTextColor(subNavOpen ? brandColors.bgColor : brandColors.textColor)
  }, [subNavOpen])
  // Close sub-nav after artist changes
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  React.useEffect(() => {
    toggleSubNav(false)
    toggleSubNav(false)
  }, [artistId, artistLoading])
  // Go to home page
  const { pathname } = useRouter()
  const goHome = () => {
    if (pathname === ROUTES.HOME) return
    Router.push(ROUTES.HOME)
  }

  // TOGGLE HEADER FOR NARROW
  const [showHeader, setShowHeader] = React.useState(false)
  React.useEffect(() => {
    const showHeader = windowWidth >= 450
    setShowHeader(showHeader)
  }, [windowWidth])

  return (
    <header className={[
      styles.TheHeader,
      subNavOpen ? styles._subNavOpen : '',
    ].join(' ')}
    >
      {/* BG */}
      {isLoggedIn && <div className={[styles.background].join(' ')} />}
      {/* LOGO */}
      <a
        id="TheLogo"
        onClick={goHome}
        role="button"
        title="home"
        className={[styles.logoContainer].join(' ')}
      >
        <FeedLogo
          className={styles.logo}
          style={{ opacity: logoOpacity }}
          textColor={logoTextColor}
        />
      </a>
      {/* Page Header */}
      {showHeader && <PageHeader className={styles.pageTitle} />}
      {/* Subnav button */}
      {isLoggedIn && (
      <TheSubNavButton
        toggleSubNav={toggleSubNav}
        navOpen={subNavOpen}
        className={[styles.subNavButton].join(' ')}
      />
      )}
    </header>
  )
}

export default TheHeaderContents
