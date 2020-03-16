import React from 'react'

import MenuIcon from '../icons/MenuIcon'
import CrossIcon from '../icons/CrossIcon'

import styles from '../TheHeader.module.css'

function MenuButton({ onClick, navigation }) {
  const colorClass = navigation ? 'navOn' : 'navOff'

  return (
    <button
      type="button"
      className={['MenuButton', colorClass, styles.menuButton].join(' ')}
      onClick={onClick}
    >
      {navigation
        ? <CrossIcon width="100%" />
        : <MenuIcon width="100%" />}
    </button>
  )
}

export default MenuButton
