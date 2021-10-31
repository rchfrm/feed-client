// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT ELEMENTS
import MissingScopesMessage from '@/elements/MissingScopesMessage'
import ButtonFacebook from '@/elements/ButtonFacebook'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
// IMPORT COPY
import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesFacebook = ({
  auth,
  errors,
  setErrors,
  isFindMore,
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
    <div className={className}>
      {/* Errors */}
      {errors.map((error, index) => {
        return <Error error={error} messagePrefix="Error: " key={index} className="mb-10" />
      })}
      <div
        className={isFindMore ? 'bg-grey-1 rounded-dialogue p-4' : 'lg:grid grid-cols-12 col-gap-8'}
        style={{ alignItems: 'start' }}
      >
        {/* Singup intro text */}
        <div className="col-span-6 col-start-1">
          <MarkdownText className="col-span-6 col-start-1 mb-8" markdown={copy.connectProfilesIntro} />
          {/* If missing FB permissions, show missing permissions */}
          {missingScopes.length > 0 && (
            <MissingScopesMessage
              scopes={missingScopes}
              showButton={false}
            />
          )}
          {isFindMore ? (
            <Button
              version="green x-small"
              className="w-full"
              onClick={linkFacebook}
            >
              Connect more
            </Button>
          ) : (
            <ButtonFacebook
              className="w-full max-w-md mb-12"
              onClick={linkFacebook}
              fallbackCta="Continue with Facebook"
            >
              Continue with Facebook
            </ButtonFacebook>
          )}
          <MarkdownText className="mb-12" markdown={copy.connectProfilesDescription} />
        </div>
      </div>
    </div>
  )
}

ConnectProfilesFacebook.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  isFindMore: PropTypes.bool,
  className: PropTypes.string,
}

ConnectProfilesFacebook.defaultProps = {
  errors: [],
  isFindMore: false,
  className: null,
}

export default ConnectProfilesFacebook
