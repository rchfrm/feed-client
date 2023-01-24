import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import shallow from 'zustand/shallow'

import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSignup from '@/app/hooks/useSignup'
import useReferralStore from '@/app/stores/referralStore'

import ArrowAltIcon from 'shared/components/icons/ArrowAltIcon'
import brandColors from '@/constants/brandColors'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import * as utils from '@/helpers/utils'
import { trackSignUp, track } from '@/helpers/trackingHelpers'
import { fireSentryBreadcrumb, fireSentryError } from '@/app/helpers/sentryHelpers'
import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { acceptProfileInvite } from '@/app/helpers/artistHelpers'

import * as ROUTES from '@/app/constants/routes'
import styles from '@/LoginPage.module.css'

const getReferralStoreState = (state) => ({
  getStoredReferrerCode: state.getStoredReferrerCode,
})

const SignupEmailForm = ({ initialEmail, isValidReferralCode }) => {
  const [email, setEmail] = React.useState(initialEmail)
  const [password, setPassword] = React.useState('')
  const [referralCode, setReferralCode] = React.useState('')
  const [error, setError] = React.useState(null)
  const [hasEmailError, setHasEmailError] = React.useState(false)
  const [shouldShowReferralCodeInput, setShouldShowReferralCodeInput] = React.useState(false)

  const { runCreateUser, storeUser } = React.useContext(UserContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const { storeArtist } = React.useContext(ArtistContext)

  const { getStoredReferrerCode } = useReferralStore(getReferralStoreState, shallow)
  const initialReferralCode = getStoredReferrerCode()
  const inviteToken = getLocalStorage('inviteToken')

  React.useEffect(() => {
    setReferralCode(initialReferralCode)
    // eslint-disable-next-line
  }, [])

  const passwordStatus = React.useMemo(() => {
    if (! password) {
      return {
        success: false,
        error: false,
      }
    }
    const success = password.length >= 6
    return {
      success,
      error: ! success,
    }
  }, [password])

  const formComplete = React.useMemo(() => {
    if (hasEmailError) return false
    if (passwordStatus.error) return false
    if (email && password) return true

    return false
  }, [email, password, hasEmailError, passwordStatus.error])

  const onInputChange = (e) => {
    const { name, value } = e.target

    if (name === 'email') {
      const hasValidEmail = utils.testValidEmail(value)
      setHasEmailError(! hasValidEmail)
      setEmail(e.target.value)
    }

    if (name === 'password') {
      setPassword(e.target.value)
    }

    if (name === 'referral-code') {
      setReferralCode(e.target.value)
    }
  }

  const { signupWithEmail, rejectNewUser } = useSignup()

  // * HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Stop here if not complete
    if (! formComplete) return

    toggleGlobalLoading(true)
    fireSentryBreadcrumb({
      category: 'sign up',
      action: 'submit sign up form',
    })

    // If referral code is given, check if it's valid
    if (referralCode && referralCode !== initialReferralCode) {
      const isValid = await isValidReferralCode(referralCode)

      if (! isValid) {
        toggleGlobalLoading(false)
        return
      }
    }

    const signupRes = await signupWithEmail(email, password)
      .catch((error) => {
        setError(error)
        toggleGlobalLoading(false)
        // Sentry error
        fireSentryError({
          category: 'sign up',
          action: 'useSignup.signupWithEmail() with email failed',
          description: error.message,
          label: email,
        })
      })

    if (! signupRes) return

    window.grecaptcha.enterprise.ready(async () => {
      // Generate reCAPTCHA token to evaluate user interaction risks
      const verificationAction = 'register'
      const verificationToken = await window.grecaptcha.enterprise.execute(process.env.recaptcha_key, { action: verificationAction })

      // Create user on server
      const { res: user, error } = await runCreateUser({ verificationToken, verificationAction })
      if (error) {
        toggleGlobalLoading(false)
        // Sentry error
        fireSentryError({
          category: 'sign up',
          action: 'createUser() with password failed',
          description: error.message,
          label: email,
        })
        return rejectNewUser({ redirectTo: ROUTES.SIGN_UP, errorMessage: error.message })
      }

      if (inviteToken) {
        const { res, error: acceptInviteError } = await acceptProfileInvite(inviteToken)
        setLocalStorage('inviteToken', '')

        if (acceptInviteError) {
          toggleGlobalLoading(false)
          setError(error)
          return
        }

        const { user, error: userError } = await storeUser()
        if (userError) {
          toggleGlobalLoading(false)
          setError(error)
          return
        }

        const { error: artistError } = await storeArtist(res.profileId)
        if (artistError) {
          toggleGlobalLoading(false)
          setError(error)
          return
        }

        if (! user.is_email_verification_needed) {
          Router.push(ROUTES.PROFILE_INVITE_SUCCESS)
          return
        }
      }

      if (user.is_email_verification_needed) {
        track('recaptcha email verification needed', { userId: user.id })
        Router.push(ROUTES.CONFIRM_EMAIL)
        return
      }

      trackSignUp({ authProvider: 'password', userId: user.id })
      Router.push(ROUTES.GET_STARTED)
    })
  }

  const showReCaptchaBadge = (_, observer) => {
    const reCaptchaEl = document.getElementsByClassName('grecaptcha-badge')[0]

    if (reCaptchaEl) {
      reCaptchaEl.style.top = '14px'
      reCaptchaEl.style.visibility = 'visible'
      observer.disconnect()
    }
  }

  const toggleReferralCodeInput = () => {
    setShouldShowReferralCodeInput((shouldShowReferralCodeInput) => ! shouldShowReferralCodeInput)
  }

  React.useEffect(() => {
    /* There’s no guarantee that the reCaptcha DOM element exist on page load.
    So we watch the document body and apply styling once the element does exist. */
    const observer = new MutationObserver(showReCaptchaBadge)

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      const reCaptchaEl = document.getElementsByClassName('grecaptcha-badge')[0]
      reCaptchaEl.style.visibility = 'hidden'
    }
  }, [])

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Error className={styles.error} error={error} />
      <Input
        className={[styles.input, 'mb-6'].join(' ')}
        handleChange={onInputChange}
        name="email"
        type="email"
        label="Email"
        value={email}
        error={hasEmailError}
        autoFocus={! initialEmail}
        required
      />
      <Input
        className={[styles.input, 'mb-6'].join(' ')}
        handleChange={onInputChange}
        name="password"
        type="password"
        label="Password (at least 6 characters)"
        value={password}
        success={passwordStatus.success}
        error={passwordStatus.error}
        autoFocus={Boolean(initialEmail)}
        required
      />
      <div className={['w-full', shouldShowReferralCodeInput ? 'mb-4' : 'mb-10'].join(' ')}>
        <Button
          version="text"
          type="button"
          onClick={toggleReferralCodeInput}
          className={['-mt-2 h-5'].join(' ')}
          trackComponentName="SignupEmailForm"
        >
          {shouldShowReferralCodeInput ? 'Hide' : 'Enter a'} referral code
        </Button>
      </div>
      {shouldShowReferralCodeInput && (
        <div className="w-full mb-2">
          <Input
            handleChange={onInputChange}
            name="referral-code"
            type="text"
            label="Referral Code"
            value={referralCode}
          />
        </div>
      )}
      <Button
        className={[styles.signupButton, 'w-full xs:w-1/2 ml-auto'].join(' ')}
        version="green wide"
        disabled={! formComplete}
        type="submit"
        trackComponentName="SignupEmailForm"
      >
        Next
        <ArrowAltIcon
          className="ml-3 h-6"
          fill={! formComplete ? brandColors.greyDark : brandColors.offwhite}
          direction="right"
        />
      </Button>
    </form>
  )
}

SignupEmailForm.propTypes = {
  initialEmail: PropTypes.string,
  isValidReferralCode: PropTypes.func.isRequired,
}

SignupEmailForm.defaultProps = {
  initialEmail: '',
}

export default SignupEmailForm
