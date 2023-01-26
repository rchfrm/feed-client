import React from 'react'
import PropTypes from 'prop-types'

import TargetingBudgetPauseAlertReasonSelect from '@/app/TargetingBudgetPauseAlertReasonSelect'
import TargetingBudgetPauseAlertReasonInput from '@/app/TargetingBudgetPauseAlertReasonInput'

import { track } from '@/helpers/trackingHelpers'

const TargetingBudgetPauseAlertReason = ({
  onConfirm,
  budget,
  currency,
  setButtons,
  closeAlert,
}) => {
  const [reason, setReason] = React.useState('')
  const [customReason, setCustomReason] = React.useState('')
  const [hasCustomReason, setHasCustomReason] = React.useState(false)

  const customReasonMinLength = 20
  const isValidCustomReason = customReason.length >= customReasonMinLength

  React.useEffect(() => {
    const buttons = [
      {
        text: 'Pause Spending',
        onClick: () => {
          onConfirm()

          const action = 'pause_spending'
          track(action, {
            budget,
            currency,
            reason,
            ...(hasCustomReason ? ({ customReason }) : {}),
          })
        },
        isDisabled: ! reason || (reason === 'other' && ! isValidCustomReason),
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        version: 'secondary',
      },
    ]

    setButtons(buttons)
  }, [closeAlert, setButtons, onConfirm, budget, currency, reason, customReason, hasCustomReason, isValidCustomReason])

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
          minLength={customReasonMinLength}
        />
      )}
    </>
  )
}

TargetingBudgetPauseAlertReason.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  budget: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  setButtons: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
}

TargetingBudgetPauseAlertReason.defaultProps = {
}

export default TargetingBudgetPauseAlertReason
