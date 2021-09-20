import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/landing/TheHeaderHamburger.module.scss'

const TheHeaderHamburger = ({ linksOpen, toggleLinks, className }) => {
  return (
    <button
      className={[
        styles.hamburger,
        styles['hamburger--slider'],
        linksOpen ? styles['is-active'] : null,
        className,
      ].join(' ')}
      type="button"
      aria-label="Open menu"
      onClick={toggleLinks}
    >
      <span className={styles['hamburger-box']}>
        <span className={styles['hamburger-inner']} />
      </span>
    </button>

  )
}

TheHeaderHamburger.propTypes = {
  linksOpen: PropTypes.bool.isRequired,
  toggleLinks: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TheHeaderHamburger.defaultProps = {
  className: null,
}

export default TheHeaderHamburger
