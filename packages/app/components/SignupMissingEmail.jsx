import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import { AuthContext } from '@/contexts/AuthContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { UserContext } from '@/contexts/UserContext'

import { testValidEmail } from '@/helpers/utils'
import { redirectPage } from '@/app/helpers/signupHelpers'
import { trackSignUp } from '@/app/helpers/trackingHelpers'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/signupCopy'

import styles from '@/LoginPage.module.css'


const SignupMissingEmail = ({ fbEmail, className }) => {
  // GET AUTH and ARTIST context
  const { auth: { authProfile } } = React.useContext(AuthContext)
  const { setNoArtist } = React.useContext(ArtistContext)
  const [email, setEmail] = React.useState(fbEmail)
  const [isEmailValid, setIsEmailValid] = React.useState(false)
  const [showEmailError, setShowEmailError] = React.useState(false)
  const [firstName, setFirstName] = React.useState(authProfile.first_name)
  const [lastName, setLastName] = React.useState(authProfile.last_name)
  const [loading, setLoading] = React.useState(false)
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [error, setError] = React.useState(null)
  // TEST EMAIL VALIDITY
  React.useEffect(() => {
    const isEmailValid = testValidEmail(email)
    setIsEmailValid(isEmailValid)
  }, [email])
  // TEST FORM VALIDITY
  React.useEffect(() => {
    const isFormValid = firstName && lastName && isEmailValid
    setIsFormValid(isFormValid)
  }, [firstName, lastName, isEmailValid])
  // GET USER CREATION
  const { runCreateUser, setUserLoading } = React.useContext(UserContext)
  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return
    setLoading(true)
    setUserLoading(true)
    // STORE USER
    const { res: user, error } = await runCreateUser({
      firstName,
      lastName,
      email,
    })
    if (error) {
      setError(error)
      setUserLoading(false)
      setLoading(false)
      return
    }
    // Clear artists (beacuse new user)
    setNoArtist()
    // Stop loading
    setUserLoading(false)
    setLoading(false)
    setError(null)
    // TRACK
    trackSignUp({ authProvider: 'facebook', userId: user.id })
    // REDIRECT
    redirectPage(ROUTES.CONFIRM_EMAIL)
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
          // placeholder="Contact email"
          value={email}
          updateValue={setEmail}
          type="email"
          error={!isEmailValid && showEmailError}
          autoFocus
          onBlur={() => {
            setShowEmailError(true)
          }}
        />
        {/* FIRST NAME */}
        {!authProfile.first_name && (
          <Input
            name="firstName"
            label="First name"
            value={firstName}
            updateValue={setFirstName}
            type="text"
          />
        )}
        {/* LAST NAME */}
        {!authProfile.last_name && (
          <Input
            name="lastName"
            label="Last name"
            value={lastName}
            updateValue={setLastName}
            type="text"
          />
        )}
        {/* SUBMIT BUTTON */}
        <Button
          version="black wide"
          disabled={!isFormValid}
          type="sumbit"
          loading={loading}
          className="ml-auto"
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
