import React from 'react'
import PropTypes from 'prop-types'

import PromoCodeInput from '@/app/PromoCodeInput'

import Error from '@/elements/Error'

const GetStartedDailyBudgetPromoCodeAlert = ({
  organisationId,
  setHasAppliedPromoCode,
  setHasCheckedIfPaymentIsRequired,
  closeAlert,
}) => {
  const [error, setError] = React.useState(null)

  const onSuccess = () => {
    setHasAppliedPromoCode(true)
    setHasCheckedIfPaymentIsRequired(false)
    closeAlert()
  }

  return (
    <div className="h-48">
      <h2 className="mb-8">Apply coupon code</h2>
      <PromoCodeInput
        organisationId={organisationId}
        onSuccess={onSuccess}
        setError={setError}
      />
      <Error error={error} />
    </div>
  )
}

GetStartedDailyBudgetPromoCodeAlert.propTypes = {
  organisationId: PropTypes.string.isRequired,
  setHasAppliedPromoCode: PropTypes.func.isRequired,
  setHasCheckedIfPaymentIsRequired: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
}

GetStartedDailyBudgetPromoCodeAlert.defaultProps = {
}

export default GetStartedDailyBudgetPromoCodeAlert
