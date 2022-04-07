import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import ConnectProfilesItem from '@/app/ConnectProfilesItem'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const ConnectProfilesNotConnected = ({
  artistAccounts,
  setSelectedProfile,
  setIsConnecting,
  className,
}) => {
  const { userLoading } = React.useContext(UserContext)

  const artistAccountsArray = React.useMemo(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  if (userLoading) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Connect more</h2>
      <ul
        className={[
          'pl-16',
        ].join(' ')}
      >
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
    </div>
  )
}

ConnectProfilesNotConnected.propTypes = {
  artistAccounts: PropTypes.object.isRequired,
}

ConnectProfilesNotConnected.defaultProps = {
}

export default ConnectProfilesNotConnected
