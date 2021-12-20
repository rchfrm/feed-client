import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'

import ConnectProfilesAccountsToConnectList from '@/app/ConnectProfilesAccountsToConnectList'

const ConnectProfilesIsConnecting = ({ artistAccounts }) => {
  const accountsToConnect = React.useMemo(() => {
    return Object.values(artistAccounts).filter(({ connect }) => connect)
  }, [artistAccounts])

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <Spinner className="flex-none mb-10" />
      <div className="max-w-sm text-center">
        Setting up
        {' '}
        <ConnectProfilesAccountsToConnectList accountsToConnect={accountsToConnect} />
        ...
      </div>
    </div>
  )
}

ConnectProfilesIsConnecting.propTypes = {
  artistAccounts: PropTypes.object,
}

ConnectProfilesIsConnecting.defaultProps = {
  artistAccounts: {},
}

export default ConnectProfilesIsConnecting
