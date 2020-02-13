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
  const fill = navigation ? '#ffffff' : '#000000'
  return (
    <div className="logoButton">
      <ArchFormLogo
        fill={fill}
        width="100%"
      />
    </div>
  )
}

export default Logo
