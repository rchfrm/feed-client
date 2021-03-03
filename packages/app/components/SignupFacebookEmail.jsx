import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'
import Button from '@/elements/Button'

import { testValidEmail } from '@/helpers/utils'

import copy from '@/app/copy/signupCopy'

import styles from '@/LoginPage.module.css'


const SignupFacebookEmail = ({ fbEmail, className }) => {
  const [email, setEmail] = React.useState(fbEmail)
  const [isEmailValid, setIsEmailValid] = React.useState(false)
  const [showEmailError, setShowEmailError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const isEmailValid = testValidEmail(email)
    setIsEmailValid(isEmailValid)
  }, [email])
  // Submit form
  const onSubmit = (e) => {
    e.preventDefault()
    if (!isEmailValid) return
    setLoading(true)
    console.log('submit email', email)
    setLoading(false)
  }
  return (
    <div
      className={[
        styles.container,
        className,
      ].join(' ')}
    >
      <MarkdownText markdown={copy.missingFbEmail} />
      <form onSubmit={onSubmit}>
        <Input
          name="emailContact"
          label="Contact email address"
          placeholder=""
          value={email}
          updateValue={setEmail}
          type="email"
          error={!isEmailValid && showEmailError}
          autoFocus
          onBlur={() => {
            setShowEmailError(true)
          }}
        />
        <Button
          version="black wide"
          disabled={!isEmailValid}
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

SignupFacebookEmail.propTypes = {
  fbEmail: PropTypes.string,
  className: PropTypes.string,
}

SignupFacebookEmail.defaultProps = {
  fbEmail: '',
  className: null,
}

export default SignupFacebookEmail
