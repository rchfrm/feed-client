// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { track } from '@/helpers/trackingHelpers'
import { testValidEmail } from '@/helpers/utils'
// IMPORT STYLES

const ForgotPasswordForm = ({ setSuccess }) => {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)
  const [isFormComplete, setIsFormComplete] = React.useState(false)
  React.useEffect(() => {
    const hasValidEmail = testValidEmail(email)
    setIsFormComplete(hasValidEmail)
  }, [email])
  const [loading, setLoading] = React.useState(false)
  const handleChange = e => {
    setSuccess('')
    setError(null)
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      default:
        break
    }
  }

  const onFormSubmit = async (e) => {
    if (!isFormComplete) return
    e.preventDefault()
    setLoading(true)
    await firebaseHelpers.sendPasswordResetEmail(email)
      .catch((error) => {
        setError(error)
        setLoading(false)
        return { error }
      })
    setSuccess(`Instructions for resetting your password have been sent to ${email}`)
    setEmail('')
    setLoading(false)
    track('reset_password')
  }

  return (

    <form
      onSubmit={onFormSubmit}
    >

      <Input
        className="w-full"
        name="email"
        label="Email Address"
        value={email}
        handleChange={handleChange}
        version="box"
        type="email"
      />

      <div className="flex justify-end">
        <Button
          disabled={!isFormComplete}
          version="black"
          type="input"
          loading={loading}
        >
          Submit
        </Button>
      </div>

      <Error error={error} />

    </form>
  )
}

export default ForgotPasswordForm
