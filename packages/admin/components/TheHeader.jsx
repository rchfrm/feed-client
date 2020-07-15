import React from 'react'
import ActiveLink from '@/elements/ActiveLink'
import * as ROUTES from '@/admin/constants/routes'

import useLoggedInTest from '@/hooks/useLoggedInTest'
import SignOutLink from '@/SignOutLink'

import styles from '@/admin/TheHeader.module.css'

const links = [
  'ARTISTS',
  'USERS',
  'ORGANISATION',
  'TOURNAMENTS',
]

const TheHeader = () => {
  const isLoggedIn = useLoggedInTest()
  if (!isLoggedIn) return null
  return (
    <header className={[].join(' ')}>
      <nav className={['flex', 'flex-wrap', styles.links].join(' ')}>
        {links.map((link) => {
          // eslint-disable-next-line
          const path = ROUTES[link]
          const linkText = link.toLowerCase()
          return (
            <ActiveLink key={path} href={path}>
              <a className={['mr-8', 'mb-5', styles.link].join(' ')}>{linkText}</a>
            </ActiveLink>
          )
        })}
        <SignOutLink className="ml-auto" />
      </nav>
    </header>
  )
}

export default TheHeader
