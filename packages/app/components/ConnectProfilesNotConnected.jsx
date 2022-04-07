import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import ConnectProfilesNoArtists from '@/app/ConnectProfilesNoArtists'
import ConnectProfilesItem from '@/app/ConnectProfilesItem'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const ConnectProfilesNotConnected = ({
  artistAccounts,
  setSelectedProfile,
  setIsConnecting,
  className,
}) => {
  const { user, userLoading } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  const artistAccountsArray = React.useMemo(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  if (userLoading || !connectedArtists.length) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Connect more</h2>
      <ul
        className={[
          'pl-16',
        ].join(' ')}
      >
        {!artistAccountsArray.length > 0 && (
          <ConnectProfilesNoArtists className="max-w-xl mb-8" />
        )}
        <ul>
          {artistAccountsArray.map((artistAccount) => {
            const { name, page_id, instagram_username } = artistAccount

            const profile = {
              name,
              page_id,
              instagram_username,
            }

            return (
              <ConnectProfilesItem
                key={page_id}
                profile={profile}
                profiles={artistAccounts}
                setSelectedProfile={setSelectedProfile}
                setIsConnecting={setIsConnecting}
                isConnected={false}
                className="mb-6"
              />
            )
          })}
        </ul>
      </ul>
    </div>
  )
}

ConnectProfilesNotConnected.propTypes = {
  artistAccounts: PropTypes.object.isRequired,
}

ConnectProfilesNotConnected.defaultProps = {
}

export default ConnectProfilesNotConnected
