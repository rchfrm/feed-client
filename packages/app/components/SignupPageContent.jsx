import React from 'react'

import { AuthContext } from '@/contexts/AuthContext'
import SignupEmailForm from '@/app/SignupEmailForm'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/LoginPageCopy'


const SignupPageContent = () => {
  const { authError, setAuthError } = React.useContext(AuthContext)

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  return (
    <div className="flex mx-auto pt-20 max-w-4xl">
      <div className="flex-1 pt-10 border-solid border-r border-grey-3">
        <div className="mr-16">
          <MarkdownText markdown="You are this close to never having to set-up an ad campaign again!" />
          <MarkdownText markdown="Already have an account? Log in here" />
        </div>
      </div>
      <div className="flex-1 pt-10">
        <div className="ml-16">
          <Error error={authError} />
          <MarkdownText className="font-bold text-xl" markdown="Enter a password to create your account" />
          <MarkdownText className={['small--text'].join(' ')} markdown={copy.tcText('next')} />
          <SignupEmailForm />
        </div>
      </div>
    </div>
  )
}

SignupPageContent.propTypes = {
}

SignupPageContent.defaultProps = {
  showEmailSignup: false,
}

export default SignupPageContent
