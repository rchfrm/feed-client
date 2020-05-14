// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
// IMPORT COMPONENTS
import * as ROUTES from '../constants/routes'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT HOOKS
import useLoggedInTest from './hooks/useLoggedInTest'
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
  const { subNavOpen, toggleSubNav, setSubNav } = React.useContext(InterfaceContext)
  const [headerClass, setHeaderClass] = React.useState('')
  const [logoTextColor, setLogoTextColor] = React.useState(brandColors.textColor)
  React.useEffect(() => {
    // Toggle header class
    const headerClass = subNavOpen.open ? '_subNavOpen' : ''
    setHeaderClass(headerClass)
    // Toggle logo text
    setLogoTextColor(subNavOpen ? brandColors.bgColor : brandColors.textColor)
  }, [subNavOpen])
  // Close sub-nav after artist changes
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  React.useEffect(() => {
    setSubNav(false)
  }, [artistId, artistLoading])

  return (
    <header className={[styles.TheHeader, styles[headerClass]].join(' ')}>
      {/* LOGO */}
      <Link href={ROUTES.HOME}>
        <a>
          <FeedLogo className={styles.logo} style={{ opacity: logoOpacity }} textColor={logoTextColor} />
        </a>
      </Link>
      {/* Page Header */}
      <PageHeader className={styles.pageTitle} heading="page title" />
      {/* Subnav button */}
      {isLoggedIn && (
        <TheSubNavButton
          toggleSubNav={toggleSubNav}
          navOpen={subNavOpen}
          className={styles.subNavButton}
        />
      )}
      {/* THE SUBNAV */}
      {subNavOpen && isLoggedIn && <TheSubNav />}
    </header>
  )
}

export default TheHeader
