import React from 'react'
import PropTypes from 'prop-types'

import ArtistImage from './elements/ArtistImage'
import CloseCircle from './icons/CloseCircle'

import { ArtistContext } from './contexts/Artist'

import styles from './TheSubNavButton.module.css'

const TheSubNavButton = ({ toggleSubNav, navOpen, className }) => {
  const { artist, artistId } = React.useContext(ArtistContext)
  const [fbPageId, setFbPageId] = React.useState('')

  React.useEffect(() => {
    const { facebook_page_id } = artist
    if (!artistId || !facebook_page_id) return
    setFbPageId(facebook_page_id)
  }, [artistId])

  return (
    <button className={[styles.container, className, navOpen ? styles._navOpen : ''].join(' ')} onClick={toggleSubNav}>
      <div className={styles.inner}>
        <div className={styles.frontIcon}>
          <figure className={styles.image}>
            {fbPageId && <ArtistImage pageId={fbPageId} name={artist.name} />}
          </figure>
        </div>
        <div className={styles.backIcon}>
          {/* Close button */}
          <div className={styles.backIcon_inner}>
            <CloseCircle />
          </div>
        </div>
      </div>
    </button>
  )
}

TheSubNavButton.propTypes = {
  toggleSubNav: PropTypes.func.isRequired,
  navOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TheSubNavButton.defaultProps = {
  className: '',
}


export default TheSubNavButton
