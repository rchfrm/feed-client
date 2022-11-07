import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import ConnectProfilesItem from '@/app/ConnectProfilesItem'
import DisabledSection from '@/app/DisabledSection'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const ConnectProfilesNotConnected = ({
  artistAccounts,
  setSelectedProfile,
  setIsConnecting,
  setErrors,
  className,
}) => {
  const { userLoading } = React.useContext(UserContext)
  const { artist: { hasGrowthPlan } } = React.useContext(ArtistContext)

  const sortedArtistAccounts = React.useMemo(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  if (userLoading) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Connect more</h2>
      <DisabledSection
        section="connect-accounts"
        isDisabled={!hasGrowthPlan}
      >
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
                setErrors={setErrors}
                className="mb-6"
              />
            )
          })}
        </ul>
      </DisabledSection>
    </div>
  )
}

ConnectProfilesNotConnected.propTypes = {
  artistAccounts: PropTypes.array.isRequired,
  setSelectedProfile: PropTypes.func.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
}

ConnectProfilesNotConnected.defaultProps = {
}

export default ConnectProfilesNotConnected
