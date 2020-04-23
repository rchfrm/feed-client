// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import MissingScopesMessage from './elements/MissingScopesMessage'
import ButtonFacebook from './elements/ButtonFacebook'
import Error from './elements/Error'
import MarkdownText from './elements/MarkdownText'
// IMPORT HELPERS
import firebase from './helpers/firebase'
// IMPORT STYLES
import styles from './ConnectAccounts.module.css'
// IMPORT COPY
import copy from '../copy/ConnectAccountsCopy'

function ConnectAccountsFacebook({ auth, errors, setErrors, onSignUp }) {
  const { missingScopes, providerId } = auth
  // Define function to link facebook
  const linkFacebook = React.useCallback(() => {
    if (missingScopes.length || providerId === 'facebook.com') {
      const requestedScopes = missingScopes.length ? missingScopes : null
      firebase.reauthFacebook(requestedScopes)
        .catch((error) => {
          setErrors([...errors, error.message])
          setErrors([...errors, error])
        })
      return
    }
    firebase.linkFacebookAccount()
      .catch((error) => {
        console.log('error', error)
        setErrors([...errors, error])
      })
  }, [missingScopes.length])

  const showSignupIntro = (missingScopes.length === 0) && onSignUp

  return (
    <div className="ninety-wide">
      <div className={styles.facebookConnectContainer}>
        {/* Errors */}
        {errors.map((error, index) => {
          return <Error error={error} messagePrefix="Error: " key={index} />
        })}

        {/* Singup intro text */}
        {showSignupIntro && (
          <MarkdownText className={styles.introText} markdown={copy.signupIntro} />
        )}

        {/* If missing FB permissions, show missing permissions */}
        {missingScopes.length > 0 && (
          <MissingScopesMessage scopes={missingScopes} showButton={false} />
        )}

        <ButtonFacebook
          className={styles.fbButton}
          onClick={linkFacebook}
        >
          Continue with Facebook
        </ButtonFacebook>

        {!showSignupIntro && (
          <em className={[styles.fbLegalText, 'xsmall--p'].join(' ')}>
            {copy.smallLegalText}
          </em>
        )}

      </div>
    </div>
  )
}

export default ConnectAccountsFacebook
