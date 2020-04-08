// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
// IMPORT HELPERS
import Spinner from './elements/Spinner'
import ButtonFacebook from './elements/ButtonFacebook'
import MarkdownText from './elements/MarkdownText'
// IMPORT COPY
import copy from '../copy/LoginPageCopy'
// IMPORT STYLES
import styles from './LoginPage.module.css'

const SignupPageContent = () => {
  // IMPORT CONTEXTS
  const { authLoading, continueWithFacebook } = React.useContext(AuthContext)
  const { userLoading } = React.useContext(UserContext)
  const { artistLoading } = React.useContext(ArtistContext)

  const facebookSignup = async e => {
    e.preventDefault()
    // Calls firebase.doSignInWithFacebook using a redirect,
    // so that when user is returned to log in page handleRedirect is triggered
    continueWithFacebook()
  }

  if (authLoading || userLoading || artistLoading) {
    return (
      <Spinner />
    )
  }

  return (
    <div className={styles.container}>

      <PageHeader className={styles.header} heading="log in" />

      <div className={styles.loginButtons}>
        <ButtonFacebook
          className={styles.facebookButton}
          onClick={facebookSignup}
        >
          Sign up with Facebook
        </ButtonFacebook>
      </div>

      {/* Link to login page */}
      <MarkdownText markdown={copy.loginReminder} />

      <MarkdownText className={[styles.tcText, 'small--text'].join(' ')} markdown={copy.tcText} />
    </div>
  )
}

SignupPageContent.propTypes = {

}

export default SignupPageContent
