import React from 'react'

import ThePageButtonsIcon from '@/app/ThePageButtonsIcon'
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
    matchingHrefs: [ROUTES.TOURNAMENTS],
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
    artistLoading,
    hasBudget,
    artist: { missingDefaultLink },
  } = React.useContext(ArtistContext)
  // Don't show buttons if no logged in
  if (!isLoggedIn) return null

  return (
    <div
      id="ThePageButtons"
      className={[styles.container, artistLoading ? styles._artistLoading : ''].join(' ')}
    >
      <nav className={styles.inner}>
        {links.map(({ href, title, icon, matchingHrefs }) => {
          const showBadge = (icon === 'controls' && !hasBudget && !missingDefaultLink)
            || (icon === 'posts' && missingDefaultLink)
          return (
            <div className={styles.link} key={href}>
              <ActiveLink href={href} activeClass={styles._active} matchingHrefs={matchingHrefs}>
                <a className={[
                  'relative',
                  styles.linkAnchor,
                  icon === 'posts' ? styles.linkAnchor_posts : null,
                ].join(' ')}
                >
                  <ThePageButtonsIcon
                    icon={icon}
                    className={[styles.linkIcon].join(' ')}
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
