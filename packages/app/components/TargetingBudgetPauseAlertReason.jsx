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
  const [customReason, setCustomReason] = React.useState('')
  const [hasCustomReason, setHasCustomReason] = React.useState(false)

  const minLength = 20
  const isValidCustomReason = customReason.length > minLength

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
            ...(hasCustomReason ? ({ customReason }) : {}),
          })
        },
        disabled: !reason || (reason === 'other' && !isValidCustomReason),
        color: 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
      },
    ]

    setButtons(buttons)
  }, [closeAlert, setButtons, togglePauseCampaign, budget, currency, reason, customReason, hasCustomReason, isValidCustomReason])

  return (
    <>
      <TargetingBudgetPauseAlertReasonSelect
        reason={reason}
        setReason={setReason}
        setHasCustomReason={setHasCustomReason}
      />
      {hasCustomReason && (
        <TargetingBudgetPauseAlertReasonInput
          customReason={customReason}
          setCustomReason={setCustomReason}
          isValidCustomReason={isValidCustomReason}
          minLength={minLength}
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
