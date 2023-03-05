import React from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import FooterLinks from '@/app/FooterLinks'
import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import Feed from '@/elements/Feed'
import styles from '@/app/Footer.module.css'

const thisYear = new Date().getFullYear()

const Footer = () => {
  const isLoggedIn = useLoggedInTest()
  const { auth } = React.useContext(AuthContext)
  const { hasNav } = React.useContext(InterfaceContext)

  return (
    <footer className={[styles.Footer, isLoggedIn ? styles._loggedIn : ''].join(' ')}>
      {(! hasNav) && (
        <FooterLinks hasAuth={!! auth.token} />
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
