import React from 'react'
import PropTypes from 'prop-types'

import PromoCodeInput from '@/app/PromoCodeInput'

import Button from '@/elements/Button'

const GetStartedPaymentMethodPromoCode = ({
  promoCode,
  setPromoCode,
  setIsValidPromoCode,
  hasAppliedPromoCode,
  setShouldHidePromoCode,
  isLoading,
  error,
  setError,
}) => {
  const [shouldShowPromoCodeInput, setShouldShowPromoCodeInput] = React.useState(false)

  const toggleCouponCodeInput = () => {
    setShouldShowPromoCodeInput((shouldShowPromoCodeInput) => !shouldShowPromoCodeInput)
  }

  return (
    <>
      <div className={['w-full -mt-3 mb-4'].join(' ')}>
        <Button
          version="text"
          type="button"
          onClick={toggleCouponCodeInput}
          className={['-mt-2 w-full h-5 text-sm text-center'].join(' ')}
          trackComponentName="GetStartedPaymentMethodPromoCode"
        >
          {shouldShowPromoCodeInput ? 'Hide' : 'Enter '} promo code
        </Button>
      </div>
      {shouldShowPromoCodeInput && (
        <PromoCodeInput
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          setIsValidPromoCode={setIsValidPromoCode}
          hasAppliedPromoCode={hasAppliedPromoCode}
          setShouldHidePromoCode={setShouldHidePromoCode}
          isLoading={isLoading}
          error={error}
          setError={setError}
        />
      )}
    </>
  )
}

GetStartedPaymentMethodPromoCode.propTypes = {
  promoCode: PropTypes.string.isRequired,
  setPromoCode: PropTypes.func.isRequired,
  setIsValidPromoCode: PropTypes.func.isRequired,
  hasAppliedPromoCode: PropTypes.bool.isRequired,
  setShouldHidePromoCode: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  setError: PropTypes.func.isRequired,
}

GetStartedPaymentMethodPromoCode.defaultProps = {
  error: null,
}

export default GetStartedPaymentMethodPromoCode
