import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useDebounce from '@/app/hooks/useDebounce'

import Input from '@/elements/Input'
import Success from '@/elements/Success'

import { applyPromoCode, isValidPromoCode } from '@/app/helpers/billingHelpers'

const PromoCodeInput = ({
  organisationId,
  onSuccess,
  setError,
}) => {
  const [promoCode, setPromoCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const debouncedPromoCode = useDebounce(promoCode, 300)

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

    const isValid = isValidPromoCode(debouncedPromoCode)
    if (!isValid) {
      setError({ message: 'Invalid promo code format' })

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
    setSuccess(true)
  }, [debouncedPromoCode])

  // Show success message
  React.useEffect(() => {
    if (!success) return

    const timeout = setTimeout(() => {
      setSuccess(false)
      onSuccess()
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [success, onSuccess])

  return (
    <div className="w-full mb-2">
      <Input
        handleChange={onChange}
        name="promo-code"
        type="text"
        placeholder="Coupon Code"
        value={promoCode}
        className="mb-3"
        disabled={isLoading || success}
        icon={isLoading ? 'spinner' : null}
      />
      {success && <Success message="Coupon code applied!" className="text-sm" />}
    </div>
  )
}

PromoCodeInput.propTypes = {
  organisationId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

PromoCodeInput.defaultProps = {
}

export default PromoCodeInput
