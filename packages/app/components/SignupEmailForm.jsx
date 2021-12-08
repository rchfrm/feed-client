import React from 'react'
import Router from 'next/router'

import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import useSignup from '@/app/hooks/useSignup'
import brandColors from '@/constants/brandColors'
import ArrowAltIcon from 'shared/components/icons/ArrowAltIcon'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import * as utils from '@/helpers/utils'
import { trackSignUp } from '@/helpers/trackingHelpers'
import { fireSentryBreadcrumb, fireSentryError } from '@/app/helpers/sentryHelpers'

import * as ROUTES from '@/app/constants/routes'
import styles from '@/LoginPage.module.css'

const scrollTop = () => window.scrollTo(0, 0)

const SignupEmailForm = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
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

  const { signupWithEmail } = useSignup()

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
      setError(error)
      scrollTop()
      toggleGlobalLoading(false)
      // Sentry error
      fireSentryError({
        category: 'sign up',
        action: 'createUser() with password failed',
        description: error.message,
        label: email,
      })
    }
    trackSignUp({ authProvider: 'password', userId: user.id })
    Router.push(ROUTES.POSTS)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Error className={styles.error} error={error} />
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
        className={styles.signupButton}
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

export default SignupEmailForm
