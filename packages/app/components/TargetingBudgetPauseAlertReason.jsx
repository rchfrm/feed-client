import React from 'react'
import PropTypes from 'prop-types'

import { track } from '@/helpers/trackingHelpers'

const TargetingBudgetPauseAlertReason = ({
  isPaused,
  togglePauseCampaign,
  budget,
  currency,
  setButtons,
  closeAlert,
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
  isPaused: PropTypes.bool.isRequired,
  togglePauseCampaign: PropTypes.func.isRequired,
  budget: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  setButtons: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
}

TargetingBudgetPauseAlertReason.defaultProps = {
}

export default TargetingBudgetPauseAlertReason
