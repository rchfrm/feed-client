import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingCampaignBudgetProgressBar from '@/app/TargetingCampaignBudgetProgressBar'
import TargetingCampaignBudgetEditButton from '@/app/TargetingCampaignBudgetEditButton'
import TargetingCampaignBudgetForm from '@/app/TargetingCampaignBudgetForm'

import Button from '@/elements/Button'

import { saveCampaignBudget } from '@/app/helpers/targetingHelpers'

const TargetingCampaignBudget = ({
  campaignBudget,
  updateCampaignBudget,
  currency,
}) => {
  const [isCampaignEdit, setIsCampaignEdit] = React.useState(Boolean(!campaignBudget?.startDate))

  const { artistId } = React.useContext(ArtistContext)

  const onCancel = async () => {
    const { res: campaignBudget, error } = await saveCampaignBudget(artistId, null)

    if (error) {
      return
    }

    updateCampaignBudget(campaignBudget)
  }

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
          <div className="flex justify-between">
            <TargetingCampaignBudgetEditButton
              setIsCampaignEdit={setIsCampaignEdit}
            />
            <Button
              version="red small"
              className="h-8 rounded-full"
              onClick={onCancel}
              trackComponentName="TargetingCampaignBudget"
            >
              Cancel campaign
            </Button>
          </div>
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
