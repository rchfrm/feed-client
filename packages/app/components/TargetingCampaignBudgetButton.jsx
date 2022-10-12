import React from 'react'
import PropTypes from 'prop-types'

const TargetingCampaignBudgetButton = ({ setIsDailyBudget }) => {
  const onClick = async () => {
    setIsDailyBudget(false)
  }

  return (
    <a
      className={[
        'underline',
      ].join(' ')}
      style={{ paddingBottom: '0.3rem' }}
      role="button"
      onClick={onClick}
    >
      Set a campaign budget
    </a>
  )
}

TargetingCampaignBudgetButton.propTypes = {
  setIsDailyBudget: PropTypes.func.isRequired,
}

TargetingCampaignBudgetButton.defaultProps = {
}

export default TargetingCampaignBudgetButton
