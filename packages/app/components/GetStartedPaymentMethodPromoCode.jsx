import React from 'react'
import PropTypes from 'prop-types'

import PromoCodeInput from '@/app/PromoCodeInput'

import Button from '@/elements/Button'

const GetStartedPaymentMethodPromoCode = ({
  organisationId,
  setHasAppliedPromoCode,
}) => {
  const [shouldShowPromoCodeInput, setShouldShowPromoCodeInput] = React.useState(false)

  const toggleCouponCodeInput = () => {
    setShouldShowPromoCodeInput((shouldShowPromoCodeInput) => !shouldShowPromoCodeInput)
  }

  const onSuccess = () => {
    setHasAppliedPromoCode(true)
  }

  return (
    <>
      <div className={['w-full -mt-3', shouldShowPromoCodeInput ? 'mb-4' : 'mb-10'].join(' ')}>
        <Button
          version="text"
          type="button"
          onClick={toggleCouponCodeInput}
          className={['-mt-2 w-full h-5 text-xs text-center'].join(' ')}
          trackComponentName="SignupEmailForm"
        >
          {shouldShowPromoCodeInput ? 'Hide' : 'Enter '} coupon code
        </Button>
      </div>
      {shouldShowPromoCodeInput && (
        <PromoCodeInput
          organisationId={organisationId}
          onSuccess={onSuccess}
        />
      )}
    </>
  )
}

GetStartedPaymentMethodPromoCode.propTypes = {
  organisationId: PropTypes.string.isRequired,
  setHasAppliedPromoCode: PropTypes.func.isRequired,
}

GetStartedPaymentMethodPromoCode.defaultProps = {
}

export default GetStartedPaymentMethodPromoCode
