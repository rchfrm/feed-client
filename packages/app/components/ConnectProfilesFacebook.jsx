// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT ELEMENTS
import MissingScopesMessage from '@/elements/MissingScopesMessage'
import ButtonFacebook from '@/elements/ButtonFacebook'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
import ConnectProfilesAlreadyConnected from '@/app/ConnectProfilesAlreadyConnected'
import ButtonHelp from '@/elements/ButtonHelp'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
// IMPORT COPY
import copy from '@/app/copy/connectProfilesCopy'

const getIntroText = (isFindMore) => {
  if (isFindMore) return copy.findMoreProfiles
  return copy.connectProfilesIntro
}

const ConnectProfilesFacebook = ({
  auth,
  errors,
  setErrors,
  isFindMore,
  isConnecting,
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

  const introText = getIntroText(isFindMore)
  return (
    <div className={className}>
      {/* Errors */}
      {errors.map((error, index) => {
        return <Error error={error} messagePrefix="Error: " key={index} className="mb-10" />
      })}
      <div
        className="lg:grid grid-cols-12 col-gap-8"
        style={{ alignItems: 'start' }}
      >
        <div className="col-span-6 col-start-1">
          <MarkdownText className="col-span-6 col-start-1 mb-8" markdown={introText} />
          {/* If missing FB permissions, show missing permissions */}
          {missingScopes.length > 0 && (
            <MissingScopesMessage
              scopes={missingScopes}
              showButton={false}
            />
          )}
          {isFindMore ? (
            <>
              <MarkdownText className="mb-12" markdown={copy.connectProfilesDescription(isFindMore)} />
              <ButtonFacebook
                className="w-full max-w-md mb-12"
                onClick={linkFacebook}
                fallbackCta="Connect more pages"
                trackComponentName="ConnectProfilesFacebook"
              >
                Connect more pages
              </ButtonFacebook>
            </>
          ) : (
            <>
              <ButtonFacebook
                className="w-full max-w-md mb-12"
                onClick={linkFacebook}
                fallbackCta="Continue with Facebook"
                trackComponentName="ConnectProfilesFacebook"
              >
                Continue with Facebook
              </ButtonFacebook>
              <MarkdownText className="mb-12" markdown={copy.connectProfilesDescription(isFindMore)} />
            </>
          )}
          {!isConnecting && isFindMore && (
            <ConnectProfilesAlreadyConnected className="mb-12" />
          )}
          <ButtonHelp
            content={copy.helpText}
            text="Need help?"
            label="Connect accounts help"
          />
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
