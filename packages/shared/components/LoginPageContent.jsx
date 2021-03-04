// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import LoginWithEmail from '@/LoginWithEmail'
import LoginSignupButtons from '@/LoginSignupButtons'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { fireSentryError } from '@/app/helpers/sentryHelpers'
// IMPORT CONSTANTS
import * as ROUTES from '@/app/constants/routes'
// Import copy
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/LoginPageCopy'
// Import styles
import styles from '@/LoginPage.module.css'

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
  // Calls firebaseHelpers.loginWithFacebook using a redirect,
  // so that when user is returned to log in page handleRedirect is triggered
  const facebookClick = () => {
    firebaseHelpers.loginWithFacebook()
      .catch((error) => {
        setError(error)
        // Sentry error
        fireSentryError({
          category: 'login',
          action: 'error clicking on FB button',
        })
      })
  }

  return (
    <div className={styles.container}>

      <Error className={styles.error} error={error || authError} />

      {/* Email login form */}
      {showEmailLogin ? (
        <LoginWithEmail className={styles.form} />
      )
        : (
          <>
            {/* LOGIN BUTTONS */}
            <LoginSignupButtons
              type="login"
              onFacebookClick={facebookClick}
              onEmailClick={goToEmailLogin}
            />
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
