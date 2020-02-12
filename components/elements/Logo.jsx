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

function Logo({ navigation, onClick }) {
  const fill = navigation ? '#ffffff' : '#000000'
  return (
    <button type="button" className="logoButton" onClick={onClick}>
      <ArchFormLogo
        fill={fill}
        width="100%"
      />
    </button>
  )
}

export default Logo
