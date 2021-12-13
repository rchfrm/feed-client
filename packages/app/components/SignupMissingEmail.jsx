import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import { testValidEmail } from '@/helpers/utils'
import { redirectPage } from '@/app/helpers/signupHelpers'
import { trackSignUp } from '@/helpers/trackingHelpers'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/signupCopy'

import styles from '@/LoginPage.module.css'

const SignupMissingEmail = ({ fbEmail, className }) => {
  // GET AUTH and ARTIST context
  const { setNoArtist } = React.useContext(ArtistContext)
  const [email, setEmail] = React.useState(fbEmail)
  const [isEmailValid, setIsEmailValid] = React.useState(false)
  const [showEmailError, setShowEmailError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  // TEST EMAIL VALIDITY
  React.useEffect(() => {
    const isEmailValid = testValidEmail(email)
    setIsEmailValid(isEmailValid)
  }, [email])
  // GET USER CREATION
  const { runCreateUser, setUserLoading } = React.useContext(UserContext)
  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isEmailValid) return
    setLoading(true)
    setUserLoading(true)
    // STORE USER
    const { res: user, error } = await runCreateUser(email)
    if (error) {
      setError(error)
      setUserLoading(false)
      setLoading(false)
      return
    }
    // Clear artists (because new user)
    setNoArtist()
    // Stop loading
    setUserLoading(false)
    setLoading(false)
    setError(null)
    // TRACK
    trackSignUp({ authProvider: 'facebook', userId: user.id })
    // REDIRECT
    redirectPage(ROUTES.POSTS)
  }
  return (
    <div
      className={[
        styles.container,
        className,
      ].join(' ')}
    >
      <MarkdownText markdown={copy.missingFbEmail} />
      <Error error={error} />
      <form onSubmit={onSubmit}>
        {/* EMAIL */}
        <Input
          name="emailContact"
          label="Contact email"
          value={email}
          updateValue={setEmail}
          type="email"
          error={!isEmailValid && showEmailError}
          autoFocus
          onBlur={() => {
            setShowEmailError(true)
          }}
        />
        {/* SUBMIT BUTTON */}
        <Button
          version="black wide"
          disabled={!isEmailValid}
          type="sumbit"
          loading={loading}
          className="ml-auto"
          trackComponentName="SignupMissingEmail"
        >
          submit
        </Button>
      </form>
    </div>
  )
}

SignupMissingEmail.propTypes = {
  fbEmail: PropTypes.string,
  className: PropTypes.string,
}

SignupMissingEmail.defaultProps = {
  fbEmail: '',
  className: null,
}

export default SignupMissingEmail
