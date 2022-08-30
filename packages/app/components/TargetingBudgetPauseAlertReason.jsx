import React from 'react'

import { track } from '@/helpers/trackingHelpers'

const TargetingBudgetPauseAlertReason = ({
  isPaused,
  togglePauseCampaign,
  setButtons,
  closeAlert,
  budget,
  currency,
}) => {
  React.useEffect(() => {
    const buttons = [
      {
        text: isPaused ? 'Resume Spending' : 'Pause Spending',
        onClick: () => {
          togglePauseCampaign()

          const action = isPaused ? 'resume_spending' : 'pause_spending'
          track(action, {
            budget,
            currency,
          })
        },
        color: isPaused ? 'green' : 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]

    setButtons(buttons)
  }, [isPaused, closeAlert, setButtons, togglePauseCampaign, budget, currency])

  return (
    <p>Pause alert reason</p>
  )
}

TargetingBudgetPauseAlertReason.propTypes = {
}

TargetingBudgetPauseAlertReason.defaultProps = {
}

export default TargetingBudgetPauseAlertReason
