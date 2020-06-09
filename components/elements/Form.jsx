// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Clear from '@/elements/Clear'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function Form({ width = '', position = '', children }) {
  return (
    <form className={`${width} ${position}`}>
      {children}
      <Clear />
    </form>
  )
}

export default Form
