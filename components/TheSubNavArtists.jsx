import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/contexts/User'
import { ArtistContext } from '@/contexts/Artist'

import ArtistImage from '@/elements/ArtistImage'
import Select from '@/elements/Select'

import * as artistHelpers from '@/helpers/artistHelpers'

import styles from '@/TheSubNav.module.css'

const ARTIST_SELECT_OPTIONS = ({ currentArtistId, artists, updateArtist }) => {
  const artistOptions = artists.map(({ id: value, name }) => {
    return { value, name }
  })

  const handleChange = (e) => {
    updateArtist(e.target.value)
  }

  return (
    <Select
      className={styles.artistSelect}
      handleChange={handleChange}
      selectedValue={currentArtistId}
      options={artistOptions}
      name="Selected Profile"
      label="Selected Profile"
      version="box white small sans"
    />
  )
}


const TheSubNavArtists = ({ className }) => {
  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artistId, storeArtist } = React.useContext(ArtistContext)
  const maxArtists = 4

  const updateArtist = (artistId) => {
    storeArtist(artistId)
  }

  const sortedArtists = React.useMemo(() => {
    return artistHelpers.sortArtistsAlphabetically([...allArtists])
  }, [user])

  // If no artists, don't show artist links
  if (sortedArtists.length === 1) return null

  // Show select component if too many artists
  if (sortedArtists.length > maxArtists) {
    return (
      <div className={[styles.artistsOuter, styles._selectType, className].join(' ')}>
        <ARTIST_SELECT_OPTIONS
          updateArtist={updateArtist}
          artists={sortedArtists}
          currentArtistId={artistId}
        />
      </div>
    )
  }

  // Move active artist to top
  const resortedArtists = sortedArtists.sort((a, b) => {
    // Put active on top
    if (a.id === artistId) return -1
    if (b.id === artistId) return 1
    return 0
  })

  // Else show more explicit selector
  return (
    <div className={[styles.artistsOuter, className].join(' ')}>
      <ul className={[styles.artistLinks, 'h4--text'].join(' ')}>
        {resortedArtists.map(({ id, name, facebook_page_id }) => {
          const activeClass = id === artistId ? styles._active : ''
          return (
            <li
              key={id}
              className={[styles.artistLink, activeClass].join(' ')}
            >
              <a className={styles.artistLink_button} role="button" onClick={() => updateArtist(id)}>
                <figure className={['overflow-hidden', 'rounded-full', styles.artistLink_image].join(' ')}>
                  <ArtistImage className="h-auto w-full" pageId={facebook_page_id} />
                </figure>
                <figcaption className={styles.artistLink_name}>{name}</figcaption>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

TheSubNavArtists.propTypes = {
  className: PropTypes.string,
}

TheSubNavArtists.defaultProps = {
  className: '',
}

export default TheSubNavArtists
