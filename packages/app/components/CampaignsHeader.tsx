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
import { OverviewPeriod } from '@/app/types/overview'


interface CampaignsHeaderProps {
  adSets: AdSet[]
  adSpendData: Dictionary<number>
  period: OverviewPeriod
  isLoading: boolean
}
const CampaignsHeader: React.FC<CampaignsHeaderProps> = ({
  adSets,
  adSpendData,
  period,
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
  const noCampaignsString = period && period.start && period.end
    ? `Showing data from the last campaign which ended on **${formatDate(period.end, false)}**.`
    : ''
  const dataUpdatedString = `**Data updated:** _${formatDate(lastUpdatedAt)}_`
  return (
    <>
      <h1>Your campaigns</h1>
      {shouldShowCampaigns ? (
        <div className="mb-8">
          <MarkdownText markdown={`There are currently no active campaigns. ${campaignSummary}`} />
          <MarkdownText markdown={dataUpdatedString} className="small--p" />
        </div>
      ) : (
        <MarkdownText markdown={noCampaignsString} />
      )}
    </>
  )
}

export default CampaignsHeader
