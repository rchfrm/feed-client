// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
import BrokenCircle from '../icons/BrokenCircle'
// IMPORT CONSTANTS
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS

function Spinner({ width, colour, className }) {
  return (
    <div className={['spinner', className].join(' ')}>
      <BrokenCircle width={width} fill={colour} />
    </div>
  )
}

Spinner.propTypes = {
  colour: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  colour: brandColours.loaderColor,
  width: 50,
  className: '',
}

export default Spinner
