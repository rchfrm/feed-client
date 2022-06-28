import React from 'react'
import PropTypes from 'prop-types'

import { AuthContext } from '@/contexts/AuthContext'
import SignupEmailForm from '@/app/SignupEmailForm'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/LoginPageCopy'

const SignupPageContent = ({ email, isValidReferralCode }) => {
  const { authError, setAuthError } = React.useContext(AuthContext)

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  return (
    <div className="flex mx-auto sm:pt-4 max-w-4xl">
      <div className="flex-1 pb-5 pt-10">
        <div className="sm:mr-16">
          <Error error={authError} />
          <h2 className="mb-2 text-2xl">Create account</h2>
          <MarkdownText className={['small--text'].join(' ')} markdown={copy.tcText('clicking next')} />
          <SignupEmailForm
            initialEmail={email}
            isValidReferralCode={isValidReferralCode}
          />
        </div>
      </div>
      <div className="hidden sm:flex flex-1 items-center justify-center pt-10">
        <div className="ml-16">
          <MarkdownText className="text-lg" markdown="Some random testimonial" />
        </div>
      </div>
    </div>
  )
}

SignupPageContent.propTypes = {
  email: PropTypes.string,
  isValidReferralCode: PropTypes.func.isRequired,
}

SignupPageContent.defaultProps = {
  email: '',
}

export default SignupPageContent
