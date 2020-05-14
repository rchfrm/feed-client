import React from 'react'

import * as ROUTES from '../constants/routes'

import ThePageButtonsIcon from './ThePageButtonsIcon'
import ActiveLink from './ActiveLink'

import styles from './ThePageButtons.module.css'

const links = [
  {
    href: ROUTES.BUDGET,
    title: 'budget',
    icon: 'budget',
  },
  {
    href: ROUTES.POSTS,
    title: 'posts',
    icon: 'posts',
  },
  {
    href: ROUTES.RESULTS,
    title: 'results',
    icon: 'results',
  },
  {
    href: ROUTES.INSIGHTS,
    title: 'insights',
    icon: 'insights',
  },
]

const ThePageButtons = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.inner}>
        {links.map(({ href, title, icon }) => {
          return (
            <div className={styles.link} key={icon}>
              <ActiveLink href={href} activeClass={styles._active}>
                <a className={styles.linkAnchor}>
                  <ThePageButtonsIcon icon={icon} className={styles.linkIcon} />
                  <p className={styles.linkTitle}>{ title }</p>
                </a>
              </ActiveLink>
            </div>
          )
        })}
      </nav>
    </div>
  )
}

ThePageButtons.propTypes = {

}

export default ThePageButtons
