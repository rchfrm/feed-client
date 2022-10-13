import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import PencilIcon from '@/icons/PencilIcon'

import brandColors from '@/constants/brandColors'

const TargetingCampaignBudgetEditButton = ({ setIsCampaignEdit }) => {
  const toggleIsCampaignEdit = () => {
    setIsCampaignEdit(true)
  }

  return (
    <Button
      version="green small"
      className="h-8 rounded-full flex items-center"
      onClick={toggleIsCampaignEdit}
      trackComponentName="TargetingCampaignEditBudgetButton"
    >
      <PencilIcon fill={brandColors.white} className="h-4 mr-1" />
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
