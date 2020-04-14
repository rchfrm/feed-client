// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Input from './elements/Input'
import Button from './elements/Button'
import Error from './elements/Error'
import Spinner from './elements/Spinner'

import * as ROUTES from '../constants/routes'

import { track } from './helpers/trackingHelpers'

import styles from './LoginPage.module.css'


function LoginWithEmail({ className }) {
  // IMPORT CONTEXTS
  const { emailLogin } = React.useContext(AuthContext)
  const { storeUser, userError } = React.useContext(UserContext)
  const { setNoArtist, storeArtist } = React.useContext(ArtistContext)

  // DEFINE PAGE STATE
  const [pageLoading, setPageLoading] = React.useState(false)
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

  // * HANDLE FORM SUBMIT
  const onFormSubmit = async e => {
    e.preventDefault()
    setError(null)
    setPageLoading(true)

    track({
      category: 'login',
      action: 'submit login form',
      label: email,
      breadcrumb: true,
      ga: false,
    })

    // Login with email
    const token = await emailLogin(email, password)
      .catch((error) => {
        setPageLoading(false)
        setEmail('')
        setPassword('')
        setError(error)
        track({
          category: 'login',
          action: 'no token returned from emailLogin',
          label: email,
          description: error.message,
          error: true,
        })
      })
    if (!token) return
    const user = await storeUser()
      .catch((error) => {
        setPageLoading(false)
        setEmail('')
        setPassword('')
        setError(error)
        track({
          category: 'login',
          action: 'error storing user',
          label: email,
          description: error.message,
          error: true,
        })
      })
    if (!user) return
    if (user.artists.length > 0) {
      const selectedArtist = user.artists[0]
      await storeArtist(selectedArtist.id)
      Router.push(ROUTES.HOME)
      track({
        category: 'login',
        action: 'logged in via email',
        label: email,
        breadcrumb: true,
      })
    } else {
      setNoArtist()
      Router.push(ROUTES.SIGN_UP_CONTINUE)
      track({
        category: 'login',
        action: 'succesful login via email with no artists',
        label: email,
      })
    }
  }
  // END HANDLE CLICK ON LOG IN BUTTON

  if (pageLoading) {
    return (
      <Spinner />
    )
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
