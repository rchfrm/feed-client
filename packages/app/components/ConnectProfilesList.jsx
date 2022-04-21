import React from 'react'
import PropTypes from 'prop-types'

import ConnectProfilesAlreadyConnected from '@/app/ConnectProfilesAlreadyConnected'
import ConnectProfilesNotConnected from '@/app/ConnectProfilesNotConnected'

const ConnectProfilesList = ({
  allArtistAccounts,
  artistAccounts,
  setSelectedProfile,
  setIsConnecting,
}) => {
  return (
    <div className="mb-4">
      <ConnectProfilesAlreadyConnected
        allArtistAccounts={allArtistAccounts}
        className="mb-10"
      />
      {artistAccounts.length > 0 && (
        <ConnectProfilesNotConnected
          artistAccounts={artistAccounts}
          setSelectedProfile={setSelectedProfile}
          setIsConnecting={setIsConnecting}
          className="mb-10"
        />
      )}
    </div>
  )
}

ConnectProfilesList.propTypes = {
  allArtistAccounts: PropTypes.array.isRequired,
  artistAccounts: PropTypes.array.isRequired,
  setSelectedProfile: PropTypes.func.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
}

ConnectProfilesList.defaultProps = {
}

export default ConnectProfilesList
