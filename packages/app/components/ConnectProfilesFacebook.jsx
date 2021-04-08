// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
// IMPORT ELEMENTS
import MissingScopesMessage from '@/elements/MissingScopesMessage'
import ButtonFacebook from '@/elements/ButtonFacebook'
import Error from '@/elements/Error'
import VimeoEmbed from '@/elements/VimeoEmbed'
import MarkdownText from '@/elements/MarkdownText'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
// IMPORT COPY
import copy from '@/app/copy/connectProfilesCopy'

const getIntroText = (showSignupIntro, isFindMore) => {
  if (showSignupIntro) return copy.signupIntro
  if (isFindMore) return copy.findMoreProfiles
  return copy.connectProfilesIntro
}

const ConnectProfilesFacebook = ({
  auth,
  errors,
  setErrors,
  isSignupStep,
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

  // GET INTRO TEXT
  const showSignupIntro = (missingScopes.length === 0) && isSignupStep
  const introText = getIntroText(showSignupIntro, isFindMore)

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
        {/* Singup intro text */}
        <div className="col-span-6 col-start-1">
          <MarkdownText className="col-span-6 col-start-1" markdown={introText} />
          {/* If missing FB permissions, show missing permissions */}
          {missingScopes.length > 0 && (
            <MissingScopesMessage
              scopes={missingScopes}
              showButton={false}
            />
          )}
          <ButtonFacebook
            className="w-full max-w-md mb-5"
            onClick={linkFacebook}
          >
            Continue with Facebook
          </ButtonFacebook>
          {!isFindMore && (
            <p className={['xsmall--p', 'col-span-6', 'col-start-1', 'max-w-md'].join(' ')}>
              {copy.smallLegalText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

ConnectProfilesFacebook.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  isSignupStep: PropTypes.bool,
  isFindMore: PropTypes.bool,
  className: PropTypes.string,
}

ConnectProfilesFacebook.defaultProps = {
  errors: [],
  isSignupStep: false,
  isFindMore: false,
  className: null,
}


export default ConnectProfilesFacebook
