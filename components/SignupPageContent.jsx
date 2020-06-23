// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/Auth'
// IMPORT COMPONENTS
import SignupEmailForm from '@/SignupEmailForm'
// IMPORT HELPERS
import firebase from '@/helpers/firebase'
import { track } from '@/helpers/trackingHelpers'
// IMPORT ELEMENTS
import Button from '@/elements/Button'
import EmailIcon from '@/icons/EmailIcon'
import ButtonFacebook from '@/elements/ButtonFacebook'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
// Constants
import * as ROUTES from '~/constants/routes'
// IMPORT COPY
import copy from '@/copy/LoginPageCopy'
// IMPORT STYLES
import styles from '@/LoginPage.module.css'
import brandColors from '~/constants/brandColors'

const SignupPageContent = ({ showEmailSignup }) => {
  const { authError, setAuthError } = React.useContext(AuthContext)
  // Handle error
  const [error, setError] = React.useState(null)
  // Change route when clicking on facebook button
  const goToEmailSignup = () => {
    setError(null)
    Router.push(ROUTES.SIGN_UP_EMAIL)
  }

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
        track({
          category: 'sign up',
          action: 'error clicking on FB button',
          error: true,
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
          <div className={styles.loginButtons}>
            <ButtonFacebook
              className={styles.facebookButton}
              onClick={facebookSignup}
            >
              Sign up with Facebook
            </ButtonFacebook>
            <Button
              className={styles.emailButton}
              onClick={goToEmailSignup}
              version="black icon"
            >
              <EmailIcon color={brandColors.bgColor} />
              Sign up with email
            </Button>
          </div>

          {/* Link to login page */}
          <MarkdownText markdown={copy.loginReminder} />
        </>
      )}

      <MarkdownText className={[styles.tcText, 'small--text'].join(' ')} markdown={copy.tcText('sign up')} />
    </div>
  )
}

SignupPageContent.propTypes = {

}

export default SignupPageContent
