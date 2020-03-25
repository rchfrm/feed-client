// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { AuthContext } from '../contexts/Auth'
import { UserContext } from '../contexts/User'
import { ArtistContext } from '../contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
// IMPORT PAGES

// IMPORT HELPERS
import Spinner from '../elements/Spinner'
import ButtonFacebook from '../elements/ButtonFacebook'

import * as ROUTES from '../../constants/routes'
import brandColors from '../../constants/brandColors'
// IMPORT STYLES
import MarkdownText from '../elements/MarkdownText'
import copy from '../../copy/LoginPageCopy'

import styles from '../LoginPage.module.css'


function SignupPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

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
    return <Spinner width={50} color={brandColors.green} />
  }
  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="sign up" className={styles.container} />

      <div className={['ninety-wide', styles.container].join(' ')}>
        <h3>
          or log in
          {' '}
          <Link href={ROUTES.LOGIN}><a>here</a></Link>
          .
        </h3>
      </div>

      <div className={['ninety-wide', styles.container].join(' ')}>

        <div className={styles.intro}>
          <MarkdownText markdown={copy.intro} />
        </div>

        <ButtonFacebook
          className={styles.facebookButton}
          onClick={facebookSignup}
        >
          Sign up with Facebook
        </ButtonFacebook>

      </div>

    </div>
  )
}


export default SignupPage
