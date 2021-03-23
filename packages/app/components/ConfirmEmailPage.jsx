import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'

import useIsMounted from '@/hooks/useIsMounted'
import useCrossTabCommunication from '@/app/hooks/useCrossTabCommunication'

import { UserContext } from '@/contexts/UserContext'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import Button from '@/elements/Button'
import PencilIcon from '@/icons/PencilIcon'

import ConfirmEmailResendButton from '@/app/ConfirmEmailResendButton'
import ConfirmEmailChangeEmail from '@/app/ConfirmEmailChangeEmail'
import ConfirmEmailEmailSuccess from '@/app/ConfirmEmailEmailSuccess'

import { parseUrl } from '@/helpers/utils'
import { verifyEmail } from '@/app/helpers/appServer'
import { getUser } from '@/helpers/sharedServer'

import copy from '@/app/copy/signupCopy'

import brandColors from '@/constants/brandColors'

import styles from '@/LoginPage.module.css'

import * as ROUTES from '@/app/constants/routes'

// Get the email type that needs verifying
const getEmailType = ({ query, emailVerified, contactEmailVerified, contactEmail }) => {
  const queryType = query?.type
  if (queryType) return queryType
  if (!emailVerified) return 'email'
  if (contactEmail && !contactEmailVerified) return 'contactEmail'
  return 'none'
}

const ConfirmEmailPage = ({
  className,
}) => {
  // GET USER CONTEXT and email
  const {
    updateUser,
    userLoading,
    user: {
      artists: userArtists,
      email: authEmail,
      pending_email: pendingEmail,
      contact_email: contactEmail,
      pending_contact_email: pendingContactEmail,
      email_verified: emailVerified,
      contact_email_verified: contactEmailVerified,
    },
  } = React.useContext(UserContext)

  // GET EMAIL THAT NEEDS VERIFYING
  const [email, setEmail] = React.useState(pendingEmail || pendingContactEmail || authEmail || contactEmail)

  // SETUP CROSS TAB MESSAGING
  const { messagePayload, broadcastMessage } = useCrossTabCommunication('emailVerified')

  // PARSE PAGE QUERY
  const { asPath: urlString } = useRouter()
  const { query } = parseUrl(urlString)
  // GET VERIFACTION CODE FROM URL
  const initialVerificationCode = query?.token
  const [hasInitialVerificationCode, setHasInitialVerificationCode] = React.useState(!!initialVerificationCode)

  // GET EMAIL TYPE THAT NEEDS VERIFYING
  // & GET WHICH FLOW
  const [emailType, setEmailType] = React.useState('')
  const [isSignupFlow, setIsSignupFlow] = React.useState(false)
  React.useEffect(() => {
    if (userLoading) return
    const emailType = getEmailType({ query, emailVerified, contactEmailVerified, contactEmail })
    setEmailType(emailType)
    const isSignupFlow = !userArtists || !userArtists.length
    setIsSignupFlow(isSignupFlow)
  // eslint-disable-next-line
  }, [userLoading])

  // HANDLE SUCCESS
  const [isSuccessful, setIsSuccessful] = React.useState(false)
  const onSuccessContinue = React.useCallback(() => {
    const nextPage = isSignupFlow ? ROUTES.SIGN_UP_CONNECT_PROFILES : ROUTES.HOME
    Router.push(nextPage)
  }, [isSignupFlow])
  // If no need to verify
  React.useEffect(() => {
    // Stop here because not ready or it's manually successful
    if (userLoading || isSuccessful) return
    // Stop here because pending email
    if (pendingEmail || pendingContactEmail) return
    // Stop here because one of the emails isn't verified
    if (!emailVerified || (contactEmail && !contactEmailVerified)) return
    // Stop here because don't yet know the email type
    if (!emailType) return
    // If you've reached this bit, you're successful
    broadcastMessage({ success: true })
    onSuccessContinue()
  }, [userLoading, pendingEmail, pendingContactEmail, onSuccessContinue, emailVerified, contactEmail, contactEmailVerified, emailType, isSuccessful, broadcastMessage])

  // BROADCAST SUCCESS
  React.useEffect(() => {
    if (isSuccessful) broadcastMessage({ success: true })
  }, [isSuccessful, broadcastMessage])

  // LISTEN FOR SUCCESS IN ANOTHER TAB
  React.useEffect(() => {
    if (!messagePayload) return
    if (messagePayload.success) {
      onSuccessContinue()
    }
  }, [messagePayload, onSuccessContinue])

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
    const { res, error } = await verifyEmail(verificationCode, useDummy)
    if (!isMounted) return
    if (error) {
      setCheckCode(false)
      setChecking(false)
      setError(error)
      setHasInitialVerificationCode(false)
      setIsSuccessful(false)
      setVerificationCode('')
      return
    }
    if (res?.success) {
      const { res: userUpdated } = await getUser()
      setIsSuccessful(true)
      updateUser(userUpdated)
    }
    setError(null)
  }, [checkCode, checking, isMounted])

  // CHANGE CONTACT EMAIL
  const [isChangeEmail, setIsChangeEmail] = React.useState(false)

  // STOP HERE if checking code from URL query or waiting for user to load
  if (!isSuccessful && (hasInitialVerificationCode || userLoading)) return null

  // SHOW SUCCESS MESSAGE
  if (isSuccessful) {
    return (
      <ConfirmEmailEmailSuccess
        email={email}
        onContinue={onSuccessContinue}
        className={styles.container}
      />
    )
  }

  // SHOW EMAIL CHANGE FORM
  if (isChangeEmail) {
    return (
      <ConfirmEmailChangeEmail
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
  return (
    <div
      className={[
        styles.container,
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <MarkdownText markdown={copy.emailVerify(email)} />
      {/* ERROR */}
      <Error error={error} />
      {/* CHANGE EMAIL */}
      <div>
        <p className="mb-5">Didn't receive an email?</p>
        <div className="xxs:flex justify-between items-center">
          <ConfirmEmailResendButton
            contactEmail={contactEmail}
            emailType={emailType}
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
      {/* SKIP (if part of signup flow) */}
      {isSignupFlow && (
        <div className="pt-12 flex justify-end">
          <Link href={ROUTES.SIGN_UP_CONNECT_PROFILES}>
            <Button>
              Skip for now
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

ConfirmEmailPage.propTypes = {
  className: PropTypes.string,
}

ConfirmEmailPage.defaultProps = {
  className: null,
}

export default ConfirmEmailPage
