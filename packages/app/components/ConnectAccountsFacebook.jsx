// IMPORT PACKAGES
import React from 'react'
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

function ConnectAccountsFacebook({ auth, errors, setErrors, onSignUp }) {
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

  const showSignupIntro = (missingScopes.length === 0) && onSignUp

  return (
    <div>
      {/* Errors */}
      {errors.map((error, index) => {
        return <Error error={error} messagePrefix="Error: " key={index} className="mb-10" />
      })}
      <div
        className={['md:grid grid-cols-12 col-gap-8'].join(' ')}
        style={{ alignItems: 'start' }}
      >
        {/* Singup intro text */}
        {showSignupIntro ? (
          <MarkdownText className="col-span-6 col-start-1" markdown={copy.signupIntro} />
        ) : (
          <MarkdownText className="col-span-6 col-start-1" markdown={copy.connectProfilesIntro} />
        )}

        {/* If missing FB permissions, show missing permissions */}
        {missingScopes.length > 0 && (
          <MissingScopesMessage
            className="col-span-6 col-start-1"
            scopes={missingScopes}
            showButton={false}
          />
        )}

        <ButtonFacebook
          className={['col-span-6 mb-5', 'col-start-1'].join(' ')}
          onClick={linkFacebook}
          fallbackCta="Continue with Facebook"
        >
          Continue with Facebook
        </ButtonFacebook>

        <p className={['xsmall--p', 'col-span-6', 'col-start-1', 'max-w-md'].join(' ')}>
          {copy.smallLegalText}
        </p>

        {/* Singup intro VIDEO */}
        {showSignupIntro && (
          <div className="mt-5 col-span-6 col-start-7 row-start-1 md:mt-0">
            <h4 className="md:hidden">Why we need your permissions</h4>
            <VimeoEmbed
              id="438511305"
              title="Why we're asking for Facebook permissions"
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default ConnectAccountsFacebook
