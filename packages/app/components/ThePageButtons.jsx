import React from 'react'
import { useRouter } from 'next/router'

import ThePageButtonsIcon from '@/app/ThePageButtonsIcon'
import ActiveLink from '@/elements/ActiveLink'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import useLoggedInTest from '@/app/hooks/useLoggedInTest'
import useBrowserStore from '@/hooks/useBrowserStore'

import styles from '@/app/ThePageButtons.module.css'

import * as ROUTES from '@/app/constants/routes'

const showBadgeTest = ({ icon, hasBudget, missingDefaultLink, isSpendingPaused }) => {
  // CONTROLS PAGE
  if (icon === 'controls') {
    // No budget
    if (!hasBudget && !missingDefaultLink) return true
    // Spending paused
    if (isSpendingPaused && !missingDefaultLink) return true
  }
  // POSTS PAGE
  if (icon === 'posts' && missingDefaultLink) return true
  // No badge
  return false
}

const ThePageButtons = () => {
  const isLoggedIn = useLoggedInTest()
  const { user } = React.useContext(UserContext)
  const { device = {} } = useBrowserStore()
  const { isMobile, isIOS } = device

  const { pathname } = useRouter()
  const isGetStartedPage = pathname === ROUTES.GET_STARTED
  // Get currency from artist
  const {
    artistLoading,
    hasBudget,
    artist: {
      missingDefaultLink,
      isSpendingPaused,
      feedMinBudgetInfo: {
        currencyCode,
      },
    } = {},
  } = React.useContext(ArtistContext)

  console.log(currencyCode)

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
      matchingHrefs: ROUTES.controlsPages,
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
    {
      href: ROUTES.MYREFERRAL,
      title: currencyCode === 'USD' ? '$100' : '£75',
      icon: 'referral',
    },
  ]

  // Don't show buttons if no logged in
  if (!isLoggedIn || user.is_email_verification_needed || isGetStartedPage) return null

  return (
    <div
      id="ThePageButtons"
      className={[
        styles.container,
        artistLoading ? styles._artistLoading : null,
        isIOS && isMobile ? styles.ios_mobile : null,
      ].join(' ')}
    >
      <nav className={styles.inner}>
        {links.map(({ href, title, icon, matchingHrefs }) => {
          const showBadge = showBadgeTest({ icon, hasBudget, missingDefaultLink, isSpendingPaused })
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
