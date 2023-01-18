import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import PencilIcon from '@/icons/PencilIcon'

const TargetingCampaignBudgetEditButton = ({ setIsCampaignEdit }) => {
  const toggleIsCampaignEdit = () => {
    setIsCampaignEdit(true)
  }

  return (
    <Button
      size="small"
      onClick={toggleIsCampaignEdit}
      trackComponentName="TargetingCampaignBudgetEditButton"
    >
      <PencilIcon className="w-4 h-auto mr-1" />
      Edit
    </Button>
  )
}

TargetingCampaignBudgetEditButton.propTypes = {
  setIsCampaignEdit: PropTypes.func.isRequired,
}

TargetingCampaignBudgetEditButton.defaultProps = {
}

export default TargetingCampaignBudgetEditButton
