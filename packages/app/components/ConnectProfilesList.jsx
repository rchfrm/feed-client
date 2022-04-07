import React from 'react'
import PropTypes from 'prop-types'

import ConnectProfilesAlreadyConnected from '@/app/ConnectProfilesAlreadyConnected'
import ConnectProfilesNotConnected from '@/app/ConnectProfilesNotConnected'

const ConnectProfilesList = ({
  artistAccounts,
}) => {
  return (
    <>
      <ConnectProfilesAlreadyConnected className="mb-10" />
      <ConnectProfilesNotConnected artistAccounts={artistAccounts} className="mb-10" />
    </>
  )
}

ConnectProfilesList.propTypes = {
  artistAccounts: PropTypes.object.isRequired,
}

ConnectProfilesList.defaultProps = {
}

export default ConnectProfilesList
