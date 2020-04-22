// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
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
  const { navState } = React.useContext(NavigationContext)
  const footerClass = navState.visible ? 'navOn' : 'navOff'
  return (
    <footer className={['TheFooter', footerClass].join(' ')}>

      <p className="xsmall--p no-margin">
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
