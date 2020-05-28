// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import TheFooterLinks from './TheFooterLinks'
// IMPORT HOOKS
import useLoggedInTest from './hooks/useLoggedInTest'
// IMPORT ELEMENTS
import Feed from './elements/Feed'

// GET CURRENT YEAR
const thisYear = new Date().getFullYear()

const Footer = () => {
  const isLoggedIn = useLoggedInTest()

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
