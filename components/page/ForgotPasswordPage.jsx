// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
import Input from '../elements/Input'
import Button from '../elements/Button'
import Error from '../elements/Error'
import Success from '../elements/Success'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import firebase from '../helpers/firebase'
// IMPORT STYLES
import styles from '../ForgotPasswordPage.module.css'

// TODO: Update Auth Authentication with a display name, so that we can address users by name in emails

function ForgotPasswordPage() {
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])

  const [email, setEmail] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [error, setError] = React.useState(null)

  const isInvalid = email === ''

  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="forgotten password" />

      <div className="ninety-wide page--container">

        {success ? <Success className={styles.successMessage} message={success} /> : (
          <>
            <p className={styles.introText}>Enter your email address below to receive a link, and reset your password.</p>

            <PasswordForgetForm
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

    </div>
  )
}

function PasswordForgetForm({ setSuccess, setError, setEmail, email, error, isInvalid }) {
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
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
    setSuccess(`Instructions for resetting your password have been sent to ${email}`)
    setEmail('')
    setLoading(false)
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

export default ForgotPasswordPage

export { PasswordForgetForm }
