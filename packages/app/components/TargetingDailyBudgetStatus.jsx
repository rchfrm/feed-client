import React from 'react'
import PropTypes from 'prop-types'

const TargetingDailyBudgetStatus = ({
  targetingState,
}) => {
  return (
    <p className={[
      'mb-0 px-3 py-1',
      'font-bold',
      'border-solid border-2 rounded-full',
      !targetingState.status ? 'text-red border-red' : 'text-green border-green',
    ].join(' ')}
    >
      {!targetingState.status ? ' Paused' : ' Active'}
    </p>
  )
}

TargetingDailyBudgetStatus.propTypes = {
  targetingState: PropTypes.object.isRequired,
}

TargetingDailyBudgetStatus.defaultProps = {
}

export default TargetingDailyBudgetStatus
