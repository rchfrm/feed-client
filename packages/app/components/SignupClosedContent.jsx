import React from 'react'
import { useRouter } from 'next/router'
// import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'

import SignupQueueForm from '@/app/SignupQueueForm'

import { AuthContext } from '@/contexts/AuthContext'

import styles from '@/LoginPage.module.css'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/referralCodeCopy'
import loginCopy from '@/app/copy/LoginPageCopy'

const SignupClosedContent = () => {
  const router = useRouter()
  const { authError, setAuthError } = React.useContext(AuthContext)
  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])
  return (
    <div className={styles.container}>
      <Error error={authError} />
      <MarkdownText markdown={copy.signupClosedIntro} allowHtml />
      <div className="p-4 bg-grey-1 mb-5 rounded-dialogue">
        <MarkdownText markdown={copy.signupClosedReferral} allowHtml />
        <Button
          version="x-small green"
          onClick={(e) => {
            e.preventDefault()
            router.push(ROUTES.REFERRAL)
          }}
        >
          Sign up with referral code
        </Button>
      </div>
      <MarkdownText markdown={copy.signupClosedOutro} allowHtml />
      <SignupQueueForm className="pt-2 mb-8" />
      {/* Link to login page */}
      <MarkdownText markdown={loginCopy.loginReminder} />
    </div>
  )
}

SignupClosedContent.propTypes = {

}

export default SignupClosedContent
