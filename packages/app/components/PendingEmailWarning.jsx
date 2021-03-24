import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/global'

const PendingEmailWarning = ({
  user,
  isNewUser,
  isAccountPage,
  className,
}) => {
  const {
    email: authEmail,
    pending_email: pendingEmail,
    contact_email: contactEmail,
    pending_contact_email: pendingContactEmail,
    email_verified: emailVerified,
    contact_email_verified: contactEmailVerified,
  } = user

  const emailToVerify = pendingEmail || (!emailVerified && authEmail) || ''
  const contactEmailToVerify = pendingContactEmail || (!contactEmailVerified && contactEmail) || ''
  const emails = [emailToVerify, contactEmailToVerify].filter((email) => email)
  // Stop here if no emails need verifying
  if (!emails.length) return null
  const warningCopy = copy.unverifiedEmails({ emails, isNewUser, isAccountPage })
  return (
    <div
      className={[
        'p-5 bg-grey-1 rounded-dialogue max-w-xl',
        className,
      ].join(' ')}
    >
      <MarkdownText markdown={warningCopy} className={isNewUser ? 'h4--text' : null} />
      {/* TODO: Add resend button */}
      <div>
        <button>RESEND CONFIRMATION EMAIL</button>
      </div>
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
