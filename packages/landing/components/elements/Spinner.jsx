// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
import BrokenCircle from '@/landing/icons/BrokenCircle'
// IMPORT CONSTANTS
import brandColors from '@/landing/constants/brandColors'
// IMPORT HELPERS

function Spinner({ width, color, className }) {
  return (
    <div className={['spinner', className].join(' ')}>
      <BrokenCircle width={width} fill={color} />
    </div>
  )
}

Spinner.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  color: brandColors.loaderColor,
  width: 50,
  className: '',
}

export default Spinner
