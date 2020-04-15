// IMPORT PACKAGES
import React from 'react'
import Router, { useRouter } from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import SignupEmailForm from './SignupEmailForm'
// IMPORT HELPERS
import firebase from './helpers/firebase'
// IMPORT ELEMENTS
import Button from './elements/Button'
import EmailIcon from './icons/EmailIcon'
import ButtonFacebook from './elements/ButtonFacebook'
import MarkdownText from './elements/MarkdownText'
// Constants
import * as ROUTES from '../constants/routes'
// IMPORT COPY
import copy from '../copy/LoginPageCopy'
// IMPORT STYLES
import styles from './LoginPage.module.css'

const SignupPageContent = () => {
  const [showEmailSignup, setShowEmailSignup] = React.useState(false)
  // Get router info
  const router = useRouter()
  const { pathname } = router
  // Show email login when route changes
  React.useEffect(() => {
    if (pathname === ROUTES.SIGN_UP_EMAIL) {
      setShowEmailSignup(true)
      return
    }
    setShowEmailSignup(false)
  }, [pathname])

  // Change route when clicking on facebook button
  const goToEmailSignup = () => {
    Router.push(ROUTES.SIGN_UP_EMAIL)
  }

  // Calls firebase.signupWithFacebook using a redirect,
  // so that when user is returned to log in page handleRedirect is triggered
  const facebookSignup = async () => {
    firebase.signUpWithFacebook()
  }

  return (
    <div className={styles.container}>

      <PageHeader className={styles.header} heading="sign up" />

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
              <EmailIcon color="white" />
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
