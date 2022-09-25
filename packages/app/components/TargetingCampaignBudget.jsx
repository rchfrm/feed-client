import React from 'react'
import PropTypes from 'prop-types'

import TargetingCampaignBudgetProgressBar from '@/app/TargetingCampaignBudgetProgressBar'
import TargetingCampaignBudgetEditButton from '@/app/TargetingCampaignEditBudgetButton'
import TargetingCampaignBudgetForm from '@/app/TargetingCampaignBudgetForm'

const TargetingCampaignBudget = ({ currency }) => {
  const [isCampaignEdit, setIsCampaignEdit] = React.useState(true)
  const [campaignBudget, setCampaignBudget] = React.useState(null)

  return (
    <div>
      {isCampaignEdit ? (
        <TargetingCampaignBudgetForm
          campaignBudget={campaignBudget}
          setCampaignBudget={setCampaignBudget}
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
  currency: PropTypes.string.isRequired,
}

TargetingCampaignBudget.defaultProps = {
}

export default TargetingCampaignBudget
