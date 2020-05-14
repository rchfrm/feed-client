// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import TheFooterLinks from './TheFooterLinks'
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
// IMPORT ELEMENTS
import Feed from './elements/Feed'

// GET CURRENT YEAR
const thisYear = new Date().getFullYear()

const Footer = () => {
  // Check if logged in or not
  const { auth } = React.useContext(AuthContext)
  const loggedIn = React.useMemo(() => {
    return !!auth.token
  }, [auth.token])

  return (
    <footer className={['TheFooter'].join(' ')}>
      {!loggedIn && (
        <TheFooterLinks />
      )}

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
