import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useDebounce from '@/app/hooks/useDebounce'

import Input from '@/elements/Input'
import Success from '@/elements/Success'
import Error from '@/elements/Error'

import { isValidPromoCode } from '@/app/helpers/billingHelpers'

const PromoCodeInput = ({
  promoCode,
  setPromoCode,
  setIsValidPromoCode,
  hasAppliedPromoCode,
  setShouldShowPromoCode,
  isLoading,
  error,
  setError,
}) => {
  const [validationError, setValidationError] = React.useState(null)

  const debouncedPromoCode = useDebounce(promoCode, 300)

  const onChange = (e) => {
    const { value } = e.target

    setValidationError(null)
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
      setValidationError({ message: 'Invalid promo code format' })

      return
    }

    setIsValidPromoCode(true)
  }, [debouncedPromoCode])

  // Show success message
  React.useEffect(() => {
    if (!hasAppliedPromoCode) return

    const timeout = setTimeout(() => {
      setShouldShowPromoCode(false)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [hasAppliedPromoCode, setShouldShowPromoCode])

  return (
    <div className="w-full mb-2">
      <Input
        handleChange={onChange}
        name="promo-code"
        type="text"
        placeholder="Promo code"
        value={promoCode}
        className="mb-3"
        disabled={isLoading || hasAppliedPromoCode}
        icon={isLoading ? 'spinner' : null}
      />
      <Error error={validationError || error} />
      {hasAppliedPromoCode && <Success message={`Promo code ${promoCode} applied`} className="text-sm" />}
    </div>
  )
}

PromoCodeInput.propTypes = {
  promoCode: PropTypes.string.isRequired,
  setPromoCode: PropTypes.func.isRequired,
  setIsValidPromoCode: PropTypes.func.isRequired,
  hasAppliedPromoCode: PropTypes.bool.isRequired,
  setShouldShowPromoCode: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  setError: PropTypes.func.isRequired,
}

PromoCodeInput.defaultProps = {
  error: null,
}

export default PromoCodeInput
