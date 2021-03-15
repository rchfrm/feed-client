import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import useIsMounted from '@/hooks/useIsMounted'

import Error from '@/elements/Error'
import Success from '@/elements/Success'
import Input from '@/elements/Input'
import Button from '@/elements/Button'

import { testValidEmail } from '@/helpers/utils'
import { patchUser } from '@/helpers/sharedServer'

const ConfirmEmailChangeEmail = ({
  contactEmail,
  updateUser,
  setPendingEmail,
  backToVerify,
  className,
}) => {
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
  const isMounted = useIsMounted()
  useAsyncEffect(async () => {
    if (!submitForm || loading) return
    setLoading(true)
    // Patch user
    const patchPayload = contactEmail ? { contactEmail: email } : { email }
    const { res: userUpdated, error: errorPatchingUser } = await patchUser(patchPayload)
    if (!isMounted) return
    setLoading(false)
    if (errorPatchingUser) {
      setError(errorPatchingUser)
      setEmail('')
      return
    }
    updateUser(userUpdated)
    setSuccess(true)
    setPendingEmail(email)
    // Redirect to verify page, with delay
    const timer = setTimeout(() => {
      if (!isMounted) return
      backToVerify()
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [submitForm])

  // HANDLE FORM
  const onSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid) return
    setSubmitForm(true)
  }
  return (
    <div
      className={[
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

ConfirmEmailChangeEmail.propTypes = {
  contactEmail: PropTypes.string,
  setPendingEmail: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  backToVerify: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConfirmEmailChangeEmail.defaultProps = {
  contactEmail: '',
  className: null,
}

export default ConfirmEmailChangeEmail
