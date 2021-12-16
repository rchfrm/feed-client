// * APP VERSION

// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
import Router, { useRouter } from 'next/router'
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import LoginEmailForm from '@/app/LoginEmailForm'
import LoginSignupButtons from '@/LoginSignupButtons'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import { parseUrl } from '@/helpers/utils'
// IMPORT CONSTANTS
import * as ROUTES from '@/app/constants/routes'
// Import copy
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/LoginPageCopy'
// Import styles
import styles from '@/LoginPage.module.css'

function LoginPageContent({ showEmailLogin, showFacebookLogin }) {
  const { authError, setAuthError } = React.useContext(AuthContext)
  const [email, setEmail] = React.useState('')
  const [hasCheckedEmail, setHasCheckedEmail] = React.useState(false)
  const { asPath: urlString } = useRouter()

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

  React.useEffect(() => {
    const { query } = parseUrl(urlString)
    const email = decodeURIComponent(query?.email || '')

    if (email) {
      setEmail(email)
    }
    setHasCheckedEmail(true)
    // eslint-disable-next-line
  }, [])

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
      {showEmailLogin && hasCheckedEmail ? (
        <LoginEmailForm
          initialEmail={email}
          className={styles.form}
        />
      ) : (
        <>
          {/* LOGIN BUTTONS */}
          <LoginSignupButtons
            type="login"
            isFacebookLogin={showFacebookLogin}
            onFacebookClick={facebookClick}
            onEmailClick={goToEmailLogin}
          />
          {/* Link to signup page */}
          <MarkdownText markdown={copy.signupReminder} className="mb-10" />
          <MarkdownText className={['small--text'].join(' ')} markdown={copy.tcText('logging in')} />
        </>
      )}
    </div>
  )
}

LoginPageContent.propTypes = {
  showEmailLogin: PropTypes.bool,
  showFacebookLogin: PropTypes.bool,
}

LoginPageContent.defaultProps = {
  showEmailLogin: false,
  showFacebookLogin: false,
}

export default LoginPageContent
