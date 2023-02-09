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
  className,
}) => {
  const [resendEmailError, setResendEmailError] = React.useState(null)
  const unconfirmedEmails = useUnconfirmedEmails(user)

  if (! unconfirmedEmails.length) {
    return null
  }

  const warningCopy = copy.unverifiedEmails({ emails: unconfirmedEmails.map(({ email }) => email) })

  return (
    <div
      className={[
        'p-4 rounded-dialogue max-w-xl',
        'bg-red-bg-light border border-solid border-red',
        className,
      ].join(' ')}
    >
      <MarkdownText markdown={warningCopy} className={isNewUser ? 'h4--text' : null} />
      {/* TODO: Add resend button */}
      {unconfirmedEmails.map(({ email, type }) => {
        const buttonText = unconfirmedEmails.length === 1 ? 'Re-send confirmation email' : `Re-send confirmation to ${email}`

        return (
          <div key={type} className="mb-4 last:mb-0">
            <Error error={resendEmailError} />
            <ConfirmEmailResendButton
              className="bg-red-bg-dark border-red-bg-dark hover:bg-red-border hover:border-red-border active:border-red-dark"
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
  className: PropTypes.string,
}

PendingEmailWarning.defaultProps = {
  isNewUser: false,
  className: null,
}

export default PendingEmailWarning
