import React from 'react'

import * as ROUTES from '../constants/routes'

import ThePageButtonsIcon from './ThePageButtonsIcon'
import ActiveLink from './ActiveLink'

import styles from './ThePageButtons.module.css'

const links = [
  {
    href: ROUTES.BUDGET,
    title: 'budget',
  },
  {
    href: ROUTES.POSTS,
    title: 'posts',
  },
  {
    href: ROUTES.RESULTS,
    title: 'results',
  },
  {
    href: ROUTES.INSIGHTS,
    title: 'insights',
  },
]

const ThePageButtons = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.inner}>
        {links.map(({ href, title }) => {
          return (
            <div className={styles.link} key={href}>
              <ActiveLink href={href}>
                <ThePageButtonsIcon className={styles.icon} />
                <a className={styles.linkAnchor}>{ title }</a>
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
