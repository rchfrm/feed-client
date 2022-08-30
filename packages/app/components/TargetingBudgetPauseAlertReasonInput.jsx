import React from 'react'
import PropTypes from 'prop-types'

import TextArea from '@/elements/TextArea'

const TargetingBudgetPauseAlertReasonInput = ({
  customReason,
  setCustomReason,
  isValidCustomReason,
  minLength,
}) => {
  const handleChange = ({ target }) => {
    const { value } = target
    setCustomReason(value)
  }

  return (
    <>
      <TextArea
        name="custom-reason"
        value={customReason}
        handleChange={handleChange}
        className={isValidCustomReason ? 'mb-8' : 'mb-2'}
      />
      {!isValidCustomReason && (
        <p className="block relative h-4 text-xs mb-2">The minimum length for this field is {minLength} characters.</p>
      )}
    </>
  )
}

TargetingBudgetPauseAlertReasonInput.propTypes = {
  customReason: PropTypes.string.isRequired,
  setCustomReason: PropTypes.func.isRequired,
  isValidCustomReason: PropTypes.bool.isRequired,
  minLength: PropTypes.number.isRequired,
}

TargetingBudgetPauseAlertReasonInput.defaultProps = {
}

export default TargetingBudgetPauseAlertReasonInput
