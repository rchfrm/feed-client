import React from 'react'
import PropTypes from 'prop-types'

const ConnectProfilesAccountsToConnectList = ({ accountsToConnect }) => {
  return (
    <div className="inline">
      {accountsToConnect.map((account, index) => {
        const isLast = index + 1 === accountsToConnect.length
        const isNextToLast = index + 1 === accountsToConnect.length - 1
        return (
          <span
            key={account.page_id}
          >
            <span className="font-bold">{account.name}</span>
            {!isLast && !isNextToLast && ', '}
            {isNextToLast && ' and '}
          </span>
        )
      })}
    </div>
  )
}

ConnectProfilesAccountsToConnectList.propTypes = {
  accountsToConnect: PropTypes.array,
}

ConnectProfilesAccountsToConnectList.defaultProps = {
  accountsToConnect: [],
}

export default ConnectProfilesAccountsToConnectList
