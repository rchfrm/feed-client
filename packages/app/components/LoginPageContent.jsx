// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT CONTEXTS
import { AuthContext } from '@/app/contexts/Auth'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
import Button from '@/elements/Button'
import EmailIcon from '@/icons/EmailIcon'
import ButtonFacebook from '@/elements/ButtonFacebook'
// IMPORT COMPONENTS
import LoginWithEmail from '@/app/LoginWithEmail'
// IMPORT HELPERS
import firebase from '@/helpers/firebase'
import { track } from '@/helpers/trackingHelpers'
// IMPORT CONSTANTS
import * as ROUTES from '@/constants/routes'
// Import copy
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/LoginPageCopy'
// Import styles
import styles from '@/app/LoginPage.module.css'
import brandColors from '@/constants/brandColors'

function LoginPageContent({ showEmailLogin }) {
  // IMPORT CONTEXTS
  const { authError, setAuthError } = React.useContext(AuthContext)
  // Handle error
  const [error, setError] = React.useState(null)
  // Change route when clicking on facebook button
  const goToEmailLogin = () => {
    setError(null)
    Router.push(ROUTES.LOGIN_EMAIL)
  }

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  // CONTINUE WITH FACEBOOK
  // Calls firebase.loginWithFacebook using a redirect,
  // so that when user is returned to log in page handleRedirect is triggered
  const facebookClick = () => {
    firebase.loginWithFacebook()
      .catch((error) => {
        setError(error)
        track({
          category: 'login',
          action: 'error clicking on FB button',
          error: true,
        })
      })
  }

  return (
    <div className={styles.container}>

      <Error className={styles.error} error={error || authError} />

      {/* Email login form */}
      {showEmailLogin ? (
        // EMAIL LOGIN FORM
        <LoginWithEmail className={styles.form} />
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
                onClick={goToEmailLogin}
                version="black icon"
              >
                <EmailIcon color={brandColors.bgColor} />
                Log in with email
              </Button>
            </div>
            {/* Link to signup page */}
            <MarkdownText markdown={copy.signupReminder} />
          </>
        )}

      {/* T&C text */}
      <MarkdownText className={[styles.tcText, 'small--text'].join(' ')} markdown={copy.tcText('log in')} />

    </div>
  )
}

export default LoginPageContent
