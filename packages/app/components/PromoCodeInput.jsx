import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useDebounce from '@/app/hooks/useDebounce'

import Input from '@/elements/Input'
import Success from '@/elements/Success'
import Error from '@/elements/Error'

import { applyPromoCode, isValidPromoCode } from '@/app/helpers/billingHelpers'

const PromoCodeInput = ({
  organisationId,
  onSuccess,
}) => {
  const [promoCode, setPromoCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(null)

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
        placeholder="Promo code"
        value={promoCode}
        className="mb-3"
        disabled={isLoading || success}
        icon={isLoading ? 'spinner' : null}
      />
      <Error error={error} />
      {success && <Success message={`Promo code ${promoCode} applied`} className="text-sm" />}
    </div>
  )
}

PromoCodeInput.propTypes = {
  organisationId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

PromoCodeInput.defaultProps = {
}

export default PromoCodeInput
