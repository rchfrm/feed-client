import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import ConnectProfilesAccountsToConnectList from '@/app/ConnectProfilesAccountsToConnectList'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/connectProfilesCopy'

import * as artistHelpers from '@/app/helpers/artistHelpers'

import * as ROUTES from '@/app/constants/routes'

const ConnectProfilesConnectButton = ({
  artistAccounts,
  setErrors,
  setIsConnecting,
  disabled,
  disabledReason,
  className,
}) => {
  const { user } = React.useContext(UserContext)
  const { connectArtists } = React.useContext(ArtistContext)

  const accountsToConnect = React.useMemo(() => {
    return Object.values(artistAccounts).filter(({ connect }) => connect)
  }, [artistAccounts])

  const runCreateArtists = React.useCallback(async () => {
    setIsConnecting(true)
    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(accountsToConnect)
    const { error } = await connectArtists(artistAccountsSanitised, user) || {}
    if (error) {
      setIsConnecting(false)
      setErrors(errors => [...errors, error])
      setIsConnecting(false)
      return
    }

    Router.push(ROUTES.HOME)
  }, [user, accountsToConnect, setErrors, setIsConnecting, connectArtists])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <div className="col-span-8">
        <MarkdownText markdown={copy.confirmAccounts} />
        {/* LIST OF CONNECTING PROFILES */}
        {!disabledReason && accountsToConnect.length && (
          <div className="text--block">
            <div>{`You have selected ${accountsToConnect.length} ${accountsToConnect.length === 1 ? 'page' : 'pages'}: `}
              <ConnectProfilesAccountsToConnectList
                accountsToConnect={accountsToConnect}
              />
            </div>
          </div>
        )}
        {/* DISABLED REASON */}
        {disabledReason && (
          <p className="text-red font-bold mb-6">{disabledReason}</p>
        )}
        <Button
          version="green"
          onClick={runCreateArtists}
          disabled={disabled}
          trackComponentName="ConnectProfilesConnectButton"
        >
          Save
          <ArrowAltIcon
            className="ml-3"
            fill={disabled ? brandColors.greyDark : brandColors.white}
            direction="right"
          />
        </Button>
      </div>
    </div>
  )
}

ConnectProfilesConnectButton.propTypes = {
  artistAccounts: PropTypes.object,
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
