import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import * as ROUTES from '@/app/constants/routes'

import styles from '@/LoginPage.module.css'

const LoginWithEmailForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  error,
  setError,
  className,
}) => {
  const handleChange = React.useCallback((e) => {
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
  }, [setEmail, setPassword, setError])

  return (
    <form
      onSubmit={onSubmit}
      className={className}
    >

      <Error error={error} />

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
        className={styles.submit}
        version="black"
        disabled={false}
        onClick={onSubmit}
        type="input"
      >
        log in.
      </Button>

    </form>
  )
}

LoginWithEmailForm.propTypes = {
  setEmail: PropTypes.func.isRequired,
  email: PropTypes.string,
  setPassword: PropTypes.func.isRequired,
  password: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  setError: PropTypes.func.isRequired,
  className: PropTypes.string,
}

LoginWithEmailForm.defaultProps = {
  email: '',
  password: '',
  error: null,
  className: '',
}

export default LoginWithEmailForm
