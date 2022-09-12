import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useDebounce from '@/app/hooks/useDebounce'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import Success from '@/elements/Success'

import { applyPromoCode } from '@/app/helpers/billingHelpers'

const GetStartedPaymentMethodPromoCode = ({
  organisationId,
  hasAppliedPromoCode,
  setHasAppliedPromoCode,
  setError,
}) => {
  const [promoCode, setPromoCode] = React.useState('')
  const [shouldShowPromoCodeInput, setShouldShowPromoCodeInput] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const debouncedPromoCode = useDebounce(promoCode, 300)

  const toggleCouponCodeInput = () => {
    setShouldShowPromoCodeInput((shouldShowPromoCodeInput) => !shouldShowPromoCodeInput)
  }

  const onChange = (e) => {
    const { value } = e.target

    setError(null)
    setPromoCode(value)
  }

  // Make 'apply promo code' request on change
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

    setIsLoading(false)
    setHasAppliedPromoCode(true)
    setSuccess(true)
  }, [debouncedPromoCode])

  // Show success message
  React.useEffect(() => {
    if (!success) return

    const timeout = setTimeout(() => {
      setSuccess(false)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [success])

  return (
    <>
      {!hasAppliedPromoCode && (
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
            </div>
          )}
        </>
      )}
      {success && <Success message="Coupon code applied!" className="text-sm" />}
    </>
  )
}

GetStartedPaymentMethodPromoCode.propTypes = {
  organisationId: PropTypes.string.isRequired,
  hasAppliedPromoCode: PropTypes.bool.isRequired,
  setHasAppliedPromoCode: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

GetStartedPaymentMethodPromoCode.defaultProps = {
}

export default GetStartedPaymentMethodPromoCode
