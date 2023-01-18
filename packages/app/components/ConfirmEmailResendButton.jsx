import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import Success from '@/elements/Success'

import { requestVerificationEmail } from '@/app/helpers/appServer'

const ConfirmEmailResendButton = ({
  emailType,
  buttonText,
  setError,
  parentLoading,
}) => {
  const [emailResent, setEmailResent] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  // SEND EMAIL
  const resendEmail = React.useCallback(async () => {
    setError(null)
    setLoading(true)
    const { error } = await requestVerificationEmail(emailType)
    setLoading(false)
    if (error) return setError(error)
    setEmailResent(true)
  }, [setEmailResent, setError, emailType])
  // RESET BUTTON after 5s
  React.useEffect(() => {
    if (! emailResent) return
    const timeout = setTimeout(() => {
      setEmailResent(false)
    }, 5000)
    // Kill wait if unmounting
    return () => {
      clearTimeout(timeout)
    }
  }, [emailResent])
  return (
    <>
      {emailResent ? (
        <Success message="Email sent" className="mb-0" />
      ) : (
        <Button
          version="text"
          onClick={resendEmail}
          className="ml-1"
          isLoading={loading}
          isDisabled={parentLoading}
          trackComponentName="ConfirmEmailResendButton"
        >
          {buttonText}
        </Button>
      )}
    </>
  )
}

ConfirmEmailResendButton.propTypes = {
  emailType: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  setError: PropTypes.func.isRequired,
  parentLoading: PropTypes.bool,
}

ConfirmEmailResendButton.defaultProps = {
  buttonText: 'Resend',
  parentLoading: false,
}

export default ConfirmEmailResendButton
