import React from 'react'
import PropTypes from 'prop-types'

import Anchor from '@/landing/elements/Anchor'

import copy from '@/landing/copy/LandingPageCopy'

import * as styles from '@/landing/TheHeader.module.css'

const TheHeaderPageLinks = ({ onHomePage, toggleLinks }) => {
  const { navigation: { headerLinks } } = copy
  return headerLinks.map(({ href, text }, index) => {
    let newHref = href
    if (!onHomePage && href.startsWith('#')) {
      newHref = `/${href}`
    }
    return (
      <p key={index} className={[styles.navLink, 'TheHeaderPageLink'].join(' ')}>
        <Anchor
          className={[
            'button button--text',
            styles.navPageLink,
          ].join(' ')}
          href={newHref}
          activeClass={styles._active}
          onClick={() => {
            toggleLinks(false)
          }}
        >
          <span className="button--inner">{text}</span>
        </Anchor>
      </p>
    )
  })
}

TheHeaderPageLinks.propTypes = {
  onHomePage: PropTypes.bool.isRequired,
  toggleLinks: PropTypes.func,
}

TheHeaderPageLinks.defaultProps = {
  toggleLinks: () => {},
}

export default TheHeaderPageLinks
