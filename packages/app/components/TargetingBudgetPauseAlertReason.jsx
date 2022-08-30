import React from 'react'
import PropTypes from 'prop-types'

import TargetingBudgetPauseAlertReasonSelect from '@/app/TargetingBudgetPauseAlertReasonSelect'
import TargetingBudgetPauseAlertReasonInput from '@/app/TargetingBudgetPauseAlertReasonInput'

import { track } from '@/helpers/trackingHelpers'

const TargetingBudgetPauseAlertReason = ({
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
        text: 'Pause Spending',
        onClick: () => {
          togglePauseCampaign()

          const action = 'pause_spending'
          track(action, {
            budget,
            currency,
            reason,
            ...(hasOtherReason ? ({ otherReason }) : {}),
          })
        },
        disabled: !reason || (reason === 'other' && !otherReason),
        color: 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]

    setButtons(buttons)
  }, [closeAlert, setButtons, togglePauseCampaign, budget, currency, reason, otherReason, hasOtherReason])

  return (
    <>
      <TargetingBudgetPauseAlertReasonSelect
        reason={reason}
        setReason={setReason}
        setHasOtherReason={setHasOtherReason}
      />
      {hasOtherReason && (
        <TargetingBudgetPauseAlertReasonInput
          otherReason={otherReason}
          setOtherReason={setOtherReason}
        />
      )}
    </>
  )
}

TargetingBudgetPauseAlertReason.propTypes = {
  togglePauseCampaign: PropTypes.func.isRequired,
  budget: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  setButtons: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
}

TargetingBudgetPauseAlertReason.defaultProps = {
}

export default TargetingBudgetPauseAlertReason
