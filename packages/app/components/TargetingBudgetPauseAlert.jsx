import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

import TargetingBudgetPauseAlertReason from '@/app/TargetingBudgetPauseAlertReason'
import TargetingBudgetPauseAlertShortSpendingPeriod from '@/app/TargetingBudgetPauseAlertShortSpendingPeriod'

const TargetingBudgetPauseAlert = ({
  onConfirm,
  budget,
  spendingData,
  currency,
  closeAlert,
}) => {
  const { hasSpentConsecutivelyLessThan30Days } = spendingData || {}

  const [shouldShowShortSpendingPeriodWarning, setShouldShowShortSpendingPeriodWarning] = React.useState(hasSpentConsecutivelyLessThan30Days)

  const { setButtons } = useAlertModal()

  return (
    shouldShowShortSpendingPeriodWarning ? (
      <TargetingBudgetPauseAlertShortSpendingPeriod
        budget={budget}
        spendingData={spendingData}
        setShouldShowShortSpendingPeriodWarning={setShouldShowShortSpendingPeriodWarning}
        setButtons={setButtons}
        closeAlert={closeAlert}
      />
    ) : (
      <TargetingBudgetPauseAlertReason
        onConfirm={onConfirm}
        setButtons={setButtons}
        closeAlert={closeAlert}
        budget={budget}
        currency={currency}
      />
    )
  )
}

TargetingBudgetPauseAlert.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  budget: PropTypes.number.isRequired,
  spendingData: PropTypes.shape({
    hasSpentConsecutivelyLessThan30Days: PropTypes.bool.isRequired,
    daysOfSpending: PropTypes.number.isRequired,
  }),
  currency: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired,
}

TargetingBudgetPauseAlert.defaultProps = {
  spendingData: null,
}

export default TargetingBudgetPauseAlert
