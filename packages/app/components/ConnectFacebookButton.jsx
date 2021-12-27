import React from 'react'
import PropTypes from 'prop-types'

import ButtonFacebook from '@/elements/ButtonFacebook'

import { AuthContext } from '@/contexts/AuthContext'

import { getFbRedirectUrl } from '@/app/helpers/facebookHelpers'
import * as utils from '@/helpers/utils'

import * as ROUTES from '@/app/constants/routes'

const ConnectFacebookButton = ({
  redirectPath,
  buttonText,
  trackComponentName,
  className,
}) => {
  const { auth } = React.useContext(AuthContext)
  const { missingScopes, providerIds } = auth

  const linkFacebook = () => {
    const isReauth = missingScopes.length || providerIds.includes('facebook.com')
    const requestedPermissions = missingScopes.length ? missingScopes : null
    const state = (Math.random() + 1).toString(36).substring(4)
    const url = getFbRedirectUrl({
      redirectPath,
      requestedPermissions,
      state,
      isReauth,
    })

    utils.setLocalStorage('redirectState', state)
    window.location.href = url
  }

  return (
    <ButtonFacebook
      className={[
        className,
      ].join(' ')}
      onClick={linkFacebook}
      fallbackCta={buttonText}
      trackComponentName={trackComponentName}
    >
      {buttonText}
    </ButtonFacebook>
  )
}

ConnectFacebookButton.propTypes = {
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  trackComponentName: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ConnectFacebookButton.defaultProps = {
  className: null,
  redirectPath: ROUTES.CONNECT_ACCOUNTS,
}

export default ConnectFacebookButton
