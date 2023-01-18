import React from 'react'
import PropTypes from 'prop-types'

import ButtonNew from '@/elements/ButtonNew'
import PencilIcon from '@/icons/PencilIcon'

const TargetingCampaignBudgetEditButton = ({ setIsCampaignEdit }) => {
  const toggleIsCampaignEdit = () => {
    setIsCampaignEdit(true)
  }

  return (
    <ButtonNew
      size="small"
      onClick={toggleIsCampaignEdit}
      trackComponentName="TargetingCampaignBudgetEditButton"
    >
      <PencilIcon className="w-4 h-auto mr-1" />
      Edit
    </ButtonNew>
  )
}

TargetingCampaignBudgetEditButton.propTypes = {
  setIsCampaignEdit: PropTypes.func.isRequired,
}

TargetingCampaignBudgetEditButton.defaultProps = {
}

export default TargetingCampaignBudgetEditButton
