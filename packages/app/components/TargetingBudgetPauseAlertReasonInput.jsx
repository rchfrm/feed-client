import React from 'react'

import TextArea from '@/elements/TextArea'

const TargetingBudgetPauseAlertReasonInput = ({ otherReason, setOtherReason }) => {
  const handleChange = ({ target }) => {
    const { value } = target

    setOtherReason(value)
  }

  return (
    <TextArea
      name="other-reason"
      value={otherReason}
      handleChange={handleChange}
    />
  )
}

TargetingBudgetPauseAlertReasonInput.propTypes = {
}

TargetingBudgetPauseAlertReasonInput.defaultProps = {
}

export default TargetingBudgetPauseAlertReasonInput
