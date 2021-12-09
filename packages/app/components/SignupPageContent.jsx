import React from 'react'
import PropTypes from 'prop-types'

import { AuthContext } from '@/contexts/AuthContext'
import SignupEmailForm from '@/app/SignupEmailForm'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
import TickCircleIcon from '@/icons/TickCircleIcon'

import copy from '@/app/copy/LoginPageCopy'

const SignupPageContent = ({ email }) => {
  const { authError, setAuthError } = React.useContext(AuthContext)

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  return (
    <div className="flex flex-column sm:flex-row mx-auto sm:pt-8 max-w-4xl">
      <div className="flex-1 pb-5 sm:pb-0 pt-10 sm:order-2">
        <div className="sm:ml-16">
          <Error error={authError} />
          <h1 className="mb-2 text-2xl">Enter a password to create your account</h1>
          <MarkdownText className={['small--text'].join(' ')} markdown={copy.tcText('clicking next')} />
          <SignupEmailForm initialEmail={email} />
        </div>
      </div>
      <div className="flex-1 sm:order-1 pt-15 sm:pt-10 border-solid border-t sm:border-t-0 sm:border-r border-grey-3">
        <div className="sm:mr-16">
          <MarkdownText className="mb-10 text-lg" markdown={copy.signupTeaser} />
          <ul className="mb-10 pl-10">
            <li className="flex mb-4">
              <TickCircleIcon className="w-6 h-6 mr-6" />
              Really intelligent algorithm
            </li>
            <li className="flex mb-4">
              <TickCircleIcon className="w-6 h-6 mr-6" />
              Stop/start ads whenever you like
            </li>
            <li className="flex mb-4">
              <TickCircleIcon className="w-6 h-6 mr-6" />
              Only pay 10% of your daily budget
            </li>
          </ul>
          <MarkdownText markdown={copy.loginReminder} />
        </div>
      </div>
    </div>
  )
}

SignupPageContent.propTypes = {
  email: PropTypes.string,
}

SignupPageContent.defaultProps = {
  email: '',
}

export default SignupPageContent
