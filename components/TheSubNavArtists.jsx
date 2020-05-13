import React from 'react'

import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'

import ArtistImage from './elements/ArtistImage'
import Select from './elements/Select'

import * as artistHelpers from './helpers/artistHelpers'

import styles from './TheSubNav.module.css'

const ArtistSelectOptions = ({ currentArtistId, artists, updateArtist }) => {
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


const TheSubNavArtists = () => {
  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artistId, storeArtist } = React.useContext(ArtistContext)
  const maxArtists = 5

  console.log('allArtists', allArtists)

  const updateArtist = (artistId) => {
    storeArtist(artistId)
  }

  const sortedArtists = React.useMemo(() => {
    return artistHelpers.sortArtistsAlphabetically([...allArtists])
  }, [user])

  // Show select component if too many artists
  if (sortedArtists.length > maxArtists) {
    return (
      <div className={[styles.artistsOuter, styles._selectType].join(' ')}>
        <ArtistSelectOptions
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
    <div className={styles.artistsOuter}>
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

export default TheSubNavArtists
