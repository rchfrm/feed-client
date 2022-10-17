import React from 'react'
import PropTypes from 'prop-types'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import TargetingCampaignBudgetProgressBar from '@/app/TargetingCampaignBudgetProgressBar'
import TargetingCampaignBudgetEditButton from '@/app/TargetingCampaignBudgetEditButton'
import TargetingCampaignBudgetForm from '@/app/TargetingCampaignBudgetForm'

import Button from '@/elements/Button'

const TargetingCampaignBudget = ({
  initialTargetingState,
  targetingState,
  saveTargetingSettings,
  currency,
}) => {
  const { campaignBudget } = targetingState
  const [isCampaignEdit, setIsCampaignEdit] = React.useState(Boolean(!campaignBudget?.isActive))

  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings })

  const onCancel = async () => {
    await saveTargeting('campaignBudget', {
      ...targetingState,
      campaignBudget: {
        ...targetingState.campaignBudget,
        isActive: false,
      },
    })

    setIsCampaignEdit(true)
  }

  return (
    <div>
      {isCampaignEdit ? (
        <TargetingCampaignBudgetForm
          initialTargetingState={initialTargetingState}
          targetingState={targetingState}
          saveTargetingSettings={saveTargetingSettings}
          setIsCampaignEdit={setIsCampaignEdit}
          currency={currency}
        />
      ) : (
        <>
          <TargetingCampaignBudgetProgressBar
            campaignBudget={campaignBudget}
            dailyBudget={targetingState.budget}
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
  initialTargetingState: PropTypes.object.isRequired,
  targetingState: PropTypes.object.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
}

TargetingCampaignBudget.defaultProps = {
}

export default TargetingCampaignBudget
