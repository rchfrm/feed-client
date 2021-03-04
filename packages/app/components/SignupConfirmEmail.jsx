import React from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'

// import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import Button from '@/elements/Button'

import { parseUrl } from '@/helpers/utils'

// import copy from '@/app/copy/signupCopy'

import styles from '@/LoginPage.module.css'


const SignupConfirmEmail = ({ email, className }) => {
  // Get verifaction code from URL
  const { asPath: urlString } = useRouter()
  const { query } = parseUrl(urlString)
  const initialVerificationCode = query?.verificationCode
  const hasInitialVerificationCode = !!initialVerificationCode
  //
  const [verificationCode, setVerificationCode] = React.useState(initialVerificationCode)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  // Test code
  const testCode = async (code) => {
    console.log('code', code)
    return { res: true }
  }
  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!verificationCode) return
    setLoading(true)
    const { res, error } = await testCode(verificationCode)
    if (error) {
      setError(error)
      return
    }
    console.log('res', res)
    setError(null)
    setLoading(false)
  }
  if (hasInitialVerificationCode) return null
  return (
    <div
      className={[
        styles.container,
        className,
      ].join(' ')}
    >
      <Error error={error} />
      {/* <MarkdownText markdown={copy.missingFbEmail} /> */}
      <form onSubmit={onSubmit}>
        <Input
          name="emailContact"
          label="Contact email address"
          placeholder=""
          value={verificationCode}
          updateValue={setVerificationCode}
          type="email"
          autoFocus
        />
        <Button
          version="black wide"
          disabled={!verificationCode}
          type="sumbit"
          loading={loading}
          className="ml-auto"
        >
          submit
        </Button>
      </form>
    </div>
  )
}

SignupConfirmEmail.propTypes = {
  email: PropTypes.string,
  className: PropTypes.string,
}

SignupConfirmEmail.defaultProps = {
  email: '',
  className: null,
}

export default SignupConfirmEmail
