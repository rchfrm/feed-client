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

const getIntroText = (showSignupIntro, showFindMore) => {
  if (showSignupIntro) return copy.signupIntro
  if (showFindMore) return copy.findMoreProfiles
  return copy.connectProfilesIntro
}

const ConnectProfilesFacebook = ({
  auth,
  errors,
  setErrors,
  onSignUp,
  showFindMore,
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
  const showSignupIntro = (missingScopes.length === 0) && onSignUp
  const introText = getIntroText(showSignupIntro, showFindMore)

  return (
    <div>
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
          <p className={['xsmall--p', 'col-span-6', 'col-start-1', 'max-w-md'].join(' ')}>
            {copy.smallLegalText}
          </p>
        </div>

        {/* Singup intro VIDEO */}
        {showSignupIntro && (
          <div className="mt-12 col-span-6 col-start-7 row-start-1 lg:mt-0">
            <h4 className="lg:hidden">Why we need your permissions</h4>
            <VimeoEmbed
              id="438511305"
              title="Why we're asking for Facebook permissions"
            />
            <h4 className="hidden lg:block pt-2 text-center">Why we need your permissions</h4>
          </div>
        )}
      </div>
    </div>
  )
}

ConnectProfilesFacebook.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  onSignUp: PropTypes.bool,
  showFindMore: PropTypes.bool,
}

ConnectProfilesFacebook.defaultProps = {
  errors: [],
  onSignUp: false,
  showFindMore: false,
}


export default ConnectProfilesFacebook
