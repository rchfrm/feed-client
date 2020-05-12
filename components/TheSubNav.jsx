import React from 'react'
import PropTypes from 'prop-types'

import styles from './TheSubNav.module.css'

const TheSubNav = () => {
  return (
    <nav className={['page--content', styles.container].join(' ')}>
      <div className={styles.selectArtist}>ARTIST</div>
      <div className={styles.links}>LINKS</div>
    </nav>
  )
}

TheSubNav.propTypes = {
  
}

export default TheSubNav
