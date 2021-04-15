// IMPORT PACKAGES
import React from 'react'
import { AuthContext } from '@/contexts/AuthContext'
// IMPORT COMPONENTS
import TheFooterLinks from '@/app/TheFooterLinks'
// IMPORT HOOKS
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
// IMPORT ELEMENTS
import Feed from '@/elements/Feed'

import styles from '@/app/TheFooter.module.css'

// GET CURRENT YEAR
const thisYear = new Date().getFullYear()

const Footer = () => {
  const isLoggedIn = useLoggedInTest()
  const { auth } = React.useContext(AuthContext)

  return (
    <footer className={[styles.TheFooter, isLoggedIn ? styles._loggedIn : ''].join(' ')}>
      {!isLoggedIn && (
        <TheFooterLinks hasAuth={!!auth.token} />
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
