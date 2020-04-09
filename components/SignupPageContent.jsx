// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import SignupEmailForm from './SignupEmailForm'
// IMPORT HELPERS
import Spinner from './elements/Spinner'
import Button from './elements/Button'
import EmailIcon from './icons/EmailIcon'
import ButtonFacebook from './elements/ButtonFacebook'
import MarkdownText from './elements/MarkdownText'
// IMPORT COPY
import copy from '../copy/LoginPageCopy'
// IMPORT STYLES
import styles from './LoginPage.module.css'

const SignupPageContent = () => {
  const [pageLoading, setPageLoading] = React.useState(false)
  const [showEmailSignup, setShowEmailSignup] = React.useState(false)
  // IMPORT CONTEXTS
  const { authLoading, continueWithFacebook } = React.useContext(AuthContext)
  const { userLoading } = React.useContext(UserContext)
  const { artistLoading } = React.useContext(ArtistContext)

  const facebookSignup = async () => {
    // Calls firebase.doSignInWithFacebook using a redirect,
    // so that when user is returned to log in page handleRedirect is triggered
    continueWithFacebook()
  }

  if (authLoading || userLoading || artistLoading || pageLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.container}>

      <PageHeader className={styles.header} heading="sign up" />

      {/* Email login form */}
      {showEmailSignup ? (
        // EMAIL LOGIN FORM
        <SignupEmailForm className={styles.form} setPageLoading={setPageLoading} />
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
