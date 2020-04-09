import React from 'react'
import Router from 'next/router'

import { useImmerReducer } from 'use-immer'

import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'

import Input from './elements/Input'
import Button from './elements/Button'
import Error from './elements/Error'

import * as ROUTES from '../constants/routes'
import helpers from './helpers/helper'
import styles from './LoginPage.module.css'

const getInputType = (key) => {
  if (key === 'email') return 'email'
  if (key === 'passwordOne' || key === 'passwordTwo') return 'password'
  return 'text'
}

const getInputLabel = (key) => {
  if (key === 'firstName') return 'First name'
  if (key === 'lastName') return 'Last name'
  if (key === 'passwordOne') return 'Password'
  if (key === 'passwordTwo') return 'Confirm password'
  return helpers.capitalise(key)
}


const reducer = (draftState, action) => {
  const { key, value } = action
  draftState[key] = value
}

const SignupEmailForm = ({ setPageLoading }) => {
  // Define component state
  const [error, setError] = React.useState(null)
  // Get contexts
  const { signUp } = React.useContext(AuthContext)
  const { createUser } = React.useContext(UserContext)
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
  // Test passwords match
  const passwordStatus = React.useMemo(() => {
    const { passwordOne, passwordTwo } = signupDetails
    if (!passwordTwo) {
      return {
        success: false,
        error: false,
      }
    }
    const success = passwordOne === passwordTwo
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
  }, [signupDetails])
  // Handle input changes
  const onInputChange = (e) => {
    const { name: key, value } = e.target
    // Test for valid email
    if (key === 'email') {
      const hasValidEmail = helpers.testValidEmail(value)
      setHasEmailError(!hasValidEmail)
    }
    // Update signup details
    setSignupDetails({ key, value })
  }
  // Define array of form inputs
  const formInputs = React.useMemo(() => {
    return Object.entries(signupDetails).map(([key, value]) => {
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
      }
    })
  }, [signupDetails])

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, passwordOne, firstName, lastName } = signupDetails
    setPageLoading(true)
    const signupRes = await signUp(email, passwordOne)
      .catch((error) => {
        setError(error)
        setPageLoading(false)
      })
    const userRes = await createUser(firstName, lastName)
      .catch((error) => {
        setError(error)
        setPageLoading(false)
      })
    console.log('signupRes', signupRes)
    console.log('userRes', userRes)
    // Router.push(ROUTES.CONNECT_ACCOUNTS)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <Error error={error} />

      {/* All form inputs */}
      {formInputs.map(({ inputType, name, value, label, success, error }) => {
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
