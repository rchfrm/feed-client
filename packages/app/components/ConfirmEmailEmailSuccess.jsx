import React from 'react'
import PropTypes from 'prop-types'

import Success from '@/elements/Success'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import { AuthContext } from '@/contexts/AuthContext'

import useSignOut from '@/app/hooks/useSignOut'

import pageCopy from '@/app/copy/signupCopy'

const ConfirmEmailEmailSuccess = ({
  email,
  contactEmail,
  emailType,
  onContinue,
  className,
}) => {
  const isAuthEmail = emailType === 'email'
  const { auth: { email: signedInEmail } } = React.useContext(AuthContext)
  const hasAuthEmailChanged = isAuthEmail && (email !== signedInEmail)
  const emailDisplay = isAuthEmail ? email : contactEmail
  const { emailVerifySuccess: copy } = pageCopy
  const signOut = useSignOut()
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Success message={copy.success(emailDisplay)} />
      {/* Explain about logging out when changing auth email */}
      {hasAuthEmailChanged && (
        <MarkdownText markdown={copy.logoutExplainer} />
      )}
      <div className="pt-2">
        <Button
          version="green small"
          className="w-full"
          onClick={() => {
            if (hasAuthEmailChanged) return signOut()
            onContinue()
          }}
          trackComponentName="ConfirmEmailEmailSuccess"
        >
          {copy.button(hasAuthEmailChanged)}
        </Button>
      </div>
    </div>
  )
}

ConfirmEmailEmailSuccess.propTypes = {
  email: PropTypes.string.isRequired,
  contactEmail: PropTypes.string,
  emailType: PropTypes.string.isRequired,
  onContinue: PropTypes.func,
  className: PropTypes.string,
}

ConfirmEmailEmailSuccess.defaultProps = {
  contactEmail: '',
  onContinue: () => {},
  className: null,
}

export default ConfirmEmailEmailSuccess
