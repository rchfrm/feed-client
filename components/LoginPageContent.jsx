// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import Button from './elements/Button'
import EmailIcon from './icons/EmailIcon'
import ButtonFacebook from './elements/ButtonFacebook'
import Spinner from './elements/Spinner'
// IMPORT COMPONENTS
import LoginPageForm from './LoginPageForm'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'

import MarkdownText from './elements/MarkdownText'
import copy from '../copy/LoginPageCopy'

import styles from './LoginPage.module.css'

function LoginPageContent() {
  // IMPORT CONTEXTS
  const { authLoading, continueWithFacebook } = React.useContext(AuthContext)
  const { userLoading } = React.useContext(UserContext)
  const { artistLoading } = React.useContext(ArtistContext)

  const [pageLoading, setPageLoading] = React.useState(false)
  const [showEmailLogin, setShowEmailLogin] = React.useState(false)

  // CONTINUE WITH FACEBOOK
  const facebookClick = e => {
    e.preventDefault()
    // Calls firebase.doSignInWithFacebook using a redirect,
    // so that when user is returned to log in page handleRedirect is triggered
    continueWithFacebook()
  }

  if (authLoading || userLoading || artistLoading || pageLoading) {
    return (
      <Spinner width={50} color={brandColors.green} />
    )
  }
  return (
    <div className={styles.container}>

      <PageHeader className={styles.header} heading="log in" />

      {/* Email login form */}
      {showEmailLogin ? (
        // EMAIL LOGIN FORM
        <LoginPageForm className={styles.form} setPageLoading={setPageLoading} />
      )
        : (
          <>
            {/* LOGIN BUTTONS */}
            <div className={styles.loginButtons}>
              <ButtonFacebook
                className={styles.facebookButton}
                onClick={facebookClick}
              >
                Log in with Facebook
              </ButtonFacebook>
              <Button
                className={styles.emailButton}
                onClick={() => setShowEmailLogin(true)}
                version="black icon"
              >
                <EmailIcon color="white" />
                Log in with email
              </Button>
            </div>
            {/* Link to signup page */}
            <MarkdownText markdown={copy.signupReminder} />
          </>
        )}

      {/* T&C text */}
      <MarkdownText className={[styles.tcText, 'small--text'].join(' ')} markdown={copy.tcText} />

    </div>
  )
}

export default LoginPageContent
