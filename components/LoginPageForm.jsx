// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import InputNew from './elements/InputNew'
import Button from './elements/Button'
import ButtonFacebook from './elements/ButtonFacebook'
import Error from './elements/Error'
import Spinner from './elements/Spinner'
// IMPORT COMPONENTS
import SignupPageLink from './SignupPageLink'
import LoginPagePasswordForgetLink from './LoginPagePasswordForgetLink'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
import brandColours from '../constants/brandColours'

import styles from './LoginPage.module.css'

function LoginPageForm() {
  // IMPORT CONTEXTS
  const { authError, authLoading, continueWithFacebook, login } = React.useContext(AuthContext)
  const { storeUser, userError, userLoading } = React.useContext(UserContext)
  const { artistLoading, noArtist, storeArtist } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // DEFINE PAGE STATE
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  // END DEFINE PAGE STATE

  // CONTINUE WITH FACEBOOK
  const facebookClick = e => {
    e.preventDefault()
    setError(null)
    // Calls firebase.doSignInWithFacebook using a redirect,
    // so that when user is returned to log in page handleRedirect is triggered
    continueWithFacebook()
  }
  // END CONTINUE WITH FACEBOOK

  // HANDLE CHANGES IN FORM
  const handleChange = e => {
    setError('')
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }
  // END HANDLE CHANGES IN FORM

  // HANDLE CLICK ON LOG IN BUTTON
  const onFormSubmit = async e => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      const newUser = await storeUser()
      if (newUser.artists.length > 0) {
        const selectedArtist = newUser.artists[0]
        await storeArtist(selectedArtist.id)
        Router.push(ROUTES.HOME)
      } else {
        noArtist()
        Router.push(ROUTES.CONNECT_ARTIST)
      }
    } catch (err) {
      setEmail('')
      setPassword('')
      setError(err)
    }
  }
  // END HANDLE CLICK ON LOG IN BUTTON

  if (authLoading || userLoading || artistLoading) {
    return (
      <Spinner width={50} colour={brandColours.green} />
    )
  }
  return (
    <div className="page--container">

      <PageHeader heading="log in" />
      <SignupPageLink />
      <p
        className="ninety-wide"
        style={{ marginBottom: '3em' }}
      >
        By clicking log in, you agree to our
        {' '}
        <a href="https://archform.ltd/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
        {' '}
        and
        {' '}
        <a href="https://archform.ltd/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        .
      </p>

      <div className="ninety-wide page--container">

        <div className="fill-height" style={{ width: '65.738%', margin: '0 auto' }}>

          <ButtonFacebook
            width={100}
            marginBottom="1.5em"
            onClick={facebookClick}
          >
            Log in with Facebook
          </ButtonFacebook>

          <p>or log in using your email address...</p>

          <form
            onSubmit={onFormSubmit}
            className={styles.LoginPage__form}
          >

            <InputNew
              name="email"
              placeholder=""
              value={email || ''}
              handleChange={handleChange}
              type="email"
              label="Email"
              version="box"
              width={100}
            />

            <InputNew
              name="password"
              placeholder=""
              value={password}
              handleChange={handleChange}
              type="password"
              label="Password"
              version="box"
              width={100}
            />

            <Error error={authError || userError || error} />

            <LoginPagePasswordForgetLink />

            <Button
              className={styles.LoginPage__submit}
              marginBottom="20px"
              version="black progress"
              disabled={false}
              onClick={onFormSubmit}
              type="input"
            >
              log in.
            </Button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPageForm
