import React from 'react'
// import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import SignupQueueForm from '@/app/SignupQueueForm'

import styles from '@/LoginPage.module.css'

import copy from '@/app/copy/referralCodeCopy'
import loginCopy from '@/app/copy/LoginPageCopy'

const SignupClosedContent = () => {
  return (
    <div className={styles.container}>
      <MarkdownText markdown={copy.signupClosedCopy} allowHtml />
      <SignupQueueForm
        className="pt-2 mb-8"
      />
      {/* Link to login page */}
      <MarkdownText markdown={loginCopy.loginReminder} />
    </div>
  )
}

SignupClosedContent.propTypes = {

}

export default SignupClosedContent
