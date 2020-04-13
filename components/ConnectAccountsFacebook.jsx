
// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import MissingScopesMessage from './elements/MissingScopesMessage'
import ButtonFacebook from './elements/ButtonFacebook'
import Error from './elements/Error'
// IMPORT PAGES
// IMPORT HELPERS
import firebase from './helpers/firebase'
import styles from './ConnectAccounts.module.css'
// IMPORT STYLES

function ConnectAccountsFacebook({ missingScopes, errors }) {
  // Define function to link facebook
  const linkFacebook = React.useCallback(() => {
    if (missingScopes.length) {
      firebase.reauthFacebook(missingScopes)
      return
    }
    firebase.linkFacebookAccount()
  }, [missingScopes.length])

  return (
    <div className="ninety-wide">
      <div className={styles.facebookConnectContainer}>
        {/* Errors */}
        {errors.map((error, index) => {
          return <Error error={error} messagePrefix="Error: " key={index} />
        })}

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

        <em className={[styles.fbLegalText, 'xsmall--p'].join(' ')}>
          This allows us to connect to Facebook so that we can show you your data and promote posts on your behalf, we'll never post anything without your approval.
        </em>

      </div>
    </div>
  )
}

export default ConnectAccountsFacebook
