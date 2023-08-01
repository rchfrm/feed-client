import React from 'react'
import { AdSet } from '@/app/types/api'
import {
  countActiveAdSets,
  createActiveAdSetString,
  createBudgetSummaryString,
  getLastUpdatedAtDate,
} from '@/app/helpers/campaignsHelpers'
import { formatDate } from '@/helpers/utils'
import MarkdownText from '@/elements/MarkdownText'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { hasActiveCampaignBudget, getRemainingBudget, getRemainingDays } from '@/app/helpers/targetingHelpers'
import { Dictionary } from 'ts-essentials'
import { ArtistContext } from '@/app/contexts/ArtistContext'


interface CampaignsHeaderProps {
  adSets: AdSet[]
  adSpendData: Dictionary<number>
  isLoading: boolean
}
const CampaignsHeader: React.FC<CampaignsHeaderProps> = ({
  adSets,
  adSpendData,
  isLoading,
}) => {
  const { targetingState } = React.useContext(TargetingContext)
  const {
    artistCurrency,
    artist: {
      min_daily_budget_info,
    },
  } = React.useContext(ArtistContext)
  if (isLoading || ! adSets) {
    return null
  }
  const lastUpdatedAt = getLastUpdatedAtDate(adSets)
  const counts = countActiveAdSets(adSets)
  const shouldShowCampaigns = targetingState.status === 1 && Array.from(counts).reduce((acc, [, count]) => acc + count, 0) > 1
  const isCampaignBudget = hasActiveCampaignBudget(targetingState)
  const currencyOffset = min_daily_budget_info.currency.offset
  const remainingBudget = isCampaignBudget ? getRemainingBudget(targetingState.campaignBudget, adSpendData) : targetingState.budget / currencyOffset
  const remainingDays = isCampaignBudget && getRemainingDays(targetingState.campaignBudget.endDate)
  const budgetSummaryString = createBudgetSummaryString(isCampaignBudget, artistCurrency, remainingBudget, remainingDays)
  const campaignSummary = `${createActiveAdSetString(counts)}, with ${budgetSummaryString}.`
  return (
    <>
      <h1>Your campaigns</h1>
      {shouldShowCampaigns ? (
        <div className="mb-8">
          <MarkdownText markdown={campaignSummary} />
          <p className="small--p">Data updated {formatDate(lastUpdatedAt)}</p>
        </div>
      ) : (
        <p>There is currently no campaigns data available.</p>
      )}
    </>
  )
}

export default CampaignsHeader
