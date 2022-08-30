import React from 'react'
import PropTypes from 'prop-types'

import TargetingBudgetPauseAlertReasonSelect from '@/app/TargetingBudgetPauseAlertReasonSelect'
import TargetingBudgetPauseAlertReasonInput from '@/app/TargetingBudgetPauseAlertReasonInput'

import { track } from '@/helpers/trackingHelpers'

const TargetingBudgetPauseAlertReason = ({
  isPaused,
  togglePauseCampaign,
  budget,
  currency,
  setButtons,
  closeAlert,
}) => {
  const [reason, setReason] = React.useState('')
  const [otherReason, setOtherReason] = React.useState('')
  const [hasOtherReason, setHasOtherReason] = React.useState(false)

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
        disabled: !reason || (reason === 'other' && !otherReason),
        color: isPaused ? 'green' : 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]

    setButtons(buttons)
  }, [isPaused, closeAlert, setButtons, togglePauseCampaign, budget, currency, reason, otherReason])

  return (
    <>
      <TargetingBudgetPauseAlertReasonSelect
        reason={reason}
        setReason={setReason}
        setHasOtherReason={setHasOtherReason}
      />
      {hasOtherReason && <TargetingBudgetPauseAlertReasonInput setOtherReason={setOtherReason} />}
    </>
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
