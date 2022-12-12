import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import ConfirmEmailResendButton from '@/app/ConfirmEmailResendButton'
import useUnconfirmedEmails from '@/app/hooks/useUnconfirmedEmails'

import copy from '@/app/copy/global'

const PendingEmailWarning = ({
  user,
  isNewUser,
  isAccountPage,
  className,
}) => {
  const [resendEmailError, setResendEmailError] = React.useState(null)
  const unconfirmedEmails = useUnconfirmedEmails(user)

  // Stop here if no emails need verifying
  if (! unconfirmedEmails.length) return null
  const warningCopy = copy.unverifiedEmails({ emails: unconfirmedEmails.map(({ email }) => email), isNewUser, isAccountPage })
  return (
    <div
      className={[
        'p-5 bg-grey-1 rounded-dialogue max-w-xl',
        className,
      ].join(' ')}
    >
      <MarkdownText markdown={warningCopy} className={isNewUser ? 'h4--text' : null} />
      {/* TODO: Add resend button */}
      {unconfirmedEmails.map(({ email, type }) => {
        const buttonText = unconfirmedEmails.length === 1 ? 'Resend confirmation email' : `Resend confirmation to ${email}`
        return (
          <div key={type} className="mb-4 last:mb-0">
            <Error error={resendEmailError} />
            <ConfirmEmailResendButton
              buttonText={buttonText}
              emailType={type}
              setError={setResendEmailError}
            />
          </div>
        )
      })}
    </div>
  )
}

PendingEmailWarning.propTypes = {
  user: PropTypes.object.isRequired,
  isNewUser: PropTypes.bool,
  isAccountPage: PropTypes.bool,
  className: PropTypes.string,
}

PendingEmailWarning.defaultProps = {
  isNewUser: false,
  isAccountPage: false,
  className: null,
}

export default PendingEmailWarning
