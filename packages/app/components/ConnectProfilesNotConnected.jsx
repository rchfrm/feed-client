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

  const sortedArtistAccounts = React.useMemo(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  if (userLoading) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Connect more</h2>
      <ul
        className={[
          'xs:pl-16',
        ].join(' ')}
      >
        {sortedArtistAccounts.map((artistAccount) => {
          return (
            <ConnectProfilesItem
              key={artistAccount.page_id}
              profile={artistAccount}
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
  artistAccounts: PropTypes.array.isRequired,
}

ConnectProfilesNotConnected.defaultProps = {
}

export default ConnectProfilesNotConnected
