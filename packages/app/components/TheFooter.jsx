import React from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import TheFooterLinks from '@/app/TheFooterLinks'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import Feed from '@/elements/Feed'
import * as ROUTES from '@/app/constants/routes'
import styles from '@/app/TheFooter.module.css'

// GET CURRENT YEAR
const thisYear = new Date().getFullYear()

const Footer = () => {
  const isLoggedIn = useLoggedInTest()

  const { pathname } = useRouter()
  const isGetStartedPage = pathname === ROUTES.GET_STARTED

  const { auth } = React.useContext(AuthContext)
  const { user } = React.useContext(UserContext)

  return (
    <footer className={[styles.TheFooter, isLoggedIn ? styles._loggedIn : ''].join(' ')}>
      {(! isLoggedIn || user.is_email_verification_needed || isGetStartedPage) && (
        <TheFooterLinks hasAuth={!! auth.token} />
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
