import React from 'react'
// import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/referralCodeCopy'

const SignupClosedContent = () => {
  return (
    <div>
      <MarkdownText markdown={copy.signupClosedCopy} />
    </div>
  )
}

SignupClosedContent.propTypes = {

}

export default SignupClosedContent
