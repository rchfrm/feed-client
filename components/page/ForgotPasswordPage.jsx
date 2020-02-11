// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../elements/PageHeader'
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

  const handleClick = async e => {
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
    <div className={`page-container ${className}`}>

      <PageHeader heading="forgotten password" />

      <div className="ninety-wide page-container">

        <p>Enter your email address below to receive a link, and reset your password.</p>

        <PasswordForgetForm
          error={error}
          setError={setError}
          success={success}
          setSuccess={setSuccess}
          email={email}
          setEmail={setEmail}
        />

        <Button
          disabled={isInvalid}
          version="black progress"
          onClick={handleClick}
        >
          reset.
        </Button>

      </div>

    </div>
  )
}

function PasswordForgetForm({ setSuccess, setError, setEmail, email, success, error }) {
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

  return (
    <div className="fill-height">

      <Form width="four" position="central">

        <Input
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleChange}
          version="box"
          width={100}
          label="none"
        />

        <Error error={error} success={success} />

      </Form>

    </div>
  )
}

export default ForgotPasswordPage

export { PasswordForgetForm }
