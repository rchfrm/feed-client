import React from 'react'

import Div100vh from 'react-div-100vh'

import TheSubNavArtists from './TheSubNavArtists'
import TheSubNavLinks from './TheSubNavLinks'

import styles from './TheSubNav.module.css'

const TheSubNav = () => {
  return (
    <Div100vh className={['page--content', '_fixed', styles.container].join(' ')}>
      <TheSubNavArtists />
      <TheSubNavLinks />
    </Div100vh>
  )
}

export default TheSubNav
