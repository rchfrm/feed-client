// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
import Form from '../elements/Form'
import Input from '../elements/Input'
import Button from '../elements/Button'
import Error from '../elements/Error'
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
  const [error, setError] = React.useState('')

  const isInvalid = email === ''

  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="forgotten password" />

      <div className="ninety-wide page--container">

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

      </div>

    </div>
  )
}

function PasswordForgetForm({ setSuccess, setError, setEmail, email, success, error, isInvalid }) {
  const handleChange = e => {
    setSuccess('')
    setError('')
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      default:
        break
    }
  }

  const onSumbit = async e => {
    e.preventDefault()
    try {
      await firebase.doPasswordReset(email)
      setSuccess('Please check your email to finish resetting your password.')
      setEmail('')
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className="fill-height">

      <form
        onSumbit={onSumbit}
        className={styles.form}
      >

        <Input
          className={styles.input}
          name="email"
          label="Email Address"
          value={email}
          handleChange={handleChange}
          version="box"
          width={100}
        />

        <Button
          className={styles.button}
          disabled={isInvalid}
          version="black"
          type="input"
        >
          reset.
        </Button>

        <Error error={error} success={success} />

      </form>

    </div>
  )
}

export default ForgotPasswordPage

export { PasswordForgetForm }
