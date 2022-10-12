import React from 'react'
import PropTypes from 'prop-types'

const TargetingBudgetHeader = ({
  isDailyBudget,
  hasSetUpProfile,
  targetingState,
}) => {
  return (
    <h2 className="mb-0 flex-1">
      {isDailyBudget ? 'Daily' : 'Campaign'} Budget
      {hasSetUpProfile && isDailyBudget && (
        <span className={!targetingState.status ? 'text-red' : 'text-green'}>
          {!targetingState.status ? ' Paused' : ' Active'}
        </span>
      )}
    </h2>
  )
}

TargetingBudgetHeader.propTypes = {
  isDailyBudget: PropTypes.bool.isRequired,
  hasSetUpProfile: PropTypes.bool.isRequired,
  targetingState: PropTypes.object.isRequired,
}

TargetingBudgetHeader.defaultProps = {
}


export default TargetingBudgetHeader
