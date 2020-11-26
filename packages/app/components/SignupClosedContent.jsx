import React from 'react'
// import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'
import Button from '@/elements/Button'

import { testValidEmail } from '@/helpers/utils'

import styles from '@/LoginPage.module.css'

import copy from '@/app/copy/referralCodeCopy'

const SignupClosedContent = () => {
  const [email, setEmail] = React.useState('')
  const [formValid, setFormValid] = React.useState(false)
  React.useEffect(() => {
    const isEmailValid = testValidEmail(email)
    setFormValid(isEmailValid)
  }, [email])

  // TODO handle submitting email
  const handleFormSubmission = () => {
    // Stop here if form not valid
    if (!formValid) return
    console.log('Form submitted')
  }

  return (
    <div className={styles.container}>
      <MarkdownText markdown={copy.signupClosedCopy} allowHtml />
      <form
        className="pt-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmission()
        }}
      >
        <Input
          updateValue={setEmail}
          name="email"
          label="Your email"
          value={email}
          autoFocus
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!formValid}
          >
            Join the queue
          </Button>
        </div>
      </form>
    </div>
  )
}

SignupClosedContent.propTypes = {

}

export default SignupClosedContent
