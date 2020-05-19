import React from 'react'

import Div100vh from 'react-div-100vh'

import TheSubNavArtists from './TheSubNavArtists'
import TheSubNavLinks from './TheSubNavLinks'
import SignOutLink from './SignOutLink'

import styles from './TheSubNav.module.css'

const TheSubNav = () => {
  return (
    <Div100vh className={['page--content', '_fixed', styles.container].join(' ')}>
      <div className={[styles.inner, 'md:grid', 'md:grid-cols-12', 'md:items-center'].join(' ')}>
        <TheSubNavLinks className="col-span-6" />
        <TheSubNavArtists className="col-span-6" />
      </div>
      <p className={styles.signOutLink}>
        <SignOutLink />
      </p>
    </Div100vh>
  )
}

export default TheSubNav
