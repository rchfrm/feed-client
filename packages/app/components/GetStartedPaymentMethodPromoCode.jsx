import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useDebounce from '@/app/hooks/useDebounce'

import Input from '@/elements/Input'
import Error from '@/elements/Error'
import Button from '@/elements/Button'

import { applyPromoCode } from '@/app/helpers/billingHelpers'

const GetStartedPaymentMethodPromoCode = ({ organisationId }) => {
  const [promoCode, setPromoCode] = React.useState('')
  const [shouldShowPromoCodeInput, setShouldShowPromoCodeInput] = React.useState(false)
  const [hasAppliedPromoCode, setHasAppliedPromoCode] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const debouncedPromoCode = useDebounce(promoCode, 300)

  const toggleCouponCodeInput = () => {
    setShouldShowPromoCodeInput((shouldShowPromoCodeInput) => !shouldShowPromoCodeInput)
  }

  const onChange = (e) => {
    const { value } = e.target

    setError(null)
    setPromoCode(value)
  }

  useAsyncEffect(async () => {
    if (!debouncedPromoCode) {
      return
    }

    setIsLoading(true)

    const { error } = await applyPromoCode(organisationId, debouncedPromoCode)

    if (error) {
      setError(error)
      setIsLoading(false)

      return
    }

    setHasAppliedPromoCode(true)
    setIsLoading(false)
  }, [debouncedPromoCode])

  React.useEffect(() => {
    if (!hasAppliedPromoCode) {
      return
    }

    // Call prorations or upcoming invoice endpoint?
    console.log('Retrieve amount to pay')
  }, [hasAppliedPromoCode])

  return (
    !hasAppliedPromoCode && (
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
              className="mb-3"
              disabled={isLoading}
              icon={isLoading ? 'spinner' : null}
            />
            <Error error={error} className="mb-0" />
          </div>
        )}
      </>
    )
  )
}

GetStartedPaymentMethodPromoCode.propTypes = {
  organisationId: PropTypes.string.isRequired,
}

GetStartedPaymentMethodPromoCode.defaultProps = {
}

export default GetStartedPaymentMethodPromoCode
