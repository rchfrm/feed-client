// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import TheFooterLinks from './TheFooterLinks'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT HOOKS
import useLoggedInTest from './hooks/useLoggedInTest'
// IMPORT ELEMENTS
import Feed from './elements/Feed'

// GET CURRENT YEAR
const thisYear = new Date().getFullYear()

const Footer = () => {
  const isLoggedIn = useLoggedInTest()
  // Import interface context
  const { globalLoading } = React.useContext(InterfaceContext)
  if (globalLoading) return null
  return (
    <footer className={['TheFooter', isLoggedIn ? '_loggedIn' : ''].join(' ')}>
      {!isLoggedIn && (
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
