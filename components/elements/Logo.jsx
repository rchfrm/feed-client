// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
import ArchFormLogo from '../icons/ArchFormLogo'
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function Logo({ navigation }) {
  const colorClass = navigation ? 'navOn' : 'navOff'
  return (
    <div className={['LogoButton', colorClass].join(' ')}>
      <ArchFormLogo
        width="100%"
      />
    </div>
  )
}

export default Logo
