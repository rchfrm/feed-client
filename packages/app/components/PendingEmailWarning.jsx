import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/global'

const PendingEmailWarning = ({
  user,
  isNewUser,
  className,
}) => {
  const {
    artists: userArtists,
    email: authEmail,
    pending_email: pendingEmail,
    contact_email: contactEmail,
    pending_contact_email: pendingContactEmail,
    email_verified: emailVerified,
    contact_email_verified: contactEmailVerified,
  } = user
  console.log('user', user)

  const emailToVerify = pendingEmail || (!emailVerified && authEmail) || ''
  const contactEmailToVerify = pendingContactEmail || (!pendingContactEmail && contactEmail) || ''
  const emails = [emailToVerify, contactEmailToVerify].filter((email) => email)
  const warningCopy = copy.unverifiedEmails(emails)
  return (
    <div
      className={[
        isNewUser ? 'p-5 bg-grey-1 rounded-dialogue max-w-xl mr-auto' : '',
        className,
      ].join(' ')}
    >
      <MarkdownText markdown={warningCopy} className="mb-0" />
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
