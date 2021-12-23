import React from 'react'
import PropTypes from 'prop-types'

import ButtonFacebook from '@/elements/ButtonFacebook'

import { AuthContext } from '@/contexts/AuthContext'

import { getFbRedirectUrl } from '@/app/helpers/facebookHelpers'

const ConnectFacebookButton = ({
  buttonText,
  trackComponentName,
  className,
}) => {
  const { auth } = React.useContext(AuthContext)
  const { missingScopes } = auth

  const linkFacebook = () => {
    const requestedScopes = missingScopes.length ? missingScopes : null
    const url = getFbRedirectUrl(requestedScopes)

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
  buttonText: PropTypes.string.isRequired,
  trackComponentName: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ConnectFacebookButton.defaultProps = {
  className: null,
}

export default ConnectFacebookButton
