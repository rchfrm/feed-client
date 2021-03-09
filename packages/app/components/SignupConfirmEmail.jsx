import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'
import { useRouter } from 'next/router'

import { UserContext } from '@/contexts/UserContext'

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


const SignupConfirmEmail = ({ className }) => {
  // Get user
  const { user: { email: authEmail, contact_email: contactEmail } } = React.useContext(UserContext)
  const email = authEmail || contactEmail
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
      <MarkdownText markdown={`Please verify the email address **${email}**.`} />
      {/* FORM */}
      <Error error={error} />
      <form onSubmit={onSubmit} className="mb-12">
        <Input
          name="verificationCode"
          label="Verification code"
          placeholder=""
          value={verificationCode}
          updateValue={setVerificationCode}
          type="text"
          autoFocus
          className="mb-4"
        />
        <Button
          version="black"
          disabled={!verificationCode}
          type="sumbit"
          loading={checking}
          className="w-full"
        >
          submit
        </Button>
      </form>
      {/* CHANGE EMAIL */}
      <div>
        <p className="mb-5">Didn't receive an email?</p>
        <div className="xxs:flex justify-between items-center">
          <Button
            version="x-small black icon"
            onClick={changeEmail}
            className="mb-5 xxs:mb-0"
          >
            Resend email
          </Button>
          <Button
            version="x-small green icon"
            onClick={changeEmail}
          >
            <PencilIcon fill={brandColors.bgColor} style={{ height: '1rem' }} />
            Change email address
          </Button>
        </div>
      </div>
    </div>
  )
}

SignupConfirmEmail.propTypes = {
  className: PropTypes.string,
}

SignupConfirmEmail.defaultProps = {
  className: null,
}

export default SignupConfirmEmail
