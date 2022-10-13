import React from 'react'
import PropTypes from 'prop-types'

const TargetingDailyBudgetStatus = ({
  hasSetUpProfile,
  targetingState,
}) => {
  return (
    <h2 className="mb-0 flex-1">
      {hasSetUpProfile && (
        <span className={!targetingState.status ? 'text-red' : 'text-green'}>
          {!targetingState.status ? ' Paused' : ' Active'}
        </span>
      )}
    </h2>
  )
}

TargetingDailyBudgetStatus.propTypes = {
  hasSetUpProfile: PropTypes.bool.isRequired,
  targetingState: PropTypes.object.isRequired,
}

TargetingDailyBudgetStatus.defaultProps = {
}

export default TargetingDailyBudgetStatus
