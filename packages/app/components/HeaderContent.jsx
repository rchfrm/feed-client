import React from 'react'
import Router, { useRouter } from 'next/router'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import useNotificationsStore from '@/app/stores/notificationsStore'
import FeedLogo from '@/icons/FeedLogo'
import TheSubNavButton from '@/app/TheSubNavButton'
import PageHeader from '@/app/PageHeader'
import ProfileStatus from '@/app/ProfileStatus'
import ProfileStatusMobile from '@/app/ProfileStatusMobile'
import brandColors from '@/constants/brandColors'
import * as ROUTES from '@/app/constants/routes'
import styles from '@/app/Header.module.css'

const getTotalActiveNotifications = (state) => state.totalActiveNotifications

function HeaderContent({
  windowWidth,
  subNavOpen,
  toggleSubNav,
  isLoggedIn,
  mobileHeader,
}) {
  const [logoOpacity, setLogoOpacity] = React.useState(0)
  const [logoTextColor, setLogoTextColor] = React.useState(brandColors.textColor)
  const [backgroundStyle, setBackgroundStyle] = React.useState({})

  const { artistId, artistLoading } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)
  const { pathname } = useRouter()
  const totalNotificationsUnread = useNotificationsStore(getTotalActiveNotifications)

  const isGetStartedPage = pathname === ROUTES.GET_STARTED
  const hasSideNav = isLoggedIn && user?.id && ! user.is_email_verification_needed && ! isGetStartedPage

  React.useEffect(() => {
    setLogoOpacity(1)
  }, [])

  React.useEffect(() => {
    setLogoTextColor(subNavOpen ? brandColors.bgColor : brandColors.textColor)
  }, [subNavOpen])

  React.useEffect(() => {
    toggleSubNav(false)
  }, [artistId, artistLoading, toggleSubNav])

  const goHome = () => {
    if (pathname === ROUTES.HOME) {
      return
    }

    Router.push(ROUTES.HOME)
  }

  React.useEffect(() => {
    setBackgroundStyle({
      width: windowWidth,
      marginLeft: windowWidth / -2,
    })
  }, [windowWidth])

  return (
    <>
      {mobileHeader && hasSideNav && <ProfileStatusMobile backgroundStyle={backgroundStyle} />}
      <header className={[
        styles.TheHeader,
        subNavOpen ? styles._subNavOpen : '',
        ! hasSideNav ? styles.hasNoSideNav : '',
        mobileHeader ? 'relative' : null,
      ].join(' ')}
      >
        <div className={[styles.background].join(' ')} style={backgroundStyle} />
        <div className={[styles.dropShadow].join(' ')} style={backgroundStyle} />
        <a
          id="TheLogo"
          onClick={goHome}
          role="button"
          title="home"
          className={[
            styles.logoContainer,
            ! hasSideNav ? styles.hasNoSideNav : '',
          ].join(' ')}
        >
          <FeedLogo
            className={styles.logo}
            style={{ opacity: logoOpacity }}
            textColor={logoTextColor}
          />
        </a>
        <PageHeader className={styles.pageTitle} />
        {hasSideNav && (
          <>
            {! mobileHeader && <ProfileStatus />}
            <TheSubNavButton
              toggleSubNav={toggleSubNav}
              navOpen={subNavOpen}
              hasNotifactions={!! totalNotificationsUnread}
              className={[styles.subNavButton].join(' ')}
            />
          </>
        )}
      </header>
    </>
  )
}

export default HeaderContent
