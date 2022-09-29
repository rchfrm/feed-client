import React from 'react'
import PropTypes from 'prop-types'

import PromoCodeInput from '@/app/PromoCodeInput'

import Button from '@/elements/Button'

const GetStartedPaymentMethodPromoCode = ({
  promoCode,
  setPromoCode,
  setIsValidPromoCode,
  hasAppliedPromoCode,
  setHasAppliedPromoCode,
  isLoading,
  error,
  setError,
}) => {
  const [shouldShowPromoCodeInput, setShouldShowPromoCodeInput] = React.useState(Boolean(promoCode))

  const toggleCouponCodeInput = () => {
    setShouldShowPromoCodeInput((shouldShowPromoCodeInput) => !shouldShowPromoCodeInput)
  }

  return (
    <>
      {shouldShowPromoCodeInput && (
        <PromoCodeInput
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          setIsValidPromoCode={setIsValidPromoCode}
          hasAppliedPromoCode={hasAppliedPromoCode}
          setHasAppliedPromoCode={setHasAppliedPromoCode}
          isLoading={isLoading}
          error={error}
          setError={setError}
        />
      )}
      <Button
        version="text"
        type="button"
        onClick={toggleCouponCodeInput}
        className="w-full h-5 mb-3 text-sm text-center"
        trackComponentName="GetStartedPaymentMethodPromoCode"
      >
        {shouldShowPromoCodeInput ? 'Hide' : 'Enter '} promo code
      </Button>
    </>
  )
}

GetStartedPaymentMethodPromoCode.propTypes = {
  promoCode: PropTypes.string.isRequired,
  setPromoCode: PropTypes.func.isRequired,
  setIsValidPromoCode: PropTypes.func.isRequired,
  hasAppliedPromoCode: PropTypes.bool.isRequired,
  setHasAppliedPromoCode: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  setError: PropTypes.func.isRequired,
}

GetStartedPaymentMethodPromoCode.defaultProps = {
  error: null,
}

export default GetStartedPaymentMethodPromoCode
