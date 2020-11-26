import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import SignupPageContent from '@/app/SignupPageContent'
import SignupClosedContent from '@/app/SignupClosedContent'

import useReferralStore from '@/app/store/referralStore'

const requireReferralCode = true

const getReferralStoreState = (state) => ({
  hasValidCode: state.hasValidCode,
  hasTrueCode: state.hasTrueCode,
})

const SignupPage = ({}) => {
  // READ STORE
  const {
    hasTrueCode,
    hasValidCode,
  } = useReferralStore(getReferralStoreState, shallow)
  // HAS USER SUBMITTED VALID CODE?
  const hasReferralCode = hasValidCode && hasTrueCode
  return (
    <>
      {hasReferralCode || !requireReferralCode ? (
        <SignupPageContent />
      ) : (
        <SignupClosedContent />
      )}
    </>
  )
}

SignupPage.propTypes = {

}

export default SignupPage
