import React from 'react'
import Router from 'next/router'

import { useImmerReducer } from 'use-immer'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import * as utils from '@/helpers/utils'
import { track, trackSignUp, fireSentryBreadcrumb } from '@/app/helpers/trackingHelpers'

import * as ROUTES from '@/app/constants/routes'

import styles from '@/LoginPage.module.css'

const getInputType = (key) => {
  if (key === 'email') return 'email'
  if (key === 'passwordOne' || key === 'passwordTwo') return 'password'
  return 'text'
}

const getInputLabel = (key) => {
  if (key === 'firstName') return 'First name'
  if (key === 'lastName') return 'Last name'
  if (key === 'passwordOne') return 'Password (at least 6 characters)'
  if (key === 'passwordTwo') return 'Confirm password'
  return utils.capitalise(key)
}

const reducer = (draftState, action) => {
  const { key, value } = action
  draftState[key] = value
}

const scrollTop = () => window.scrollTo(0, 0)

const SignupEmailForm = () => {
  // Define component state
  const [error, setError] = React.useState(null)
  // Get contexts
  const { signUp } = React.useContext(AuthContext)
  const { runCreateUser } = React.useContext(UserContext)
  // GLOBAL LOADING
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  // Define form state
  const initialSignupState = {
    email: '',
    firstName: '',
    lastName: '',
    passwordOne: '',
    passwordTwo: '',
  }
  const [signupDetails, setSignupDetails] = useImmerReducer(reducer, initialSignupState)
  // Test valid email
  const [hasEmailError, setHasEmailError] = React.useState(false)
  // Test passwords match and are long enough
  const passwordStatus = React.useMemo(() => {
    const { passwordOne, passwordTwo } = signupDetails
    if (!passwordTwo) {
      return {
        success: false,
        error: false,
      }
    }
    const success = passwordOne === passwordTwo && passwordOne.length >= 6
    return {
      success,
      error: !success,
    }
  }, [signupDetails])
  // Test form complete
  const formComplete = React.useMemo(() => {
    const { email, firstName, lastName, passwordOne } = signupDetails
    if (hasEmailError) return false
    if (passwordStatus.error) return false
    if (!passwordOne) return false
    if (email && firstName && lastName) return true
    return false
  }, [signupDetails, hasEmailError, passwordStatus.error])
  // Handle input changes
  const onInputChange = (e) => {
    const { name: key, value } = e.target
    // Test for valid email
    if (key === 'email') {
      const hasValidEmail = utils.testValidEmail(value)
      setHasEmailError(!hasValidEmail)
    }
    // Update signup details
    setSignupDetails({ key, value })
  }
  // Define array of form inputs
  const formInputs = React.useMemo(() => {
    return Object.entries(signupDetails).map(([key, value], index) => {
      const autoFocus = index === 0
      const inputType = getInputType(key)
      const label = getInputLabel(key)
      const isPassword = key === 'passwordOne' || key === 'passwordTwo'
      const success = isPassword ? passwordStatus.success : false
      // eslint-disable-next-line
      const error = isPassword
        ? passwordStatus.error
        : key === 'email' ? hasEmailError
          : false
      const name = key
      return {
        inputType,
        name,
        value,
        label,
        success,
        error,
        autoFocus,
      }
    })
  }, [signupDetails, hasEmailError, passwordStatus.error, passwordStatus.success])

  // * HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Stop here if not complete
    if (!formComplete) return
    const { email, passwordOne, firstName, lastName } = signupDetails
    toggleGlobalLoading(true)
    fireSentryBreadcrumb({
      category: 'sign up',
      action: 'submit sign up form',
    })

    const signupRes = await signUp(email, passwordOne)
      .catch((error) => {
        setError(error)
        scrollTop()
        toggleGlobalLoading(false)
        track({
          category: 'sign up',
          action: 'signUp() with email failed',
          description: error.message,
          label: email,
          error: true,
        })
      })
    if (!signupRes) return
    // Create user on server
    const user = await runCreateUser({
      firstName,
      lastName,
    })
      .catch((error) => {
        setError(error)
        scrollTop()
        toggleGlobalLoading(false)
        track({
          category: 'sign up',
          action: 'createUser() with password failed',
          description: error.message,
          label: email,
          error: true,
        })
      })
    if (!user) return
    trackSignUp({ method: 'password', userId: user.id })
    Router.push(ROUTES.SIGN_UP_CONTINUE)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>

      <Error className={styles.error} error={error} />

      {/* All form inputs */}
      {formInputs.map(({ inputType, name, value, label, success, error, autoFocus }) => {
        return (
          <Input
            key={name}
            className={styles.input}
            handleChange={onInputChange}
            name={name}
            value={value}
            type={inputType}
            success={success}
            error={error}
            label={label}
            autoFocus={autoFocus}
            required
          />
        )
      })}

      <Button
        className={styles.signupButton}
        version="black  wide"
        disabled={!formComplete}
        type="sumbit"
      >
        sign up
      </Button>
    </form>
  )
}

export default SignupEmailForm
