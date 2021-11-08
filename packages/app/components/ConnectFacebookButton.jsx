import React from 'react'
import PropTypes from 'prop-types'

import { AuthContext } from '@/contexts/AuthContext'

import ButtonFacebook from '@/elements/ButtonFacebook'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'

const ConnectFacebookButton = ({
  errors,
  setErrors,
  buttonText,
  trackComponentName,
  className,
}) => {
  const { auth } = React.useContext(AuthContext)
  const { missingScopes, providerIds } = auth

  const linkFacebook = React.useCallback(() => {
    if (missingScopes.length || providerIds.includes('facebook.com')) {
      const requestedScopes = missingScopes.length ? missingScopes : null
      firebaseHelpers.reauthFacebook(requestedScopes)
        .catch((error) => {
          setErrors([...errors, error])
        })
      return
    }
    firebaseHelpers.linkFacebookAccount()
      .catch((error) => {
        setErrors([...errors, error])
      })
  // eslint-disable-next-line
  }, [missingScopes.length, providerIds])

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
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  trackComponentName: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ConnectFacebookButton.defaultProps = {
  errors: [],
  className: null,
}

export default ConnectFacebookButton
