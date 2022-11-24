import React from 'react'
import PropTypes from 'prop-types'

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

const SignupPage = ({ testimonies }) => {
  const {
    testCodeValidity,
    testCodeTruth,
    storeTrueCode,
    getStoredReferrerCode,
  } = useReferralStore(getReferralStoreState, shallow)

  const [checking, setChecking] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [email, setEmail] = React.useState('')
  const [testimony, setTestimony] = React.useState(null)

  const { asPath: urlString } = useRouter()

  const isValidReferralCode = async (referralCode) => {
    const isValid = testCodeValidity(referralCode)

    if (!isValid) {
      setError({ message: copy.invalidCodeCopy })
      return false
    }

    const isTrue = await testCodeTruth(referralCode)

    if (!isTrue) {
      setError({ message: copy.invalidCodeCopy })
      return false
    }

    // If reached here, code in query is valid and true and has been stored in store and local storage
    storeTrueCode(referralCode)
    setError(null)
    setChecking(false)

    return true
  }

  useAsyncEffect(async () => {
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

    const isValid = await isValidReferralCode(initialReferralCode)

    if (!isValid) {
      setChecking(false)
    }
  }, [])

  // Pick and set a random testimony
  React.useEffect(() => {
    if (!testimonies.length || testimony) return

    setTestimony(testimonies[Math.floor(Math.random() * testimonies.length)])
  }, [testimonies, testimony])

  // STOP HERE IF CHECKING QUERY CODE
  if (checking || !testimony) return <Spinner />

  return (
    <>
      <Error error={error} />
      <SignupPageContent
        email={email}
        isValidReferralCode={isValidReferralCode}
        testimony={testimony}
      />
    </>
  )
}

SignupPage.propTypes = {
  testimonies: PropTypes.array.isRequired,
}

export default SignupPage
