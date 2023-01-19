import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Link from 'next/link'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import EditBlock from '@/app/EditBlock'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import useLogin from '@/app/hooks/useLogin'
import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { acceptProfileInvite } from '@/app/helpers/artistHelpers'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/LoginPageCopy'

import { trackLogin } from '@/helpers/trackingHelpers'
import { fireSentryError } from '@/app/helpers/sentryHelpers'

import styles from '@/LoginPage.module.css'

const LoginEmailForm = ({ initialEmail, className }) => {
  // IMPORT CONTEXTS
  const { rejectedPagePath } = React.useContext(AuthContext)
  const { setNoArtist, storeArtist } = React.useContext(ArtistContext)
  const { storeUser, userError } = React.useContext(UserContext)
  // GLOBAL LOADING
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  // DEFINE PAGE STATE
  const [email, setEmail] = React.useState(initialEmail)
  const [password, setPassword] = React.useState('')
  const [isEmailEdit, setIsEmailEdit] = React.useState(! initialEmail)
  const [error, setError] = React.useState(null)
  // GET LOGIN FUNCTION
  const { loginWithEmail } = useLogin()
  const inviteToken = getLocalStorage('inviteToken')
  let selectedArtistId = ''

  // HANDLE CHANGES IN FORM
  const handleChange = (e) => {
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
  const onFormSubmit = async (e) => {
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

    if (inviteToken) {
      const { res, error } = await acceptProfileInvite(inviteToken)
      setLocalStorage('inviteToken', '')

      if (error) {
        toggleGlobalLoading(false)
        setError(error)
        return
      }

      selectedArtistId = res.profileId
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
      if (! inviteToken) {
        selectedArtistId = user.artists[0].id
      }

      const { error } = await storeArtist(selectedArtistId)
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

      if (inviteToken) {
        Router.push(ROUTES.PROFILE_INVITE_SUCCESS)
        return
      }

      Router.push(initialPage || ROUTES.HOME)
    } else {
      setNoArtist()
      // TRACK LOGIN
      trackLogin({ authProvider: 'password', userId: user.id })
      // REDIRECT
      Router.push(user.is_email_verification_needed ? ROUTES.CONFIRM_EMAIL : ROUTES.POSTS)
    }
  }

  return (
    <form
      onSubmit={onFormSubmit}
      className={className}
    >

      <Error error={userError || error} />
      <h2 className="mb-4 text-xl">Enter your {! initialEmail ? 'email &' : ''} password</h2>
      <MarkdownText className={[styles.tcText, 'small--text', 'mb-4'].join(' ')} markdown={copy.tcText('logging in')} />
      {isEmailEdit ? (
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
      ) : (
        <EditBlock
          value={email}
          isEditMode={isEmailEdit}
          setIsEditMode={setIsEmailEdit}
          trackComponentName="LoginEmailform"
          className="mb-4"
        />
      )}

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
        type="submit"
        onClick={onFormSubmit}
        className={[styles.submit, 'ml-auto'].join(' ')}
        trackComponentName="LoginEmailForm"
      >
        Log in
      </Button>

    </form>
  )
}

LoginEmailForm.propTypes = {
  initialEmail: PropTypes.string,
  className: PropTypes.string,
}

LoginEmailForm.defaultProps = {
  initialEmail: '',
  className: null,
}

export default LoginEmailForm
