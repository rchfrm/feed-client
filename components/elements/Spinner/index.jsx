// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
import BrokenCircle from '../../icons/BrokenCircle'
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES
import './spinner.css'

function Spinner(props) {
// REDEFINE PROPS AS VARIABLES
  const { width } = props
  const { colour } = props
  // END REDEFINE PROPS AS VARIABLES

  return (
    <div className="spinner">
      <BrokenCircle width={width} fill={colour} />
    </div>
  )
}

export default Spinner
