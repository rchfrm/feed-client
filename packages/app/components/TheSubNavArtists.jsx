import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/contexts/UserContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import useNotificationsStore from '@/app/stores/notificationsStore'

import ArtistImage from '@/elements/ArtistImage'
import Select from '@/elements/Select'
import NotificationDot from '@/elements/NotificationDot'

import ConnectProfilesButton from '@/app/ConnectProfilesButton'

import * as artistHelpers from '@/app/helpers/artistHelpers'

import styles from '@/app/TheSubNav.module.css'

const ARTIST_SELECT_OPTIONS = ({
  currentArtistId,
  artists,
  updateArtist,
  artistsWithNotifications,
}) => {
  const artistOptions = React.useMemo(() => {
    return artists.map(({ id, name: artistName }) => {
      // Add asterix if Artist has notifcation
      const name = artistsWithNotifications.includes(id) ? `${artistName} *` : artistName
      return { value: id, name }
    })
  }, [artists, artistsWithNotifications])

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

const getArtistsWithNotifications = state => state.artistsWithNotifications

const TheSubNavArtists = ({ className }) => {
  const { user } = React.useContext(UserContext)
  const { artists: allArtists } = user
  const { artistId, storeArtist } = React.useContext(ArtistContext)
  const maxArtists = 3

  const updateArtist = (artistId) => {
    storeArtist(artistId)
  }

  // FETCH NOTIFICATIONS from other artists, and remove the current artist
  const artistsWithNotifications = useNotificationsStore(getArtistsWithNotifications)
  const otherArtistNotifications = React.useMemo(() => {
    return artistsWithNotifications.filter((id) => id !== artistId)
  }, [artistsWithNotifications, artistId])

  const sortedArtists = React.useMemo(() => {
    return artistHelpers.sortArtistsAlphabetically([...allArtists])
  // eslint-disable-next-line
  }, [user])

  // If no artists, don't show artist links
  if (sortedArtists.length === 1) return <ConnectProfilesButton className="mb-5 md:mb-2" />

  // Show select component if too many artists
  if (sortedArtists.length > maxArtists) {
    return (
      <div className={[styles.artistsOuter, styles._selectType, 'relative', className].join(' ')}>
        {!!otherArtistNotifications.length && (
          <NotificationDot size="medium" style={{ top: '1.5rem', right: '-0.25rem' }} />
        )}
        <ARTIST_SELECT_OPTIONS
          updateArtist={updateArtist}
          artists={sortedArtists}
          currentArtistId={artistId}
          artistsWithNotifications={artistsWithNotifications}
        />
        <div className="mb-0 md:pt-3 md:mb-3 h4--text">
          <ConnectProfilesButton />
        </div>
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
          const hasNotification = otherArtistNotifications.includes(id)
          return (
            <li
              key={id}
              className={[
                styles.artistLink,
                activeClass,
              ].join(' ')}
            >
              <a className={['relative', styles.artistLink_button].join(' ')} role="button" onClick={() => updateArtist(id)}>
                {hasNotification && (
                  <NotificationDot className="ml-8" style={{ top: '0rem', left: '-0.25rem' }} />
                )}
                <figure className={['overflow-hidden', 'rounded-full', styles.artistLink_image].join(' ')}>
                  <ArtistImage className="h-auto w-full" pageId={facebook_page_id} />
                </figure>
                <figcaption className={styles.artistLink_name}>{name}</figcaption>
              </a>
            </li>
          )
        })}
        <li className="md:hidden pt-3">
          <ConnectProfilesButton />
        </li>
      </ul>
      <div className="hidden md:block pt-5 pb-3">
        <ConnectProfilesButton />
      </div>
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
