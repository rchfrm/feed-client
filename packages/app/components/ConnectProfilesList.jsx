import React from 'react'
import PropTypes from 'prop-types'

import ConnectProfilesAlreadyConnected from '@/app/ConnectProfilesAlreadyConnected'
import ConnectProfilesNotConnected from '@/app/ConnectProfilesNotConnected'

const ConnectProfilesList = ({
  artistAccounts,
}) => {
  return (
    <div className="mb-4">
      <ConnectProfilesAlreadyConnected className="mb-10" />
      <ConnectProfilesNotConnected artistAccounts={artistAccounts} className="mb-10" />
    </div>
  )
}

ConnectProfilesList.propTypes = {
  artistAccounts: PropTypes.object.isRequired,
}

ConnectProfilesList.defaultProps = {
}

export default ConnectProfilesList
