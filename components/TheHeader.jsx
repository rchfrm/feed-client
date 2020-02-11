// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
// IMPORT ELEMENTS
import Logo from './elements/Logo'
import MenuButton from './elements/MenuButton'
import Clear from './elements/Clear'
// IMPORT STYLES
// import './header.css'

function Header() {
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const toggleNav = () => navDispatch({ type: 'toggle' })
  const backgroundColor = navState.visible ? 'black' : 'white'

  return (
    <header style={{ backgroundColor }}>
      <Logo navigation={navState.visible} />
      <MenuButton navigation={navState.visible} onClick={toggleNav} />
      <Clear />
    </header>
  )
}

export default Header
