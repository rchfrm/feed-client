import React from 'react'

import ThePageButtonsIcon from '@/app/ThePageButtonsIcon'
import ThePageButtonsNotification from '@/app/ThePageButtonsBadge'
import ActiveLink from '@/elements/ActiveLink'

import { ArtistContext } from '@/contexts/ArtistContext'

import useLoggedInTest from '@/hooks/useLoggedInTest'

import styles from '@/app/ThePageButtons.module.css'

import * as ROUTES from '@/app/constants/routes'

const links = [
  {
    href: ROUTES.POSTS,
    title: 'posts',
    icon: 'posts',
  },
  {
    href: ROUTES.CONTROLS,
    title: 'controls',
    icon: 'controls',
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
  const {
    artistCurrency,
    artistId,
    artistLoading,
    hasBudget,
  } = React.useContext(ArtistContext)
  const [currency, setCurrency] = React.useState('')
  React.useEffect(() => {
    if (!artistId) return
    setCurrency(artistCurrency || '')
  }, [artistId, artistCurrency])
  // Don't show buttons if no logged in
  if (!isLoggedIn) return null

  console.log('hasBudget', hasBudget)

  return (
    <div
      id="ThePageButtons"
      className={[styles.container, artistLoading ? styles._artistLoading : ''].join(' ')}
    >
      <nav className={styles.inner}>
        {links.map(({ href, title, icon }) => {
          const showBadge = icon === 'controls' && !hasBudget
          return (
            <div className={styles.link} key={href}>
              <ActiveLink href={href} activeClass={styles._active}>
                <a className={[styles.linkAnchor, 'relative'].join(' ')}>
                  <ThePageButtonsIcon
                    icon={icon}
                    className={styles.linkIcon}
                    currency={currency}
                    showBadge={showBadge}
                  />
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
