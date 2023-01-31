import React from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import TheFooterLinks from '@/app/TheFooterLinks'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import Feed from '@/elements/Feed'
import styles from '@/app/TheFooter.module.css'

// GET CURRENT YEAR
const thisYear = new Date().getFullYear()

const Footer = () => {
  const isLoggedIn = useLoggedInTest()
  const { auth } = React.useContext(AuthContext)
  const { hasNav } = React.useContext(InterfaceContext)

  return (
    <footer className={[styles.TheFooter, isLoggedIn ? styles._loggedIn : ''].join(' ')}>
      {(! hasNav) && (
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
