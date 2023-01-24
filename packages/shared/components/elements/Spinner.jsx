// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
import BrokenCircle from '@/icons/BrokenCircle'
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'
// IMPORT HELPERS

function Spinner({ width, fill, className }) {
  return (
    <div className={['spinner', className].join(' ')}>
      <BrokenCircle width={width} fill={fill} />
    </div>
  )
}

Spinner.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  fill: brandColors.green,
  width: 50,
  className: '',
}

export default Spinner
