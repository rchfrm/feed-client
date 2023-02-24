import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Spinner from '@/elements/Spinner'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import DisabledSection from '@/app/DisabledSection'
import TargetingDailyBudget from '@/app/TargetingDailyBudget'
import TargetingBudgetTabs from '@/app/TargetingBudgetTabs'
import TargetingCampaignBudget from '@/app/TargetingCampaignBudget'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'
import DisabledActionPrompt from '@/app/DisabledActionPrompt'

import { hasAProfileOnGrowthOrPro } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/targetingPageCopy'

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
})

const TargetingBudget = ({
  className,
}) => {
  const {
    initialTargetingState,
    targetingState,
    saveTargetingSettings,
    targetingLoading,
  } = React.useContext(TargetingContext)

  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        minorUnit: {
          minBaseUnrounded,
          minRecommendedStories,
        } = {},
        string: {
          minRecommendedStories: minRecommendedStoriesString,
        } = {},
      } = {},
      hasSetUpProfile,
      hasGrowthPlan,
      hasProPlan,
      hasNoPlan,
      hasCancelledPlan,
    },
  } = React.useContext(ArtistContext)

  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const isDisabled = ! hasSetUpProfile
    || hasCancelledPlan
    || (hasNoPlan && hasAProfileOnGrowthOrPro(organizationArtists))

  const { campaignBudget } = targetingState
  const dayAfterEndDate = moment(campaignBudget?.endDate).add(1, 'days')
  const hasActiveCampaignBudget = Boolean(campaignBudget?.endDate) && moment().isBefore(dayAfterEndDate, 'day')

  const [budgetType, setBudgetType] = React.useState(hasActiveCampaignBudget ? 'campaign' : 'daily')
  const [shouldShowWarning, setShouldShowWarning] = React.useState(false)

  const isDailyBudget = budgetType === 'daily'
  const growthTierMaxDailyBudget = Math.round(minBaseUnrounded * 9)
  const proTierMaxDailyBudget = Math.round(minBaseUnrounded * 72)
  const hasBudgetBelowMinRecommendedStories = targetingState.budget < minRecommendedStories
  const mayHitGrowthTierMaxBudget = hasGrowthPlan && ! hasProPlan && targetingState.budget > growthTierMaxDailyBudget
  const mayHitProTierMaxBudget = hasProPlan && targetingState.budget > proTierMaxDailyBudget

  const budgetData = {
    currency: currencyCode,
    dailyBudget: targetingState.budget / currencyOffset,
    hasBudgetBelowMinRecommendedStories,
    minRecommendedStoriesString,
  }

  React.useEffect(() => {
    if (! hasSetUpProfile) return

    if (! hasBudgetBelowMinRecommendedStories && (! isDailyBudget || (! mayHitGrowthTierMaxBudget && ! mayHitProTierMaxBudget))) {
      setShouldShowWarning(false)
      return
    }

    if ((hasBudgetBelowMinRecommendedStories || (isDailyBudget && (mayHitGrowthTierMaxBudget || mayHitProTierMaxBudget))) && ! isDisabled) {
      setShouldShowWarning(true)
    }
  }, [mayHitGrowthTierMaxBudget, hasBudgetBelowMinRecommendedStories, mayHitProTierMaxBudget, hasSetUpProfile, isDailyBudget, isDisabled])

  return (
    <section
      className={[
        'h-full pb-0',
        className,
      ].join(' ')}
    >
      {targetingLoading ? (
        <Spinner width={36} className="h-full" />
      ) : (
        <>
          <h2 className="mb-5">Budget</h2>
          <DisabledSection
            section="set-budget"
            isDisabled={isDisabled}
            className="relative mt-4"
          >
            <TargetingBudgetTabs
              budgetType={budgetType}
              setBudgetType={setBudgetType}
              hasActiveCampaignBudget={hasActiveCampaignBudget}
              targetingState={targetingState}
            />
            {isDailyBudget ? (
              <TargetingDailyBudget />
            ) : (
              <TargetingCampaignBudget
                initialTargetingState={initialTargetingState}
                targetingState={targetingState}
                saveTargetingSettings={saveTargetingSettings}
                currency={currencyCode}
                currencyOffset={currencyOffset}
                hasActiveCampaignBudget={hasActiveCampaignBudget}
              />
            )}
          </DisabledSection>
          {shouldShowWarning && (
            hasBudgetBelowMinRecommendedStories ? (
              <ControlsSettingsSectionFooter
                copy={copy.budgetFooter(hasProPlan, budgetData)}
                className="mt-5 text-insta"
              />
            ) : (
              <DisabledActionPrompt
                copy={copy.budgetFooter(hasProPlan, budgetData)}
                section="budget"
                version="small"
                isButton={! hasProPlan}
                className="mt-5"
              />
            )
          )}
        </>
      )}
    </section>
  )
}

TargetingBudget.propTypes = {
  className: PropTypes.string,
}

TargetingBudget.defaultProps = {
  className: null,
}

export default TargetingBudget
