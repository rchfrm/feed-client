import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import useSignup from '@/app/hooks/useSignup'
import LoginSignupEmailEdit from '@/app/LoginSignupEmailEdit'

import ArrowAltIcon from 'shared/components/icons/ArrowAltIcon'
import brandColors from '@/constants/brandColors'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import * as utils from '@/helpers/utils'
import { trackSignUp } from '@/helpers/trackingHelpers'
import { fireSentryBreadcrumb, fireSentryError } from '@/app/helpers/sentryHelpers'

import * as ROUTES from '@/app/constants/routes'
import styles from '@/LoginPage.module.css'

const scrollTop = () => window.scrollTo(0, 0)

const SignupEmailForm = ({ initialEmail }) => {
  const [email, setEmail] = React.useState(initialEmail)
  const [password, setPassword] = React.useState('')
  const [isEmailEdit, setIsEmailEdit] = React.useState(!initialEmail)
  const [error, setError] = React.useState(null)
  const [hasEmailError, setHasEmailError] = React.useState(false)

  const { runCreateUser } = React.useContext(UserContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const passwordStatus = React.useMemo(() => {
    if (!password) {
      return {
        success: false,
        error: false,
      }
    }
    const success = password.length >= 6
    return {
      success,
      error: !success,
    }
  }, [password])

  const formComplete = React.useMemo(() => {
    if (hasEmailError) return false
    if (passwordStatus.error) return false
    if (email && password) return true

    return false
  }, [email, password, hasEmailError, passwordStatus.error])

  const onInputChange = (e) => {
    const { name, value } = e.target

    if (name === 'email') {
      const hasValidEmail = utils.testValidEmail(value)
      setHasEmailError(!hasValidEmail)
      setEmail(e.target.value)
    }

    if (name === 'password') {
      setPassword(e.target.value)
    }
  }

  const { signupWithEmail, rejectNewUser } = useSignup()

  // * HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Stop here if not complete
    if (!formComplete) return
    toggleGlobalLoading(true)
    fireSentryBreadcrumb({
      category: 'sign up',
      action: 'submit sign up form',
    })

    const signupRes = await signupWithEmail(email, password)
      .catch((error) => {
        setError(error)
        scrollTop()
        toggleGlobalLoading(false)
        // Sentry error
        fireSentryError({
          category: 'sign up',
          action: 'useSignup.signupWithEmail() with email failed',
          description: error.message,
          label: email,
        })
      })
    if (!signupRes) return
    // Create user on server
    const { res: user, error } = await runCreateUser()
    if (error) {
      toggleGlobalLoading(false)
      // Sentry error
      fireSentryError({
        category: 'sign up',
        action: 'createUser() with password failed',
        description: error.message,
        label: email,
      })
      return rejectNewUser({ redirectTo: ROUTES.SIGN_UP, errorMessage: error.message })
    }
    trackSignUp({ authProvider: 'password', userId: user.id })
    Router.push(ROUTES.POSTS)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Error className={styles.error} error={error} />
      {isEmailEdit ? (
        <Input
          className={styles.input}
          handleChange={onInputChange}
          name="email"
          type="email"
          label="Email"
          value={email}
          error={hasEmailError}
          autoFocus
          required
        />
      ) : (
        <LoginSignupEmailEdit
          email={email}
          isEmailEdit={isEmailEdit}
          setIsEmailEdit={setIsEmailEdit}
        />
      )}
      <Input
        className={styles.input}
        handleChange={onInputChange}
        name="password"
        type="password"
        label="Password (at least 6 characters)"
        value={password}
        success={passwordStatus.success}
        error={passwordStatus.error}
        required
      />
      <Button
        className={[styles.signupButton, 'ml-auto'].join(' ')}
        version="green wide"
        disabled={!formComplete}
        type="sumbit"
        trackComponentName="SignupEmailForm"
      >
        Next
        <ArrowAltIcon
          className="ml-3 h-6"
          fill={!formComplete ? brandColors.greyDark : brandColors.white}
          direction="right"
        />
      </Button>
    </form>
  )
}

SignupEmailForm.propTypes = {
  initialEmail: PropTypes.string,
}

SignupEmailForm.defaultProps = {
  initialEmail: '',
}

export default SignupEmailForm
