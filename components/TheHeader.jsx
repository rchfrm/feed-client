// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
// IMPORT COMPONENTS
import * as ROUTES from '../constants/routes'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
// IMPORT ELEMENTS
import Logo from './elements/Logo'
import MenuButton from './elements/MenuButton'
import Clear from './elements/Clear'
// IMPORT STYLES
// ader.css'

function Header() {
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const toggleNav = () => navDispatch({ type: 'toggle' })
  const backgroundColor = navState.visible ? 'black' : 'white'

  return (
    <header style={{ backgroundColor }}>
      <Link href={ROUTES.HOME}>
        <a>
          <Logo navigation={navState.visible} />
        </a>
      </Link>
      <MenuButton navigation={navState.visible} onClick={toggleNav} />
      <Clear />
    </header>
  )
}

export default Header
