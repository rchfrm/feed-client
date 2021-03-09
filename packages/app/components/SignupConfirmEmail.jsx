import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'
import { useRouter } from 'next/router'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import PencilIcon from '@/icons/PencilIcon'

import { parseUrl } from '@/helpers/utils'
import { verifyEmail } from '@/app/helpers/appServer'

// import copy from '@/app/copy/signupCopy'

import brandColors from '@/constants/brandColors'

import styles from '@/LoginPage.module.css'


const SignupConfirmEmail = ({ email, className }) => {
  // Get verifaction code from URL
  const { asPath: urlString } = useRouter()
  const { query } = parseUrl(urlString)
  const initialVerificationCode = query?.verificationCode
  const [hasInitialVerificationCode, setHasInitialVerificationCode] = React.useState(!!initialVerificationCode)

  // TEST CODE
  const [verificationCode, setVerificationCode] = React.useState(initialVerificationCode)
  const [checkCode, setCheckCode] = React.useState(hasInitialVerificationCode)
  const [checking, setChecking] = React.useState(false)
  const [error, setError] = React.useState(null)
  useAsyncEffect(async (isMounted) => {
    if (!checkCode || checking) return
    setChecking(true)
    const useDummy = true
    const { res, error } = await verifyEmail(verificationCode, useDummy)
    if (!isMounted()) return
    if (error) {
      setError(error)
      setHasInitialVerificationCode(false)
      return
    }
    console.log('res', res)
    setError(null)
    setCheckCode(false)
    setChecking(false)
  }, [checkCode, checking])

  // SUBMIT FORM
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!verificationCode) return
    setCheckCode(true)
  }

  // CHANGE CONTACT EMAIL
  const changeEmail = React.useCallback(() => {
    console.log('change email')
  }, [])

  // Stop here if checking code from URL query
  if (hasInitialVerificationCode) return null
  return (
    <div
      className={[
        styles.container,
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <MarkdownText markdown={`Please verify the email address ${email}`} />
      <Button
        version="x-small green icon"
        onClick={changeEmail}
      >
        <PencilIcon fill={brandColors.bgColor} style={{ height: '1rem' }} />
        Change email
      </Button>
      {/* FORM */}
      <Error error={error} />
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
          loading={checking}
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
