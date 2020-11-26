import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import SignupPageContent from '@/app/SignupPageContent'
import SignupClosedContent from '@/app/SignupClosedContent'

import useReferralStore from '@/app/store/referralStore'

const requireReferralCode = true

const getReferralStoreState = (state) => ({
  hasValidCode: state.hasValidCode,
  hasTrueCode: state.hasTrueCode,
})

const SignupPage = ({ showEmailSignup }) => {
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
