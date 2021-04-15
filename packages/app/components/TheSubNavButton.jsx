import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'
import FlipContainer from '@/elements/FlipContainer'
import ArtistImage from '@/elements/ArtistImage'
import NotificationDot from '@/elements/NotificationDot'

import CloseCircle from '@/icons/CloseCircle'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import styles from '@/app/TheSubNavButton.module.css'

const TheSubNavButton = ({
  toggleSubNav,
  navOpen,
  hasNotifactions,
  className,
}) => {
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)
  const [fbPageId, setFbPageId] = React.useState('')
  const { hasPendingEmail } = React.useContext(UserContext)

  React.useEffect(() => {
    const { facebook_page_id } = artist
    if (!artistId || !facebook_page_id) return
    setFbPageId(facebook_page_id)
  // eslint-disable-next-line
  }, [artistId])

  const runToggle = () => {
    if (artistLoading) return
    toggleSubNav()
  }

  return (
    <a
      id="TheSubNavButton"
      role="button"
      onClick={runToggle}
      className={[className, styles.button].join(' ')}
      aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
    >
      {((hasNotifactions && !navOpen && !artistLoading) || hasPendingEmail) && (
        <NotificationDot size="medium" style={{ top: '-0.1rem', right: '-0.1rem', zIndex: 3 }} />
      )}
      <FlipContainer
        frontContent={(
          <figure className={styles.image}>
            {artistLoading ? (
              <Spinner className={styles.spinner} />
            )
              : (
                <ArtistImage pageId={fbPageId} name={artist.name} />
              )}
          </figure>
        )}
        backContent={(
          <div className={styles.backIcon_inner}>
            <CloseCircle />
          </div>
        )}
        containerClass={[styles.container].join(' ')}
        isFlipped={navOpen}
        innerClass={styles.inner}
        frontClass={styles.frontIcon}
        backClass={styles.backIcon}
      />
      <p className={styles.buttonTitle}>{navOpen ? 'close' : 'menu'}</p>
    </a>
  )
}

TheSubNavButton.propTypes = {
  toggleSubNav: PropTypes.func.isRequired,
  navOpen: PropTypes.bool.isRequired,
  hasNotifactions: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TheSubNavButton.defaultProps = {
  className: '',
}


export default TheSubNavButton
