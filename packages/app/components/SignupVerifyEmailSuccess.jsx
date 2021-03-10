import React from 'react'
import PropTypes from 'prop-types'

import Success from '@/elements/Success'
import Button from '@/elements/Button'

const SignupVerifyEmailSuccess = ({
  email,
  onContinue,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Success message={`Success! Your email **${email}** has been verified!`} />
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

SignupVerifyEmailSuccess.propTypes = {
  email: PropTypes.string.isRequired,
  onContinue: PropTypes.func,
  className: PropTypes.string,
}

SignupVerifyEmailSuccess.defaultProps = {
  onContinue: () => {},
  className: null,
}

export default SignupVerifyEmailSuccess
