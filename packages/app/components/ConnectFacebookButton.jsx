import React from 'react'
import PropTypes from 'prop-types'

import ButtonFacebook from '@/elements/ButtonFacebook'

import { AuthContext } from '@/contexts/AuthContext'

import { handleFbRedirect } from '@/app/helpers/facebookHelpers'

import * as ROUTES from '@/app/constants/routes'

const ConnectFacebookButton = ({
  redirectPath,
  scopes,
  buttonText,
  trackComponentName,
  className,
}) => {
  const { auth } = React.useContext(AuthContext)

  return (
    <ButtonFacebook
      className={[
        className,
      ].join(' ')}
      onClick={() => handleFbRedirect(auth, scopes, redirectPath)}
      fallbackCta={buttonText}
      trackComponentName={trackComponentName}
    >
      {buttonText}
    </ButtonFacebook>
  )
}

ConnectFacebookButton.propTypes = {
  redirectPath: PropTypes.string,
  scopes: PropTypes.array,
  buttonText: PropTypes.string.isRequired,
  trackComponentName: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ConnectFacebookButton.defaultProps = {
  redirectPath: ROUTES.CONNECT_ACCOUNTS,
  scopes: null,
  className: null,
}

export default ConnectFacebookButton
