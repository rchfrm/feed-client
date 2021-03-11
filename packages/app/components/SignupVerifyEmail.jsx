import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'
import Router, { useRouter } from 'next/router'

import useIsMounted from '@/hooks/useIsMounted'

import { UserContext } from '@/contexts/UserContext'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import Button from '@/elements/Button'
import PencilIcon from '@/icons/PencilIcon'

import SignupVerifyResendButton from '@/app/SignupVerifyResendButton'
import SignupVerifyChangeEmail from '@/app/SignupVerifyChangeEmail'
import SignupVerifyEmailSuccess from '@/app/SignupVerifyEmailSuccess'


import { parseUrl } from '@/helpers/utils'
import { verifyEmail } from '@/app/helpers/appServer'
import { getUser } from '@/helpers/sharedServer'

import copy from '@/app/copy/signupCopy'

import brandColors from '@/constants/brandColors'

import styles from '@/LoginPage.module.css'

import * as ROUTES from '@/app/constants/routes'


const SignupVerifyEmail = ({ className }) => {
  // GET USER CONTEXT and email
  const {
    updateUser,
    userLoading,
    user: {
      email: authEmail,
      pending_email: pendingEmail,
      contact_email: contactEmail,
      pending_contact_email: pendingContactEmail,
      email_verified: emailVerified,
      contact_email_verified: contactEmailVerified,
    },
  } = React.useContext(UserContext)

  // GET EMAIL THAT NEEDS VERIFYING
  const [email, setEmail] = React.useState(pendingEmail || pendingContactEmail)

  // HANDLE SUCCESS
  const [isSuccesful, setIsSuccesful] = React.useState(false)
  const onSuccessContinue = React.useCallback(() => {
    Router.push(ROUTES.HOME)
  }, [])
  // If no need to verify
  React.useEffect(() => {
    if (!userLoading && !pendingEmail && !pendingContactEmail && !isSuccesful) {
      onSuccessContinue()
    }
  }, [userLoading, pendingEmail, pendingContactEmail, onSuccessContinue, isSuccesful])

  // GET VERIFACTION CODE FROM URL
  const { asPath: urlString } = useRouter()
  const { query } = parseUrl(urlString)
  const initialVerificationCode = query?.verificationCode
  const [hasInitialVerificationCode, setHasInitialVerificationCode] = React.useState(!!initialVerificationCode)

  // TEST CODE
  const [verificationCode, setVerificationCode] = React.useState(initialVerificationCode)
  const [checkCode, setCheckCode] = React.useState(hasInitialVerificationCode)
  const [checking, setChecking] = React.useState(false)
  const [error, setError] = React.useState(null)
  const isMounted = useIsMounted()
  useAsyncEffect(async () => {
    if (!checkCode || checking) return
    setChecking(true)
    const useDummy = true
    const { res: { success }, error } = await verifyEmail(verificationCode, useDummy)
    if (!isMounted) return
    if (error) {
      setCheckCode(false)
      setChecking(false)
      setError(error)
      setHasInitialVerificationCode(false)
      setIsSuccesful(false)
      setVerificationCode('')
      return
    }
    if (success) {
      const { res: userUpdated } = await getUser()
      setIsSuccesful(true)
      updateUser(userUpdated)
    }
    setIsSuccesful(true)
    setError(null)
  }, [checkCode, checking])

  // CHANGE CONTACT EMAIL
  const [isChangeEmail, setIsChangeEmail] = React.useState(false)

  // HANDLE FORM
  const [isFormValid, setIsFormValid] = React.useState(false)
  React.useEffect(() => {
    setIsFormValid(!!verificationCode)
  }, [verificationCode])

  // SUBMIT FORM
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return
    setCheckCode(true)
  }

  // STOP HERE if checking code from URL query or waiting for user to load
  if (hasInitialVerificationCode || userLoading) return null

  // SHOW SUCCESS MESSAGE
  if (isSuccesful) {
    return (
      <SignupVerifyEmailSuccess
        email={email}
        onContinue={onSuccessContinue}
        className={styles.container}
      />
    )
  }

  // SHOW EMAIL CHANGE FORM
  if (isChangeEmail) {
    return (
      <SignupVerifyChangeEmail
        contactEmail={contactEmail}
        updateUser={updateUser}
        setPendingEmail={setEmail}
        backToVerify={() => {
          setIsChangeEmail(false)
        }}
        className={styles.container}
      />
    )
  }
  // VERIFY CODE FORM
  return (
    <div
      className={[
        styles.container,
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <MarkdownText markdown={copy.emailVerify(email)} />
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
          <SignupVerifyResendButton
            contactEmail={contactEmail}
            setError={setError}
          />
          <Button
            version="x-small green icon"
            onClick={() => setIsChangeEmail(true)}
          >
            <PencilIcon fill={brandColors.bgColor} style={{ height: '1rem' }} />
            Change email address
          </Button>
        </div>
      </div>
    </div>
  )
}

SignupVerifyEmail.propTypes = {
  className: PropTypes.string,
}

SignupVerifyEmail.defaultProps = {
  className: null,
}

export default SignupVerifyEmail
