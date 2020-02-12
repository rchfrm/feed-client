import React from 'react'

import MenuIcon from '../../icons/MenuIcon'
import CrossIcon from '../../icons/CrossIcon'

function MenuButton(props) {
  // const iconSRC = props.navigation ? closeMenu : openMenu;

  return (
    <button type="button" className="menuButton" onClick={props.onClick}>
      {props.navigation
        ? <CrossIcon fill="#ffffff" width="100%" />
        : <MenuIcon fill="#000000" width="100%" />}
    </button>
  )
}

export default MenuButton
