// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import ButtonFacebook from './elements/ButtonFacebook'
import Spinner from './elements/Spinner'
// IMPORT COMPONENTS
import SignupPageLink from './SignupPageLink'
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
    <div className="page--container">

      <PageHeader heading="log in" />

      <SignupPageLink />

      <div className={['ninety-wide', styles.intro].join(' ')}>
        <MarkdownText markdown={copy.intro} />
      </div>

      <div className="page--container  ninety-wide">


        <ButtonFacebook
          className={styles.facebookButton}
          onClick={facebookClick}
        >
          Log in with Facebook
        </ButtonFacebook>

        <p className={styles.emailFormButton}>
          <a
            className={styles.a}
            role="button"
            onClick={() => setShowEmailLogin(true)}
          >
            or log in using your email address...
          </a>
        </p>

        {/* Email login form */}
        {showEmailLogin && <LoginPageForm setPageLoading={setPageLoading} />}
      </div>
    </div>
  )
}

export default LoginPageContent
