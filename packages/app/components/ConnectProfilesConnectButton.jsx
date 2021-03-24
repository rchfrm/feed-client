import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'

import { UserContext } from '@/contexts/UserContext'
import { ArtistContext } from '@/contexts/ArtistContext'
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

  const runCreateArtists = React.useCallback(async () => {
    toggleGlobalLoading(true)
    setIsConnecting(true)
    // Convert artist accounts to array, and remove the ones we don't want to connect
    const artistAccountsFiltered = Object.values(artistAccounts).filter(({ connect }) => connect)
    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(artistAccountsFiltered)
    const { error } = await connectArtists(artistAccountsSanitised, accessToken, user) || {}
    if (error) {
      toggleGlobalLoading(false)
      setIsConnecting(false)
      setErrors(errors => [...errors, error])
      return
    }
    Router.push(ROUTES.HOME)
  }, [user, artistAccounts, setErrors, setIsConnecting, toggleGlobalLoading, connectArtists, accessToken])

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
          Connect Selected Profiles
        </Button>
      </div>
      <p className={`font-bold mb-0 ${disabledReason ? 'opacity-100' : 'opacity-0'}`}>{disabledReason || '&nbsp;'}</p>
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
