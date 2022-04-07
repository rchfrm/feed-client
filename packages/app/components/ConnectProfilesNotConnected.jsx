import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import ConnectProfilesNoArtists from '@/app/ConnectProfilesNoArtists'
import ConnectProfilesItem from '@/app/ConnectProfilesItem'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const ConnectProfilesNotConnected = ({ artistAccounts, className }) => {
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
          'grid-cols-12',
        ].join(' ')}
      >
        <ConnectProfilesNoArtists className="max-w-xl mb-8" />
        <div className="col-span-12 sm:col-span-5 mb-12 xs:mb-0">
          {artistAccountsArray.map((artistAccount, index) => {
            return (
              <ConnectProfilesItem
                key={index}
                artist={artistAccount}
                className="mb-6"
              />
            )
          })}
        </div>
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
