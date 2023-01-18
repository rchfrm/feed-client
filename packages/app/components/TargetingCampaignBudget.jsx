import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import moment from 'moment'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import TargetingCampaignBudgetProgressBar from '@/app/TargetingCampaignBudgetProgressBar'
import TargetingCampaignBudgetEditButton from '@/app/TargetingCampaignBudgetEditButton'
import TargetingCampaignBudgetForm from '@/app/TargetingCampaignBudgetForm'
import TargetingBudgetStatus from '@/app/TargetingBudgetStatus'

import ButtonNew from '@/elements/ButtonNew'

import { getDataSourceValue } from '@/app/helpers/appServer'
import { getSpendingData, getTotalSpentInPeriod } from '@/app/helpers/targetingHelpers'

const TargetingCampaignBudget = ({
  initialTargetingState,
  targetingState,
  saveTargetingSettings,
  currency,
  currencyOffset,
  hasActiveCampaignBudget,
}) => {
  const [isCampaignEdit, setIsCampaignEdit] = React.useState(! hasActiveCampaignBudget)
  const [spendingData, setSpendingData] = React.useState(null)
  const [totalSpent, setTotalSpent] = React.useState(0)

  const { artistId } = React.useContext(ArtistContext)
  const hasScheduledCampaignBudget = moment().isBefore(targetingState.campaignBudget?.startDate, 'day')

  const saveTargeting = useSaveTargeting({
    initialTargetingState,
    targetingState,
    saveTargetingSettings,
    setIsCampaignEdit,
    spendingData,
  })

  const onCancel = async () => {
    await saveTargeting('campaignBudget', {
      ...targetingState,
      campaignBudget: {
        ...targetingState.campaignBudget,
        startDate: null,
        endDate: null,
        totalBudget: null,
      },
    })
  }

  useAsyncEffect(async () => {
    const dataSource = 'facebook_ad_spend_feed'
    const response = await getDataSourceValue([dataSource], artistId)
    const dailySpendData = response[dataSource]?.daily_data
    const spendingData = getSpendingData(dailySpendData) || {}
    const totalSpent = getTotalSpentInPeriod(dailySpendData, targetingState.campaignBudget?.startDate)

    setTotalSpent(totalSpent)
    setSpendingData(spendingData)
  }, [])

  return (
    <div>
      {isCampaignEdit ? (
        <TargetingCampaignBudgetForm
          initialTargetingState={initialTargetingState}
          targetingState={targetingState}
          saveTargetingSettings={saveTargetingSettings}
          setIsCampaignEdit={setIsCampaignEdit}
          currency={currency}
          currencyOffset={currencyOffset}
          hasActiveCampaignBudget={hasActiveCampaignBudget}
        />
      ) : (
        <>
          <TargetingBudgetStatus
            status={hasScheduledCampaignBudget ? 'scheduled' : 'active'}
            className={hasScheduledCampaignBudget ? 'text-black border-black' : 'text-green border-green'}
          />
          <TargetingCampaignBudgetProgressBar
            campaignBudget={targetingState.campaignBudget}
            totalSpent={totalSpent}
            currency={currency}
          />
          <div className="flex justify-between">
            <ButtonNew
              size="small"
              version="secondary"
              onClick={onCancel}
              trackComponentName="TargetingCampaignBudget"
            >
              Cancel
            </ButtonNew>
            <TargetingCampaignBudgetEditButton
              setIsCampaignEdit={setIsCampaignEdit}
            />
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
  currencyOffset: PropTypes.number.isRequired,
  hasActiveCampaignBudget: PropTypes.bool.isRequired,
}

TargetingCampaignBudget.defaultProps = {
}

export default TargetingCampaignBudget
