import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import ConnectProfilesItem from '@/app/ConnectProfilesItem'

const ConnectProfilesAlreadyConnected = ({ allArtistAccounts, className }) => {
  const [connectedArtists, setConnectedArtists] = React.useState([])
  const { user, userLoading } = React.useContext(UserContext)
  const { artists } = user

  React.useEffect(() => {
    const artistsWithInstagramHandle = artists.map((artist) => {
      const { instagram_username, page_id } = allArtistAccounts.find((artistAccount) => artistAccount.page_id === artist.facebook_page_id) || {}

      return {
        ...artist,
        instagram_username,
        page_id,
      }
    })
    setConnectedArtists(artistsWithInstagramHandle)
  }, [artists, allArtistAccounts])

  if (userLoading) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Your profiles</h2>
      <ul className="xs:pl-16">
        {connectedArtists.map((artist) => (
          <ConnectProfilesItem
            key={artist.id}
            profile={artist}
            className="mb-6"
            isConnected
          />
        ))}
      </ul>
    </div>
  )
}

ConnectProfilesAlreadyConnected.propTypes = {
  allArtistAccounts: PropTypes.array.isRequired,
  className: PropTypes.string,
}

ConnectProfilesAlreadyConnected.defaultProps = {
  className: null,
}

export default ConnectProfilesAlreadyConnected
