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
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const toggleNav = () => navDispatch({ type: 'toggle' })
  const headerClass = navState.visible ? 'navOn' : 'navOff'
  return (
    <header className={[styles.TheHeader, styles[headerClass]].join(' ')}>
      {/* LOGO */}
      <Link href={ROUTES.HOME}>
        <a>
          <FeedLogo className={styles.logo} style={{ opacity: 1 }} />
        </a>
      </Link>
      {/* Page Header */}
      <PageHeader className={styles.pageTitle} heading="page title" />
      {/* Subnav button */}
      <SubNavButton className={styles.subNavButton} />
      {/* THE SUBNAV */}
      <TheSubNav />
    </header>
  )
}

export default TheHeader
