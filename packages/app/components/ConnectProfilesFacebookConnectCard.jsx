import React from 'react'
import PropTypes from 'prop-types'

import ButtonFacebook from '@/elements/ButtonFacebook'
import MarkdownText from '@/elements/MarkdownText'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'

import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesFacebookConnectCard = ({
  auth,
  errors,
  setErrors,
  className,
}) => {
  const { missingScopes, providerIds } = auth
  // Define function to link facebook
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
    <li className={[
      className,
      'flex flex-column justify-center items-center',
      'text-center p-12',
    ].join(' ')}
    >
      <MarkdownText className="text-lg font-bold" markdown={copy.connectCardTitle} />
      <MarkdownText markdown={copy.connectCardDescription} />
      <ButtonFacebook
        className="w-full max-w-md mb-12"
        onClick={linkFacebook}
        fallbackCta="Connect more"
        trackComponentName="ConnectProfilesFacebook"
      >
        Connect more
      </ButtonFacebook>
    </li>
  )
}

ConnectProfilesFacebookConnectCard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesFacebookConnectCard.defaultProps = {
  errors: [],
  className: null,
}

export default ConnectProfilesFacebookConnectCard
