import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'
import Router, { useRouter } from 'next/router'

import useIsMounted from '@/hooks/useIsMounted'
import useCrossTabCommunication from '@/app/hooks/useCrossTabCommunication'
import useUnconfirmedEmails from '@/app/hooks/useUnconfirmedEmails'

import { UserContext } from '@/app/contexts/UserContext'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import ConfirmEmailResendButton from '@/app/ConfirmEmailResendButton'
import ConfirmEmailChangeEmail from '@/app/ConfirmEmailChangeEmail'
import ConfirmEmailEmailSuccess from '@/app/ConfirmEmailEmailSuccess'
import EditBlock from '@/app/EditBlock'

import { parseUrl } from '@/helpers/utils'
import { verifyEmail } from '@/app/helpers/appServer'
import { getUser } from '@/helpers/sharedServer'
import { trackSignUp } from '@/helpers/trackingHelpers'

import copy from '@/app/copy/signupCopy'

import styles from '@/LoginPage.module.css'

import * as ROUTES from '@/app/constants/routes'

// Get the email type that needs verifying
const getEmailType = ({ query, emailVerified, pendingEmail, contactEmailVerified, pendingContactEmail, contactEmail }) => {
  const queryType = query?.type
  if (queryType) return queryType
  if (! emailVerified || pendingEmail) return 'email'
  if ((contactEmail && ! contactEmailVerified) || pendingContactEmail) return 'contactEmail'
  return 'none'
}

const ConfirmEmailPage = ({
  className,
}) => {
  // GET USER CONTEXT and email
  const {
    updateUser,
    userLoading,
    storeUser,
    user,
    user: {
      pending_email: pendingEmail,
      contact_email: contactEmail,
      pending_contact_email: pendingContactEmail,
      email_verified: emailVerified,
      contact_email_verified: contactEmailVerified,
    },
  } = React.useContext(UserContext)

  // GET EMAIL THAT NEEDS VERIFYING
  const unconfirmedEmails = useUnconfirmedEmails(user)

  const [email, setEmail] = React.useState('')

  // SETUP CROSS TAB MESSAGING
  const { messagePayload, broadcastMessage, hasBroadcasted } = useCrossTabCommunication('emailVerified')

  // PARSE PAGE QUERY
  const { asPath: urlString } = useRouter()
  const { query } = parseUrl(urlString)
  // GET VERIFACTION CODE FROM URL
  const initialVerificationCode = query?.token
  const [hasInitialVerificationCode, setHasInitialVerificationCode] = React.useState(!! initialVerificationCode)

  // GET EMAIL TYPE THAT NEEDS VERIFYING
  // & GET WHICH FLOW
  const [emailType, setEmailType] = React.useState('')
  React.useEffect(() => {
    if (userLoading) return
    const emailType = getEmailType({ query, emailVerified, pendingEmail, contactEmailVerified, pendingContactEmail, contactEmail })
    const { email } = unconfirmedEmails.find((email) => email.type === emailType) || {}

    if (! email) return

    setEmail(email)
    setEmailType(emailType)
  // eslint-disable-next-line
  }, [userLoading])

  // HANDLE SUCCESS
  const [isSuccessful, setIsSuccessful] = React.useState(false)
  const onSuccessContinue = React.useCallback(() => {
    Router.push(ROUTES.HOME)
  }, [])
  // If no need to verify
  const successTriggered = React.useRef(false)
  React.useEffect(() => {
    // Stop here because not ready or it's manually successful
    if (userLoading || isSuccessful) return
    // Stop here because pending email
    if (pendingEmail || pendingContactEmail) return
    // Stop here because one of the emails isn't verified
    if (! emailVerified || (contactEmail && ! contactEmailVerified)) return
    // Stop here because don't yet know the email type
    if (! emailType) return
    // If you've reached this bit, you're successful
    if (successTriggered.current) return
    successTriggered.current = true
    broadcastMessage({ success: true, emailType, user })
    onSuccessContinue()
  }, [userLoading, pendingEmail, pendingContactEmail, onSuccessContinue, emailVerified, contactEmail, contactEmailVerified, emailType, isSuccessful, broadcastMessage, user])

  // BROADCAST SUCCESS
  React.useEffect(() => {
    if (isSuccessful && ! hasBroadcasted) {
      broadcastMessage({ success: true, emailType, user })
    }
  }, [isSuccessful, broadcastMessage, hasBroadcasted, emailType, user])

  // LISTEN FOR SUCCESS IN ANOTHER TAB
  React.useEffect(() => {
    if (! messagePayload) return
    if (messagePayload.success && ! hasBroadcasted) {
      // Trigger success
      onSuccessContinue()
      // Update user from server
      storeUser()
    }
  }, [messagePayload, onSuccessContinue, storeUser, hasBroadcasted])

  // TEST CODE
  const [verificationCode, setVerificationCode] = React.useState(initialVerificationCode)
  const [checkCode, setCheckCode] = React.useState(hasInitialVerificationCode)
  const [checking, setChecking] = React.useState(false)
  const [error, setError] = React.useState(null)
  const isMounted = useIsMounted()
  useAsyncEffect(async () => {
    if (! checkCode || checking) return
    setChecking(true)
    const useDummy = true
    const { res, error } = await verifyEmail(verificationCode, useDummy)
    if (! isMounted) return
    if (error) {
      setCheckCode(false)
      setChecking(false)
      setError({ message: error.message.message })
      setHasInitialVerificationCode(false)
      setIsSuccessful(false)
      setVerificationCode('')
      return
    }
    if (res?.success) {
      if (user.is_email_verification_needed) {
        trackSignUp({ authProvider: 'password', userId: user.id })
      }
      const { res: userUpdated } = await getUser()
      setIsSuccessful(true)
      updateUser(userUpdated)
    }
    setError(null)
  }, [checkCode, checking, isMounted])

  // CHANGE CONTACT EMAIL
  const [isChangeEmail, setIsChangeEmail] = React.useState(Boolean(query?.isEdit))

  // STOP HERE if checking code from URL query or waiting for user to load
  if (! isSuccessful && (hasInitialVerificationCode || userLoading)) return null

  // SHOW SUCCESS MESSAGE
  if (isSuccessful) {
    return (
      <ConfirmEmailEmailSuccess
        email={email}
        emailType={emailType}
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
      <h2>Check your inbox</h2>
      <MarkdownText markdown={copy.emailVerify(emailType)} />
      {/* ERROR */}
      <Error error={error} />
      {/* CHANGE EMAIL */}
      <div>
        <EditBlock
          value={email}
          isEditMode={isChangeEmail}
          setIsEditMode={setIsChangeEmail}
          trackComponentName="ConfirmEmailPage"
          className="mb-4"
        />
        <MarkdownText className="inline-block mb-0" markdown={copy.emailQuestion} />
        <ConfirmEmailResendButton
          version="text"
          emailType={emailType}
          setError={setError}
        />
      </div>
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
