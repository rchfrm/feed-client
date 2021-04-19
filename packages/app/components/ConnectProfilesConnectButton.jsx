import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import Button from '@/elements/Button'

import * as artistHelpers from '@/app/helpers/artistHelpers'

import * as ROUTES from '@/app/constants/routes'

const ConnectProfilesConnectButton = ({
  artistAccounts,
  accessToken,
  setErrors,
  setIsConnecting,
  disabled,
  disabledReason,
  className,
}) => {
  const { user } = React.useContext(UserContext)
  const { connectArtists } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const accountsToConnect = React.useMemo(() => {
    return Object.values(artistAccounts).filter(({ connect }) => connect)
  }, [artistAccounts])


  const runCreateArtists = React.useCallback(async () => {
    toggleGlobalLoading(true)
    setIsConnecting(true)
    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(accountsToConnect)
    const { error } = await connectArtists(artistAccountsSanitised, accessToken, user) || {}
    if (error) {
      toggleGlobalLoading(false)
      setIsConnecting(false)
      setErrors(errors => [...errors, error])
      return
    }
    Router.push(ROUTES.HOME)
  }, [user, accountsToConnect, setErrors, setIsConnecting, toggleGlobalLoading, connectArtists, accessToken])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <div className="mb-4">
        <Button
          onClick={runCreateArtists}
          disabled={disabled}
        >
          Connect {accountsToConnect.length} Selected {accountsToConnect.length === 1 ? 'Profile' : 'Profiles'}
        </Button>
      </div>
      {/* DISABLED REASON */}
      {disabledReason && (
        <p className="font-bold mb-0">{disabledReason}</p>
      )}
      {/* LIST OF CONNECTING PROFILES */}
      {!disabledReason && accountsToConnect.length && (
        <div className="text--block pt-5">
          <p className="font-bold">This will connect:</p>
          <ul>
            {accountsToConnect.map((account) => {
              return (
                <li
                  key={account.page_id}
                >
                  {account.name}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

ConnectProfilesConnectButton.propTypes = {
  artistAccounts: PropTypes.object,
  accessToken: PropTypes.string.isRequired,
  setErrors: PropTypes.func.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  disabledReason: PropTypes.string,
  className: PropTypes.string,
}

ConnectProfilesConnectButton.defaultProps = {
  disabled: false,
  disabledReason: '',
  artistAccounts: {},
  className: null,
}

export default ConnectProfilesConnectButton
