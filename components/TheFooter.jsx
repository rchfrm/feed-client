// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Feed from './elements/Feed'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES
// oter.css'

// GET CURRENT YEAR
const thisYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className={['TheFooter'].join(' ')}>

      <p className="xsmall--p  no-margin">
        &copy;
        {' '}
        {thisYear}
        {' '}
        <Feed />
        {' '}
        is an archForm product.
      </p>

    </footer>
  )
}

export default Footer
