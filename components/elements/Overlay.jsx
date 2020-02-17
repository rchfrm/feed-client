
// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

// IMPORT ASSETS
// IMPORT COMPONENTS
// IMPORT CONSTANTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT HELPERS
// IMPORT PAGES
// IMPORT STYLES
import helper from '../helpers/helper'
import brandColours from '../../constants/brandColours'

function Overlay({ children, height }) {
  const colour = helper.hexToRGBA(brandColours.white.hex, 0.6)

  return (
    <div className="overlay-outer">
      <div className="overlay-inner" style={{ backgroundColor: colour, height: height + 1 }}>
        {children}
      </div>
    </div>
  )
}

Overlay.propTypes = {
  height: PropTypes.number.isRequired,
}

export default Overlay
