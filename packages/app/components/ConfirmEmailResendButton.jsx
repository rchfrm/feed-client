import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import Success from '@/elements/Success'

import { requestVerificationEmail } from '@/app/helpers/appServer'

const ConfirmEmailResendButton = ({
  contactEmail,
  text,
  setError,
  className,
}) => {
  const [emailResent, setEmailResent] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  // SEND EMAIL
  const resendEmail = React.useCallback(async () => {
    const emailType = contactEmail ? 'contactEmail' : 'email'
    setLoading(true)
    const { error } = await requestVerificationEmail(emailType)
    setLoading(false)
    if (error) return setError(error)
    setEmailResent(true)
  }, [setEmailResent, setError, contactEmail])
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
          {text}
        </Button>
      )}
    </div>
  )
}

ConfirmEmailResendButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
}

ConfirmEmailResendButton.defaultProps = {
  text: 'Resend email',
  className: null,
}

export default ConfirmEmailResendButton
