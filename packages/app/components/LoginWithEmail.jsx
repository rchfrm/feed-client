// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/contexts/UserContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import LoginWithEmailForm from '@/LoginWithEmailForm'

import * as ROUTES from '@/app/constants/routes'

import { track } from '@/helpers/trackingHelpers'


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

  // HANDLE CLICK ON LOG IN BUTTON
  const onSubmit = React.useCallback(async (e) => {
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
  // eslint-disable-next-line
  }, [email, password])

  return (
    <LoginWithEmailForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
      error={error || userError}
      setError={setError}
      className={className}
    />
  )
}

export default LoginWithEmail
