import React from 'react'
import PropTypes from 'prop-types'

import ConnectProfilesItem from '@/app/ConnectProfilesItem'
import ConnectProfilesConnectMore from '@/app/ConnectProfilesConnectMore'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const ConnectProfilesList = ({
  auth,
  artistAccounts,
  updateArtists,
  setButtonDisabled,
  setDisabledReason,
  errors,
  setErrors,
  className,
}) => {
  React.useEffect(() => {
    const allAccounts = Object.values(artistAccounts)
    // Test whether every account already exists
    const everyAccountExists = allAccounts.every(({ exists }) => exists)
    // Find all accounts that don't yet exist but are selected to connect
    const selectedAccounts = allAccounts.filter(({ connect }) => connect)
    // Disable button if no selected, non-existing accounts
    const disableButton = !selectedAccounts.length && !everyAccountExists
    setButtonDisabled(disableButton)

    if (!selectedAccounts.length) {
      setDisabledReason('Please select at least one account')
      return
    }

    if (!disableButton) {
      setDisabledReason('')
    }
  }, [artistAccounts, setDisabledReason, setButtonDisabled])

  const artistAccountsArray = React.useMemo(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  return (
    <ul
      className={[
        'xs:grid',
        'grid-flow-row',
        'grid-cols-12',
        'gap-8',
        className,
      ].join(' ')}
    >
      <div className="col-span-12 sm:col-span-5 mb-12 xs:mb-0">
        {artistAccountsArray.map((artistAccount, index) => {
          return (
            <ConnectProfilesItem
              key={index}
              artist={artistAccount}
              updateArtists={updateArtists}
              setErrors={setErrors}
              className="mb-6"
            />
          )
        })}
      </div>
      <div className="col-span-12 sm:col-span-6 sm:col-start-7">
        <ConnectProfilesConnectMore
          auth={auth}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </ul>
  )
}

ConnectProfilesList.propTypes = {
  auth: PropTypes.object.isRequired,
  artistAccounts: PropTypes.object.isRequired,
  updateArtists: PropTypes.func.isRequired,
  setButtonDisabled: PropTypes.func.isRequired,
  setDisabledReason: PropTypes.func.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesList.defaultProps = {
  errors: [],
  className: null,
}

export default ConnectProfilesList
