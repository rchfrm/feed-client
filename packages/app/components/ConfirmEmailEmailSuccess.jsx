import React from 'react'
import PropTypes from 'prop-types'

import Success from '@/elements/Success'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/signupCopy'

const ConfirmEmailEmailSuccess = ({
  email,
  contactEmail,
  emailType,
  onContinue,
  className,
}) => {
  const emailDisplay = emailType === 'contactEmail' ? contactEmail : email
  const { emailVerifySuccess: pageCopy } = copy
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Success message={pageCopy.success(emailDisplay)} />
      <MarkdownText markdown={pageCopy.logoutExplainer} />
      <div className="pt-2">
        <Button
          version="green small"
          className="w-full"
          onClick={onContinue}
        >
          {pageCopy.button}
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
