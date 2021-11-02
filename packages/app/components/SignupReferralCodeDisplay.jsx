import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import Button from '@/elements/Button'
import TickIcon from '@/icons/TickIcon'

import useReferralStore from '@/app/stores/referralStore'

import brandColors from '@/constants/brandColors'

const getReferralStoreState = (state) => ({
  clearUsedReferralCode: state.clearUsedReferralCode,
  usedReferralCode: state.usedReferralCode,
})

const SignupReferralCodeDisplay = ({ className }) => {
  // READ STORE
  const {
    clearUsedReferralCode,
    usedReferralCode,
  } = useReferralStore(getReferralStoreState, shallow)

  const usedCode = React.useRef(usedReferralCode)

  return (
    <div
      className={[
        'iphone8:flex items-center',
        'mb-8 ',
        className,
      ].join(' ')}
    >
      <div className="flex items-center mb-5 iphone8:mb-0">
        <TickIcon fill={brandColors.successColor} className="w-4 h-auto mr-4" />
        Referral code:
      </div>
      <Button
        version="x-small"
        className={[
          'bg-white text-black border-solid border border-black',
          'iphone8:ml-3',
        ].join(' ')}
        onClick={clearUsedReferralCode}
        trackComponentName="SignupReferralCodeDisplay"
      >
        {usedCode.current}
        <strong
          className="inline-block ml-2"
          style={{ transform: 'translateY(-0.05rem)' }}
        >
          ×
        </strong>
      </Button>
    </div>
  )
}

SignupReferralCodeDisplay.propTypes = {
  className: PropTypes.string,
}

SignupReferralCodeDisplay.defaultProps = {
  className: null,
}

export default SignupReferralCodeDisplay
