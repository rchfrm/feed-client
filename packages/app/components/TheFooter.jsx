// IMPORT PACKAGES
import React from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
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
  const { user } = React.useContext(UserContext)

  return (
    <footer className={[styles.TheFooter, isLoggedIn ? styles._loggedIn : ''].join(' ')}>
      {(!isLoggedIn || user.is_email_verification_needed) && (
        <TheFooterLinks hasAuth={!!auth.token} />
      )}

      <p className="xsmall--p  no-margin">
        &copy;
        {' '}
        {thisYear}
        {' '}
        <Feed />
      </p>

    </footer>
  )
}

export default Footer
