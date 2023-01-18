import React from 'react'
import PropTypes from 'prop-types'

import Success from '@/elements/Success'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ConfirmEmailSuccessReauthenticate from '@/app/ConfirmEmailSuccessReauthenticate'

import { AuthContext } from '@/contexts/AuthContext'

import copy from '@/app/copy/signupCopy'

const ConfirmEmailEmailSuccess = ({
  email,
  emailType,
  onContinue,
  className,
}) => {
  const isAuthEmail = emailType === 'email'
  const { auth: { email: signedInEmail, providerIds } } = React.useContext(AuthContext)
  const isReauthenticateNeeded = isAuthEmail && (email !== signedInEmail) && providerIds.includes('password')

  const [seconds, setSeconds] = React.useState(5)
  const [intervalId, setIntervalId] = React.useState(0)

  React.useEffect(() => {
    if (seconds < 1) {
      clearInterval(intervalId)
      onContinue()
    }
  }, [intervalId, seconds, onContinue])

  React.useEffect(() => {
    if (! isReauthenticateNeeded) {
      setIntervalId(setInterval(() => setSeconds((prevSecond) => prevSecond - 1), 1000))
    }
    return () => clearInterval(intervalId)
    // eslint-disable-next-line
  }, [])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Success className="mb-2 text-xl" message="Thanks!" />
      <MarkdownText markdown={copy.emailVerifySuccess(emailType, isReauthenticateNeeded)} />
      {isReauthenticateNeeded ? (
        <ConfirmEmailSuccessReauthenticate
          email={email}
          onContinue={onContinue}
        />
      ) : (
        <div className="flex items-center justify-end pt-2">
          <p className="mr-6 mb-0">{seconds}s</p>
          <Button
            size="small"
            className="w-1/3"
            onClick={() => {
              onContinue()
            }}
            trackComponentName="ConfirmEmailEmailSuccess"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}

ConfirmEmailEmailSuccess.propTypes = {
  email: PropTypes.string.isRequired,
  emailType: PropTypes.string.isRequired,
  onContinue: PropTypes.func,
  className: PropTypes.string,
}

ConfirmEmailEmailSuccess.defaultProps = {
  onContinue: () => {},
  className: null,
}

export default ConfirmEmailEmailSuccess
