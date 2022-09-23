import React from 'react'
import PropTypes from 'prop-types'

const TargetingBudgetCampaignButton = ({
  showCampaignBudget,
  setShowCampaignBudget,
}) => {
  const onClick = async () => {
    setShowCampaignBudget((showCampaignBudget) => !showCampaignBudget)
  }

  return (
    <a
      className={[
        'flex flex-row items-center',
        'no-underline',
        'px-3 py-1',
        'text-white',
        'rounded-full',
        'bg-black',
      ].join(' ')}
      style={{ paddingBottom: '0.3rem' }}
      role="button"
      onClick={onClick}
    >
      {showCampaignBudget ? 'Cancel' : 'Set campaign budget'}
    </a>
  )
}

TargetingBudgetCampaignButton.propTypes = {
  showCampaignBudget: PropTypes.bool.isRequired,
  setShowCampaignBudget: PropTypes.func.isRequired,
}

TargetingBudgetCampaignButton.defaultProps = {
}

export default TargetingBudgetCampaignButton
