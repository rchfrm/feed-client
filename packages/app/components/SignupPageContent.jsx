import React from 'react'
import PropTypes from 'prop-types'

import { AuthContext } from '@/contexts/AuthContext'

import SignupEmailForm from '@/app/SignupEmailForm'
import SignupPageTestimonial from '@/app/SignupPageTestimonial'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/LoginPageCopy'

const SignupPageContent = ({ email, isValidReferralCode, testimony }) => {
  const { authError, setAuthError } = React.useContext(AuthContext)

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  return (
    <div className="flex mx-auto sm:pt-4 max-w-4xl">
      <div className="flex-1 pb-5 pt-15">
        <div className="sm:mr-6 md:mr-12">
          <Error error={authError} />
          <h2 className="mb-2 text-2xl">Create account</h2>
          <MarkdownText className={['small--text'].join(' ')} markdown={copy.tcText('clicking next')} />
          <SignupEmailForm
            initialEmail={email}
            isValidReferralCode={isValidReferralCode}
          />
        </div>
      </div>
      <div className="hidden sm:flex flex-1 justify-center ml-6 md:ml-12 pt-15">
        <SignupPageTestimonial
          testimony={testimony}
        />
      </div>
    </div>
  )
}

SignupPageContent.propTypes = {
  email: PropTypes.string,
  isValidReferralCode: PropTypes.func.isRequired,
  testimony: PropTypes.object.isRequired,
}

SignupPageContent.defaultProps = {
  email: '',
}

export default SignupPageContent
