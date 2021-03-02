// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Success from '@/elements/Success'
// IMPORT HELPERS
import firebase from '@/helpers/firebase'
import { track } from '@/app/helpers/trackingHelpers'
// IMPORT STYLES
import styles from '@/app/ForgotPasswordPage.module.css'


function ForgotPasswordForm({ setSuccess, setError, setEmail, email, error, isInvalid }) {
  const [loading, setLoading] = React.useState(false)
  const handleChange = e => {
    setSuccess('')
    setError(null)
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      default:
        break
    }
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await firebase.doPasswordReset(email)
      .catch((error) => {
        setError(error)
        setLoading(false)
        return { error }
      })
    setSuccess(`Instructions for resetting your password have been sent to ${email}`)
    setEmail('')
    setLoading(false)
    track('reset_password')
  }

  return (
    <div className={styles.formContainer}>

      <form
        onSubmit={onFormSubmit}
        className={styles.form}
      >

        <Input
          className={styles.input}
          name="email"
          label="Email Address"
          value={email}
          handleChange={handleChange}
          version="box"
          type="email"
          width={100}
        />

        <Button
          className={styles.button}
          disabled={isInvalid || loading}
          version="black"
          type="input"
          loading={loading}
        >
          reset.
        </Button>

        <Error error={error} />

      </form>
    </div>
  )
}


function ForgotPasswordContent() {
  const [email, setEmail] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [error, setError] = React.useState(null)

  const isInvalid = email === ''

  return (
    <div>
      {success ? <Success className={styles.successMessage} message={success} /> : (
        <>
          <p className={styles.introText}>Enter your email address below to receive a link, and reset your password.</p>

          <ForgotPasswordForm
            error={error}
            setError={setError}
            success={success}
            setSuccess={setSuccess}
            email={email}
            setEmail={setEmail}
            isInvalid={isInvalid}
          />
        </>
      )}
    </div>
  )
}

export default ForgotPasswordContent
