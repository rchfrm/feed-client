// IMPORT PACKAGES
import React from 'react'
import Router, { useRouter } from 'next/router'
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import useNotificationsStore from '@/app/store/notificationsStore'
// IMPORT HOOKS
import useLoggedInTest from '@/hooks/useLoggedInTest'
// IMPORT ELEMENTS
import FeedLogo from '@/icons/FeedLogo'
import TheSubNavButton from '@/app/TheSubNavButton'
import PageHeader from '@/app/PageHeader'
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'
import * as ROUTES from '@/app/constants/routes'
// IMPORT STYLES
import styles from '@/app/TheHeader.module.css'

const getTotalUnreadNotifications = state => state.totalUnreadNotifications

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
  }, [artistId, artistLoading, toggleSubNav])
  // Go to home page
  const { pathname } = useRouter()
  const goHome = () => {
    if (pathname === ROUTES.HOME) return
    Router.push(ROUTES.HOME)
  }

  // TOGGLE HEADER FOR NARROW
  // & Resize background
  const [showHeader, setShowHeader] = React.useState(false)
  const [backgroundStyle, setBackgroundStyle] = React.useState({})
  React.useEffect(() => {
    // Set header or not
    const showHeader = windowWidth >= 450
    setShowHeader(showHeader)
    // Resize header bg
    setBackgroundStyle({
      width: windowWidth,
      marginLeft: windowWidth / -2,
    })
  }, [windowWidth])

  // FETCH NOTIFICATIONS
  const totalNotificationsUnread = useNotificationsStore(getTotalUnreadNotifications)

  return (
    <header className={[
      styles.TheHeader,
      subNavOpen ? styles._subNavOpen : '',
    ].join(' ')}
    >
      {/* BG */}
      {isLoggedIn && (
        <>
          <div className={[styles.background].join(' ')} style={backgroundStyle} />
          <div className={[styles.dropShadow].join(' ')} style={backgroundStyle} />
        </>
      )}
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
        hasNotifactions={!!totalNotificationsUnread}
        className={[styles.subNavButton].join(' ')}
      />
      )}
    </header>
  )
}

export default TheHeaderContents
