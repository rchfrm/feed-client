// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/Auth'
import { UserContext } from '@/contexts/User'
import { ArtistContext } from '@/contexts/Artist'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import * as ROUTES from '@/constants/routes'

import { track } from '@/helpers/trackingHelpers'

import styles from '@/LoginPage.module.css'


function LoginWithEmail({ className }) {
  // IMPORT CONTEXTS
  const { emailLogin } = React.useContext(AuthContext)
  const { storeUser, userError } = React.useContext(UserContext)
  const { setNoArtist, storeArtist } = React.useContext(ArtistContext)
  // GLOBAL LOADING
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  // DEFINE PAGE STATE
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)

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
    const { loginError, tokenError } = await emailLogin(email, password)
    if (loginError) {
      toggleGlobalLoading(false)
      setEmail('')
      setPassword('')
      setError(loginError)
      track({
        category: 'login',
        label: 'failure',
        action: loginError.message,
      })
      return
    }
    if (tokenError) {
      track({
        category: 'login',
        label: 'failure',
        action: `no token returned from emailLogin: ${tokenError.message}`,
        error: true,
      })
      return
    }
    const user = await storeUser()
      .catch((err) => {
        toggleGlobalLoading(false)
        setEmail('')
        setPassword('')
        setError(err)
      })
    if (!user) return
    if (user.artists.length > 0) {
      const selectedArtist = user.artists[0]
      await storeArtist(selectedArtist.id)
      Router.push(ROUTES.HOME)
      track({
        category: 'login',
        label: user.id,
        action: 'Logged in via password',
      })
      track({
        category: 'login',
        label: user.id,
        action: 'Logged in',
      })
    } else {
      setNoArtist()
      Router.push(ROUTES.SIGN_UP_CONTINUE)
      track({
        category: 'login',
        label: user.id,
        action: 'Logged in via password, with no artists',
      })
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
