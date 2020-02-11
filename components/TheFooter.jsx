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
// import './footer.css'

// GET CURRENT YEAR
const thisYear = new Date().getFullYear()

function Footer() {
  const { navState } = React.useContext(NavigationContext)
  const textColor = navState.visible ? 'white' : 'black'
  const bgColor = navState.visible ? 'black' : 'white'
  return (
    <footer
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >

      <p className="small-p no-margin">
        &copy;
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
