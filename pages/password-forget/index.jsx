// IMPORT PACKAGES
import React from 'react'
import { Link } from 'react-router-dom'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../../components/contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../../components/elements/PageHeader'
import Form from '../../components/elements/Form'
import Input from '../../components/elements/Input'
import Button from '../../components/elements/Button'
import Error from '../../components/elements/Error'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
// IMPORT HELPERS
import firebase from '../../components/helpers/firebase'
// IMPORT STYLES

// TODO: Update Auth Authentication with a display name, so that we can address users by name in emails

function PasswordForgetPage() {
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

function PasswordForgetLink() {
  return (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  )
}

export default PasswordForgetPage

export { PasswordForgetForm, PasswordForgetLink }
