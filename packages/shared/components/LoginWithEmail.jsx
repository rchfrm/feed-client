// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/contexts/UserContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
// HOOKS
import useLogin from '@/app/hooks/useLogin'

import * as ROUTES from '@/app/constants/routes'

import { trackLogin } from '@/app/helpers/trackingHelpers'
import { fireSentryError } from '@/app/helpers/sentryHelpers'

import styles from '@/LoginPage.module.css'


function LoginWithEmail({ className }) {
  // IMPORT CONTEXTS
  const { rejectedPagePath } = React.useContext(AuthContext)
  const { storeUser, userError } = React.useContext(UserContext)
  const { setNoArtist, storeArtist } = React.useContext(ArtistContext)
  // GLOBAL LOADING
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  // DEFINE PAGE STATE
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  // GET LOGIN FUNCTION
  const { loginWithEmail } = useLogin()

  // HANDLE CHANGES IN FORM
  const handleChange = e => {
    setError(null)
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
    toggleGlobalLoading(true)

    // Login with email
    const { loginError, tokenError } = await loginWithEmail(email, password)
    if (loginError) {
      toggleGlobalLoading(false)
      setEmail('')
      setPassword('')
      setError(loginError)
      return
    }
    if (tokenError) {
      // Sentry error
      fireSentryError({
        category: 'login',
        label: 'failure',
        action: `no token returned from emailLogin: ${tokenError.message}`,
      })
      return
    }
    const { user, error } = await storeUser()
    if (error) {
      toggleGlobalLoading(false)
      setEmail('')
      setPassword('')
      setError(error)
      return
    }
    if (user.artists.length > 0) {
      const selectedArtist = user.artists[0]
      const { error } = await storeArtist(selectedArtist.id)
      // Handle loading artist error
      if (error) {
        toggleGlobalLoading(false)
        setEmail('')
        setPassword('')
        setError(error)
        return
      }
      // TRACK LOGIN
      trackLogin({ authProvider: 'password', userId: user.id })
      // REDIRECT
      const initialPage = rejectedPagePath
      Router.push(initialPage || ROUTES.HOME)
    } else {
      setNoArtist()
      // TRACK LOGIN
      trackLogin({ authProvider: 'password', userId: user.id })
      // REDIRECT
      Router.push(ROUTES.SIGN_UP_CONNECT_PROFILES)
    }
  }

  return (
    <form
      onSubmit={onFormSubmit}
      className={className}
    >

      <Error error={userError || error} />

      <Input
        className={styles.input}
        name="email"
        placeholder=""
        value={email || ''}
        handleChange={handleChange}
        type="email"
        label="Email"
        version="box"
        width={100}
        autoFocus
      />

      <Input
        className={styles.input}
        name="password"
        placeholder=""
        value={password}
        handleChange={handleChange}
        type="password"
        label="Password"
        version="box"
        width={100}
      />

      {/* Forgot password link */}
      <p className={['small--p', styles.forgotPasswordLink].join(' ')}>
        <Link href={ROUTES.PASSWORD_FORGET}><a>Forgot Password?</a></Link>
      </p>

      <Button
        className={styles.submit}
        version="black"
        disabled={false}
        onClick={onFormSubmit}
        type="input"
      >
        log in.
      </Button>

    </form>
  )
}

export default LoginWithEmail
