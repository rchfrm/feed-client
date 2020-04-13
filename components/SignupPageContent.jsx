// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import SignupEmailForm from './SignupEmailForm'
// IMPORT HELPERS
import Button from './elements/Button'
import EmailIcon from './icons/EmailIcon'
import ButtonFacebook from './elements/ButtonFacebook'
import MarkdownText from './elements/MarkdownText'
// IMPORT COPY
import copy from '../copy/LoginPageCopy'
// IMPORT STYLES
import styles from './LoginPage.module.css'

const SignupPageContent = () => {
  const [showEmailSignup, setShowEmailSignup] = React.useState(false)
  // IMPORT CONTEXTS
  const { continueWithFacebook } = React.useContext(AuthContext)

  // Calls firebase.doSignInWithFacebook using a redirect,
  // so that when user is returned to log in page handleRedirect is triggered
  const facebookSignup = async () => {
    continueWithFacebook()
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
              onClick={() => setShowEmailSignup(true)}
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
