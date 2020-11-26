import React from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'
import shallow from 'zustand/shallow'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import SignupPageContent from '@/app/SignupPageContent'
import SignupClosedContent from '@/app/SignupClosedContent'

import useReferralStore from '@/app/store/referralStore'

import { parseUrl } from '@/helpers/utils'

import copy from '@/app/copy/referralCodeCopy'

const requireReferralCode = true

const getReferralStoreState = (state) => ({
  hasValidCode: state.hasValidCode,
  hasTrueCode: state.hasTrueCode,
  testCodeValidity: state.testCodeValidity,
  testCodeTruth: state.testCodeTruth,
})

const SignupPage = ({ showEmailSignup }) => {
  // READ STORE
  const {
    hasTrueCode,
    hasValidCode,
    testCodeValidity,
    testCodeTruth,
  } = useReferralStore(getReferralStoreState, shallow)

  // READ CODE FROM QUERY
  const [checking, setChecking] = React.useState(true)
  const [error, setError] = React.useState(null)
  const { asPath: urlString } = useRouter()
  useAsyncEffect(async (isMounted) => {
    const { query } = parseUrl(urlString)
    const queryCode = query?.code
    // If no code in query just behave as normal
    if (!queryCode) {
      setChecking(false)
      return
    }
    const isValid = testCodeValidity(queryCode)
    if (!isValid) {
      setChecking(false)
      setError({ message: copy.invalidCodeCopy })
      return
    }
    const isTrue = await testCodeTruth(queryCode)
    if (!isMounted()) return
    setChecking(false)
    if (!isTrue) {
      setError({ message: copy.invalidCodeCopy })
      return
    }
    setError(null)
  // eslint-disable-next-line
  }, [])

  // HAS USER SUBMITTED VALID CODE?
  const hasReferralCode = hasValidCode && hasTrueCode

  // STOP HERE IF CHECKING QUERY CODE
  if (checking) return <Spinner />

  return (
    <>
      <Error error={error} />
      {hasReferralCode || !requireReferralCode ? (
        <SignupPageContent showEmailSignup={showEmailSignup} />
      ) : (
        <SignupClosedContent />
      )}
    </>
  )
}

SignupPage.propTypes = {
  showEmailSignup: PropTypes.bool,
}

SignupPage.defaultProps = {
  showEmailSignup: false,
}


export default SignupPage
