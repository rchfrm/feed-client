// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
// IMPORT COMPONENTS
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
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
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

      <PageHeader heading="log in" className={styles.container} />

      <div className={['ninety-wide', styles.container].join(' ')}>
        <h3>
          or
          {' '}
          <Link href={ROUTES.SIGN_UP}><a>sign up here</a></Link>
          .
        </h3>
      </div>

      <div className={['ninety-wide', styles.container].join(' ')}>

        <div className={styles.intro}>
          <MarkdownText markdown={copy.intro} />
        </div>

        <div className={styles.loginButtons}>
          {/* FB button */}
          <ButtonFacebook
            className={styles.facebookButton}
            onClick={facebookClick}
          >
            Log in with Facebook
          </ButtonFacebook>
          {/* Email button */}
          <Button
            className={styles.emailButton}
            onClick={() => setShowEmailLogin(true)}
            version="black icon"
          >
            <EmailIcon color="white" />
            Log in with email
          </Button>
        </div>

        {/* Email login form */}
        {showEmailLogin && <LoginPageForm setPageLoading={setPageLoading} />}

      </div>
    </div>
  )
}

export default LoginPageContent
