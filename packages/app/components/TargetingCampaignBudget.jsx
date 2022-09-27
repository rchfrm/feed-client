import React from 'react'
import PropTypes from 'prop-types'

import TargetingCampaignBudgetProgressBar from '@/app/TargetingCampaignBudgetProgressBar'
import TargetingCampaignBudgetEditButton from '@/app/TargetingCampaignEditBudgetButton'
import TargetingCampaignBudgetForm from '@/app/TargetingCampaignBudgetForm'

const TargetingCampaignBudget = ({
  campaignBudget,
  updateCampaignBudget,
  currency,
}) => {
  const [isCampaignEdit, setIsCampaignEdit] = React.useState(true)

  return (
    <div>
      {isCampaignEdit ? (
        <TargetingCampaignBudgetForm
          campaignBudget={campaignBudget}
          updateCampaignBudget={updateCampaignBudget}
          setIsCampaignEdit={setIsCampaignEdit}
          currency={currency}
        />
      ) : (
        <>
          <TargetingCampaignBudgetProgressBar
            campaignBudget={campaignBudget}
            currency={currency}
          />
          <TargetingCampaignBudgetEditButton
            setIsCampaignEdit={setIsCampaignEdit}
          />
        </>
      )}
    </div>
  )
}

TargetingCampaignBudget.propTypes = {
  campaignBudget: PropTypes.object.isRequired,
  updateCampaignBudget: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
}

TargetingCampaignBudget.defaultProps = {
}

export default TargetingCampaignBudget
