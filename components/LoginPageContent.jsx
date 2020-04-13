// IMPORT PACKAGES
import React from 'react'
import Router, { useRouter } from 'next/router'
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

// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// Import copy
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/LoginPageCopy'
// Import styles
import styles from './LoginPage.module.css'

function LoginPageContent() {
  // Get router info
  const router = useRouter()
  const { pathname } = router
  // IMPORT CONTEXTS
  const { authLoading, loginWithFacebook } = React.useContext(AuthContext)
  const { userLoading } = React.useContext(UserContext)
  const { artistLoading } = React.useContext(ArtistContext)

  const [pageLoading, setPageLoading] = React.useState(false)
  const [showEmailLogin, setShowEmailLogin] = React.useState(false)

  // Show email login when route changes
  React.useEffect(() => {
    if (pathname === ROUTES.LOGIN_EMAIL) {
      setShowEmailLogin(true)
      return
    }
    setShowEmailLogin(false)
  }, [pathname])

  // Change route when clicking on facebook button
  const goToEmailLogin = () => {
    Router.push(ROUTES.LOGIN_EMAIL)
  }

  // CONTINUE WITH FACEBOOK
  // Calls firebase.loginWithFacebook using a redirect,
  // so that when user is returned to log in page handleRedirect is triggered
  const facebookClick = () => {
    loginWithFacebook()
  }

  if (authLoading || userLoading || artistLoading || pageLoading) {
    return (
      <Spinner />
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
                onClick={goToEmailLogin}
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
      <MarkdownText className={[styles.tcText, 'small--text'].join(' ')} markdown={copy.tcText('log in')} />

    </div>
  )
}

export default LoginPageContent
