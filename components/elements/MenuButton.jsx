import React from 'react'

import MenuIcon from '../icons/MenuIcon'
import CrossIcon from '../icons/CrossIcon'

function MenuButton({ onClick, navigation }) {
  // const iconSRC = props.navigation ? closeMenu : openMenu;

  return (
    <button type="button" className="menuButton" onClick={onClick}>
      {navigation
        ? <CrossIcon fill="#ffffff" width="100%" />
        : <MenuIcon fill="#000000" width="100%" />}
    </button>
  )
}

export default MenuButton
