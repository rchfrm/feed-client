// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
// IMPORT COMPONENTS
import * as ROUTES from '../constants/routes'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
// IMPORT ELEMENTS
import FeedLogo from './icons/FeedLogo'
import SubNavButton from './SubNavButton'
import PageHeader from './PageHeader'
import TheSubNav from './TheSubNav'
// IMPORT STYLES
import styles from './TheHeader.module.css'

function TheHeader() {
  // Handle flash of oversized logo
  const [logoOpacity, setLogoOpacity] = React.useState(0)
  React.useEffect(() => {
    setLogoOpacity(1)
  }, [])
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const toggleNav = () => navDispatch({ type: 'toggle' })
  const headerClass = navState.visible ? 'navOn' : 'navOff'
  return (
    <header className={[styles.TheHeader, styles[headerClass]].join(' ')}>
      {/* LOGO */}
      <Link href={ROUTES.HOME}>
        <a>
          <FeedLogo className={styles.logo} style={{ opacity: logoOpacity }} />
        </a>
      </Link>
      {/* Page Header */}
      <PageHeader className={styles.pageTitle} heading="page title" />
      {/* Subnav button */}
      <SubNavButton
        toggleNav={toggleNav}
        navOn={navState.visible}
        className={styles.subNavButton}
      />
      {/* THE SUBNAV */}
      {navState.visible && <TheSubNav />}
    </header>
  )
}

export default TheHeader
