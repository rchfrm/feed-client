import React from 'react'

import Button from '@/elements/Button'
import Input from '@/elements/Input'

const GetStartedPaymentMethodPromoCode = () => {
  const [promoCode, setPromoCode] = React.useState('')
  const [shouldShowPromoCodeInput, setShouldShowPromoCodeInput] = React.useState(false)

  const toggleCouponCodeInput = () => {
    setShouldShowPromoCodeInput((shouldShowPromoCodeInput) => !shouldShowPromoCodeInput)
  }

  const onChange = (e) => {
    const { value } = e.target

    setPromoCode(value)
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
        <div className="w-full mb-2">
          <Input
            handleChange={onChange}
            name="promo-code"
            type="text"
            placeholder="Coupon Code"
            value={promoCode}
          />
        </div>
      )}
    </>
  )
}

GetStartedPaymentMethodPromoCode.propTypes = {
}

GetStartedPaymentMethodPromoCode.defaultProps = {
}

export default GetStartedPaymentMethodPromoCode
