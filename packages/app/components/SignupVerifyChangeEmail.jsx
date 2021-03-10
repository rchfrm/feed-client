import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import { AuthContext } from '@/contexts/AuthContext'

import Error from '@/elements/Error'
import Success from '@/elements/Success'
import Input from '@/elements/Input'
import Button from '@/elements/Button'

import { testValidEmail } from '@/helpers/utils'
import { patchUser } from '@/helpers/sharedServer'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'

import styles from '@/LoginPage.module.css'


const SignupVerifyChangeEmail = ({
  contactEmail,
  updateUser,
  backToVerify,
  className,
}) => {
  const { auth: { providerIds } } = React.useContext(AuthContext)
  const isPasswordAuth = providerIds.includes('password')

  const [isFormValid, setIsFormValid] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [submitForm, setSubmitForm] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setIsFormValid(testValidEmail(email))
  }, [email])

  // RUN CHANGE EMAIL
  useAsyncEffect(async (isMounted) => {
    if (!submitForm || loading) return
    setLoading(true)
    // Update email in firebase (if using password auth)
    const emailChangedRes = isPasswordAuth ? await firebaseHelpers.doEmailUpdate(email) : null
    // Handle error in changing firebase email
    if (!isMounted()) return
    if (emailChangedRes && emailChangedRes.error) {
      setError(emailChangedRes.error)
      setLoading(false)
      return
    }
    // Patch user
    const patchPayload = contactEmail ? { contactEmail: email } : { email }
    const { res: userUpdated, error: errorPatchingUser } = await patchUser(patchPayload)
    if (!isMounted()) return
    setLoading(false)
    if (errorPatchingUser) {
      setError(errorPatchingUser)
      setEmail('')
      return
    }
    updateUser(userUpdated)
    setSuccess(true)
    // Redirect to verify page, with delay
    const timer = setTimeout(() => {
      if (!isMounted()) return
      backToVerify()
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [submitForm])

  // HANDLE FORM
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return
    setSubmitForm(true)
  }
  return (
    <div
      className={[
        styles.container,
        className,
      ].join(' ')}
    >
      {success ? (
        <Success message={`Success! A new email was sent to **${email}**`} />
      ) : (
        <>
          {/* FORM */}
          <Error error={error} />
          <form onSubmit={onSubmit} className="mb-6">
            <Input
              name="email"
              label="Email address"
              value={email}
              updateValue={setEmail}
              type="email"
              autoFocus
              className="mb-4"
            />
            <Button
              version="black"
              disabled={!isFormValid}
              type="sumbit"
              loading={loading}
              className="w-full"
            >
              submit
            </Button>
          </form>
          {/* BACK BUTTON */}
          <div>
            <Button
              version="black x-small"
              onClick={backToVerify}
            >
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

SignupVerifyChangeEmail.propTypes = {
  contactEmail: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
  backToVerify: PropTypes.func.isRequired,
  className: PropTypes.string,
}

SignupVerifyChangeEmail.defaultProps = {
  contactEmail: '',
  className: null,
}

export default SignupVerifyChangeEmail
