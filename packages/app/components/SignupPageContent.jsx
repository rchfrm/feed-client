// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
// IMPORT COMPONENTS
import SignupEmailForm from '@/app/SignupEmailForm'
import LoginSignupButtons from '@/LoginSignupButtons'
import SignupReferralCodeDisplay from '@/app/SignupReferralCodeDisplay'
// IMPORT HELPERS
import firebase from '@/helpers/firebase'
import { fireSentryError } from '@/app/helpers/trackingHelpers'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
// Constants
import * as ROUTES from '@/app/constants/routes'
// IMPORT COPY
import copy from '@/app/copy/LoginPageCopy'
// IMPORT STYLES
import styles from '@/LoginPage.module.css'


const SignupPageContent = ({
  showEmailSignup,
  requireReferral,
  setChecking,
}) => {
  const { authError, setAuthError } = React.useContext(AuthContext)
  // Handle error
  const [error, setError] = React.useState(null)
  // Change route when clicking on facebook button
  const goToEmailSignup = React.useCallback(() => {
    setError(null)
    Router.push(ROUTES.SIGN_UP_EMAIL)
  }, [])

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  // Calls firebase.signupWithFacebook using a redirect,
  // so that when user is returned to log in page handleRedirect is triggered
  const facebookSignup = async () => {
    firebase.signUpWithFacebook()
      .catch((error) => {
        setError(error)
        // Sentry error
        fireSentryError({
          category: 'sign up',
          action: 'error clicking on FB button',
        })
      })
  }

  return (
    <div className={styles.container}>

      <Error className={styles.error} error={error || authError} />

      {/* Email login form */}
      {showEmailSignup ? (
        // EMAIL LOGIN FORM
        <SignupEmailForm />
      ) : (
        <>
          <LoginSignupButtons
            type="join"
            onFacebookClick={facebookSignup}
            onEmailClick={goToEmailSignup}
          />
          {/* SHOW WHAT REFERRAL CODE IS BEING USED */}
          {!error && requireReferral && (
            <SignupReferralCodeDisplay setChecking={setChecking} />
          )}
          {/* Link to login page */}
          <MarkdownText markdown={copy.loginReminder} />
        </>
      )}

      <MarkdownText className={[styles.tcText, 'small--text'].join(' ')} markdown={copy.tcText('sign up')} />
    </div>
  )
}

SignupPageContent.propTypes = {
  showEmailSignup: PropTypes.bool,
  requireReferral: PropTypes.bool,
  setChecking: PropTypes.func.isRequired,
}

SignupPageContent.defaultProps = {
  showEmailSignup: false,
  requireReferral: false,
}


export default SignupPageContent
