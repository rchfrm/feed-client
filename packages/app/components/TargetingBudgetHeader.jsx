import React from 'react'
import PropTypes from 'prop-types'

const TargetingBudgetHeader = ({
  showCampaignBudget,
  hasSetUpProfile,
  targetingState,
}) => {
  return (
    <h2 className="mb-0 flex-1">
      {!showCampaignBudget ? 'Daily' : 'Campaign'} Budget
      {hasSetUpProfile && (
        <span className={!targetingState.status ? 'text-red' : 'text-green'}>
          {!targetingState.status ? ' Paused' : ' Active'}
        </span>
      )}
    </h2>
  )
}

TargetingBudgetHeader.propTypes = {
  showCampaignBudget: PropTypes.bool.isRequired,
  hasSetUpProfile: PropTypes.bool.isRequired,
  targetingState: PropTypes.object.isRequired,
}

TargetingBudgetHeader.defaultProps = {
}


export default TargetingBudgetHeader
