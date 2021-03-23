import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import Success from '@/elements/Success'

import { requestVerificationEmail } from '@/app/helpers/appServer'

const ConfirmEmailResendButton = ({
  emailType,
  buttonText,
  setError,
  className,
}) => {
  const [emailResent, setEmailResent] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  // SEND EMAIL
  const resendEmail = React.useCallback(async () => {
    setLoading(true)
    const { error } = await requestVerificationEmail(emailType)
    setLoading(false)
    if (error) return setError(error)
    setEmailResent(true)
  }, [setEmailResent, setError, emailType])
  // RESET BUTTON after 5s
  React.useEffect(() => {
    if (!emailResent) return
    const timeout = setTimeout(() => {
      setEmailResent(false)
    }, 5000)
    // Kill wait if unmounting
    return () => {
      clearTimeout(timeout)
    }
  }, [emailResent])
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {emailResent ? (
        <Success message="Email sent" className="mb-0" />
      ) : (
        <Button
          version="x-small black icon"
          onClick={resendEmail}
          className="mb-5 xxs:mb-0"
          loading={loading}
        >
          {buttonText}
        </Button>
      )}
    </div>
  )
}

ConfirmEmailResendButton.propTypes = {
  emailType: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  setError: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConfirmEmailResendButton.defaultProps = {
  buttonText: 'Resend email',
  className: null,
}

export default ConfirmEmailResendButton
