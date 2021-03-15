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
  disabled,
  disabledReason,
  className,
}) => {
  const { user } = React.useContext(UserContext)
  const { connectArtists } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const createArtists = React.useCallback(async () => {
    toggleGlobalLoading(true)
    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(artistAccounts)
    const { error } = await connectArtists(artistAccountsSanitised, accessToken, user) || {}
    toggleGlobalLoading(false)
    if (error) {
      setErrors(errors => [...errors, error])
      return
    }
    Router.push(ROUTES.HOME)
  }, [user, artistAccounts, setErrors, toggleGlobalLoading, connectArtists, accessToken])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {disabledReason && (
        <p>{disabledReason}</p>
      )}
      <Button
        onClick={createArtists}
        disabled={disabled}
      >
        Connect Profiles
      </Button>
    </div>
  )
}

ConnectProfilesConnectButton.propTypes = {
  artistAccounts: PropTypes.object,
  accessToken: PropTypes.string.isRequired,
  setErrors: PropTypes.func.isRequired,
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
