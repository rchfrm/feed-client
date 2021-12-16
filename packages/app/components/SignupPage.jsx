import React from 'react'

import { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'
import shallow from 'zustand/shallow'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import SignupPageContent from '@/app/SignupPageContent'

import useReferralStore from '@/app/stores/referralStore'

import { parseUrl } from '@/helpers/utils'

import copy from '@/app/copy/referralCodeCopy'

const getReferralStoreState = (state) => ({
  testCodeValidity: state.testCodeValidity,
  testCodeTruth: state.testCodeTruth,
  storeTrueCode: state.storeTrueCode,
  getStoredReferrerCode: state.getStoredReferrerCode,
})

const SignupPage = () => {
  // READ STORE
  const {
    testCodeValidity,
    testCodeTruth,
    storeTrueCode,
    getStoredReferrerCode,
  } = useReferralStore(getReferralStoreState, shallow)

  // READ CODE FROM QUERY
  const [checking, setChecking] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [email, setEmail] = React.useState('')
  const { asPath: urlString } = useRouter()

  useAsyncEffect(async (isMounted) => {
    const { query } = parseUrl(urlString)
    const email = decodeURIComponent(query?.email || '')
    const queryCode = query?.code
    const localCode = getStoredReferrerCode()
    const initialReferralCode = queryCode || localCode

    if (email) {
      setEmail(email)
    }
    // If no code in query just behave as normal
    if (!initialReferralCode) {
      setChecking(false)
      return
    }
    const isValid = testCodeValidity(initialReferralCode)
    if (!isValid) {
      setChecking(false)
      setError({ message: copy.invalidCodeCopy })
      return
    }
    const isTrue = await testCodeTruth(initialReferralCode)
    if (!isMounted()) return
    setChecking(false)
    if (!isTrue) {
      setError({ message: copy.invalidCodeCopy })
      return
    }
    // If reached here, code in query is valid and true
    // and has been stored in store and local storage
    storeTrueCode(initialReferralCode)
    setError(null)
  }, [])

  // STOP HERE IF CHECKING QUERY CODE
  if (checking) return <Spinner />

  return (
    <>
      <Error error={error} />
      <SignupPageContent email={email} />
    </>
  )
}

export default SignupPage
