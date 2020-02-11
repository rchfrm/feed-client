// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../../components/contexts/Navigation'
import { AuthContext } from '../../components/contexts/Auth'
import { UserContext } from '../../components/contexts/User'
import { ArtistContext } from '../../components/contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from '../../components/elements/PageHeader'
import Input from '../../components/elements/Input'
import Button from '../../components/elements/Button'
import Error from '../../components/elements/Error'
import Spinner from '../../components/elements/Spinner'
// IMPORT PAGES
import { SignUpLink } from '../signup'
import { PasswordForgetLink } from '../password-forget'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
// IMPORT STYLES

function LogInPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page-container ${className}`}>

      <LogInForm />

    </div>
  )
}

export default LogInPage

function LogInForm() {
// IMPORT CONTEXTS
  const { authError, authLoading, continueWithFacebook, logIn } = React.useContext(AuthContext)
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
  const handleClick = async e => {
    e.preventDefault()
    setError(null)
    try {
      await logIn(email, password)
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
      <Spinner width={50} colour={brandColours.green.hex} />
    )
  }
  return (
    <div className="page-container">

      <PageHeader heading="log in" />
      <SignUpLink />
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

      <div className="ninety-wide page-container">

        <div className="fill-height" style={{ width: '65.738%', margin: '0 auto' }}>

          <Button version="facebook" width={100} marginBottom="1.5em" onClick={facebookClick}>
            Log in with Facebook
          </Button>

          <p>or log in using your email address...</p>

          <Input
            name="email"
            placeholder="Email Address"
            value={email || ''}
            onChange={handleChange}
            type="text"
            label="none"
            version="box"
            width={100}
          />

          <Input
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            type="password"
            label="none"
            version="box"
            width={100}
          />

          <PasswordForgetLink />

          <Error error={authError || userError || error} />

        </div>

        <Button version="black progress" disabled={false} onClick={handleClick}>
          log in.
        </Button>

      </div>

    </div>
  )
}

export function LogIn() {
  return (
    <h3 className="ninety-wide">
      or log in
      {' '}
      <Link href={ROUTES.LOG_IN}><a>here</a></Link>
      .
    </h3>
  )
}
