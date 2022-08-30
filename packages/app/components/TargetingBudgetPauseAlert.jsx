import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

import TargetingBudgetPauseAlertReason from '@/app/TargetingBudgetPauseAlertReason'
import TargetingBudgetPauseAlertShortSpendingPeriod from '@/app/TargetingBudgetPauseAlertShortSpendingPeriod'

const TargetingBudgetPauseAlert = ({
  isPaused,
  togglePauseCampaign,
  budget,
  spendingData,
  currency,
  closeAlert,
}) => {
  const { hasSpentConsecutivelyLessThan30Days } = spendingData || {}
  const isPausedWithShortSpendingPeriod = !isPaused && hasSpentConsecutivelyLessThan30Days

  const [shouldShowShortSpendingPeriodWarning, setShouldShowShortSpendingPeriodWarning] = React.useState(isPausedWithShortSpendingPeriod)

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
        isPaused={isPaused}
        togglePauseCampaign={togglePauseCampaign}
        setButtons={setButtons}
        closeAlert={closeAlert}
        budget={budget}
        currency={currency}
      />
    )
  )
}

TargetingBudgetPauseAlert.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  togglePauseCampaign: PropTypes.func.isRequired,
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
