import React from 'react'
import PropTypes from 'prop-types'

import Success from '@/elements/Success'
import Button from '@/elements/Button'

const ConfirmEmailEmailSuccess = ({
  email,
  contactEmail,
  emailType,
  onContinue,
  className,
}) => {
  const emailDisplay = emailType === 'contactEmail' ? contactEmail : email
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Success message={`Success! Your email **${emailDisplay}** has been verified!`} />
      <div className="pt-2">
        <Button
          version="green small"
          className="w-full"
          onClick={onContinue}
        >
          Continue
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
