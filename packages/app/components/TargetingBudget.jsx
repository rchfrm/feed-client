import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import DisabledSection from '@/app/DisabledSection'
import TargetingDailyBudget from '@/app/TargetingDailyBudget'
import TargetingCampaignBudget from '@/app/TargetingCampaignBudget'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'
import DisabledActionPrompt from '@/app/DisabledActionPrompt'

import { hasAProfileOnGrowthOrPro } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/targetingPageCopy'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const TargetingBudget = ({
  className,
}) => {
  const {
    targetingState,
    targetingLoading,
    updateCampaignBudget,
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
      hasLegacyPlan,
      hasNoPlan,
    },
  } = React.useContext(ArtistContext)

  const { organisationArtists } = useBillingStore(getBillingStoreState)
  const isDisabled = !hasSetUpProfile || (hasNoPlan && hasAProfileOnGrowthOrPro(organisationArtists))

  const [isDailyBudget, setIsDailyBudget] = React.useState(true)
  const [shouldShowWarning, setShouldShowWarning] = React.useState(false)

  const growthTierMaxDailyBudget = Math.round(minBaseUnrounded * 9)
  const proTierMaxDailyBudget = Math.round(minBaseUnrounded * 72)
  const hasBudgetBelowMinRecommendedStories = targetingState.budget < minRecommendedStories
  const mayHitGrowthTierMaxBudget = hasGrowthPlan && !hasProPlan && targetingState.budget > growthTierMaxDailyBudget
  const mayHitProTierMaxBudget = hasProPlan && !hasLegacyPlan && targetingState.budget > proTierMaxDailyBudget

  const budgetData = {
    currency: currencyCode,
    dailyBudget: targetingState.budget / currencyOffset,
    hasBudgetBelowMinRecommendedStories,
    minRecommendedStoriesString,
  }

  React.useEffect(() => {
    if (!hasSetUpProfile) return

    if (hasBudgetBelowMinRecommendedStories || mayHitGrowthTierMaxBudget || mayHitProTierMaxBudget) {
      setShouldShowWarning(true)
    }

    if (!hasBudgetBelowMinRecommendedStories && !mayHitGrowthTierMaxBudget && !mayHitProTierMaxBudget) {
      setShouldShowWarning(false)
    }
  }, [mayHitGrowthTierMaxBudget, hasBudgetBelowMinRecommendedStories, mayHitProTierMaxBudget, hasSetUpProfile])

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
          <h2>Budget</h2>
          <DisabledSection
            section="set-budget"
            isDisabled={isDisabled}
            className="relative mt-4"
          >
            {isDailyBudget ? (
              <TargetingDailyBudget />
            ) : (
              <TargetingCampaignBudget
                campaignBudget={targetingState.campaignBudget}
                updateCampaignBudget={updateCampaignBudget}
                setIsDailyBudget={setIsDailyBudget}
                currency={currencyCode}
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
                isButton={!hasProPlan}
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
