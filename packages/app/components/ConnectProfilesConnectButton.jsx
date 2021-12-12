import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/connectProfilesCopy'

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
      <div className="col-span-8">
        <MarkdownText markdown={copy.confirmAccounts} />
        {/* LIST OF CONNECTING PROFILES */}
        {!disabledReason && accountsToConnect.length && (
          <div className="text--block">
            <p>{`You have selected ${accountsToConnect.length} ${accountsToConnect.length === 1 ? 'page' : 'pages'}: `}
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
            </p>
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
