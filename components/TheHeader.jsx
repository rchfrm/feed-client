// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
// IMPORT COMPONENTS
import * as ROUTES from '../constants/routes'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
// IMPORT ELEMENTS
import FeedLogo from './icons/FeedLogo'
import MenuButton from './elements/MenuButton'
import Clear from './elements/Clear'
// IMPORT STYLES
import styles from './TheHeader.module.css'

function Header() {
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const toggleNav = () => navDispatch({ type: 'toggle' })
  const headerClass = navState.visible ? 'navOn' : 'navOff'
  return (
    <header className={['TheHeader', headerClass].join(' ')}>
      <Link href={ROUTES.HOME}>
        <a>
          <FeedLogo className={styles.logo} style={{ opacity: 0 }} />
        </a>
      </Link>
      <MenuButton navigation={navState.visible} onClick={toggleNav} />
      <Clear />
    </header>
  )
}

export default Header
