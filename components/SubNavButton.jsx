import React from 'react'
import PropTypes from 'prop-types'
import ArtistImage from './elements/ArtistImage'

import { ArtistContext } from './contexts/Artist'

import styles from './SubNavButton.module.css'

const SubNavButton = ({ toggleNav, navOn, className }) => {
  const { artist, artistId } = React.useContext(ArtistContext)
  const [fbPageId, setFbPageId] = React.useState('')

  React.useEffect(() => {
    const { facebook_page_id } = artist
    if (!artistId || !facebook_page_id) return
    setFbPageId(facebook_page_id)
  }, [artistId])

  return (
    <button className={[styles.container, className].join(' ')} onClick={toggleNav}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <figure className={styles.image}>
            {fbPageId && <ArtistImage pageId={fbPageId} name={artist.name} />}
          </figure>
        </div>
      </div>
    </button>
  )
}

SubNavButton.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  navOn: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

SubNavButton.defaultProps = {
  className: '',
}


export default SubNavButton
