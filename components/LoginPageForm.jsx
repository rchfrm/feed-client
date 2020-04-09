// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Input from './elements/Input'
import Button from './elements/Button'
import Error from './elements/Error'

// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'

import styles from './LoginPage.module.css'

function LoginPageForm({ className, setPageLoading }) {
  // IMPORT CONTEXTS
  const { authError, login } = React.useContext(AuthContext)
  const { storeUser, userError } = React.useContext(UserContext)
  const { noArtist, storeArtist } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // DEFINE PAGE STATE
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  // END DEFINE PAGE STATE

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
    setPageLoading(true)
    try {
      await login(email, password)
      const newUser = await storeUser()
      if (newUser.artists.length > 0) {
        const selectedArtist = newUser.artists[0]
        await storeArtist(selectedArtist.id)
        Router.push(ROUTES.HOME)
      } else {
        noArtist()
        Router.push(ROUTES.CONNECT_ACCOUNTS)
      }
    } catch (err) {
      setPageLoading(false)
      setEmail('')
      setPassword('')
      setError(err)
    }
  }
  // END HANDLE CLICK ON LOG IN BUTTON

  return (
    <form
      onSubmit={onFormSubmit}
      className={className}
    >

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

      <Error error={authError || userError || error} />

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

export default LoginPageForm
