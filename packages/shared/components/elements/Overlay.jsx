
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
import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

function Overlay({ children, height }) {
  const color = utils.hexToRGBA(brandColors.offwhite, 0.6)

  return (
    <div className="overlay-outer">
      <div className="overlay-inner" style={{ backgroundColor: color, height: height + 1 }}>
        {children}
      </div>
    </div>
  )
}

Overlay.propTypes = {
  height: PropTypes.number.isRequired,
}

export default Overlay
