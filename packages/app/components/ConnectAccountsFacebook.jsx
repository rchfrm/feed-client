// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import MissingScopesMessage from '@/elements/MissingScopesMessage'
import ButtonFacebook from '@/elements/ButtonFacebook'
import Error from '@/elements/Error'
import VimeoEmbed from '@/elements/VimeoEmbed'
import MarkdownText from '@/elements/MarkdownText'
// IMPORT HELPERS
import firebase from '@/helpers/firebase'
// IMPORT COPY
import copy from '@/app/copy/ConnectAccountsCopy'

function ConnectAccountsFacebook({ auth, errors, setErrors, onSignUp }) {
  const { missingScopes, providerIds } = auth
  // Define function to link facebook
  const linkFacebook = React.useCallback(() => {
    if (missingScopes.length || providerIds.includes('facebook.com')) {
      const requestedScopes = missingScopes.length ? missingScopes : null
      firebase.reauthFacebook(requestedScopes)
        .catch((error) => {
          setErrors([...errors, error])
        })
      return
    }
    firebase.linkFacebookAccount()
      .catch((error) => {
        setErrors([...errors, error])
      })
  // eslint-disable-next-line
  }, [missingScopes.length, providerIds])

  const showSignupIntro = (missingScopes.length === 0) && onSignUp

  return (
    <div>
      <div className={['md:grid grid-cols-12 col-gap-8'].join(' ')}>
        {/* Errors */}
        {errors.map((error, index) => {
          return <Error error={error} messagePrefix="Error: " key={index} />
        })}

        {/* Singup intro text */}
        {showSignupIntro && (
          <MarkdownText className="col-span-6 col-start-1" markdown={copy.signupIntro} />
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
        >
          Continue with Facebook
        </ButtonFacebook>

        <p className={['col-span-6', 'col-start-1'].join(' ')}>
          <em className="xsmall--p">
            {copy.smallLegalText}
          </em>
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
