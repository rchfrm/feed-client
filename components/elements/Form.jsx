// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Clear from './Clear'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function Form(props) {
  const width = props.width || ''
  const position = props.position || ''
  return (
    <form className={`${width} ${position}`}>

      {props.children}

      <Clear />

    </form>
  )
}

export default Form
