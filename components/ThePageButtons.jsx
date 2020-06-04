import React from 'react'

import * as ROUTES from '../constants/routes'

import ThePageButtonsIcon from './ThePageButtonsIcon'
import ActiveLink from './ActiveLink'

import { ArtistContext } from './contexts/Artist'

import useLoggedInTest from './hooks/useLoggedInTest'

import styles from './ThePageButtons.module.css'

const links = [
  {
    href: ROUTES.POSTS,
    title: 'posts',
    icon: 'posts',
  },
  {
    href: ROUTES.BUDGET,
    title: 'budget',
    icon: 'budget',
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
  const isLoggedIn = useLoggedInTest()
  // Get currency from artist
  const { artistCurrency, artistId, artistLoading } = React.useContext(ArtistContext)
  const [currency, setCurrency] = React.useState('')
  React.useEffect(() => {
    if (!artistId) return
    setCurrency(artistCurrency || '')
  }, [artistId, artistCurrency])
  // Don't show buttons if no logged in
  if (!isLoggedIn) return null

  return (
    <div
      id="ThePageButtons"
      className={[styles.container, artistLoading ? styles._artistLoading : ''].join(' ')}
    >
      <nav className={styles.inner}>
        {links.map(({ href, title, icon }) => {
          return (
            <div className={styles.link} key={icon}>
              <ActiveLink href={href} activeClass={styles._active}>
                <a className={styles.linkAnchor}>
                  <ThePageButtonsIcon icon={icon} className={styles.linkIcon} currency={currency} />
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
