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
import copy from '@/app/copy/targetingPageCopy'
import { mayExceedSpendCap } from '@/app/helpers/budgetHelpers'
import { hasActiveBudget } from '@/app/helpers/artistHelpers'

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
    artistId,
    artist: {
      feedMinBudgetInfo: {
        currencyCode = 'GBP',
        currencyOffset = 100,
        minorUnit: {
          minRecommendedStories,
        } = {},
        string: {
          minRecommendedStories: minRecommendedStoriesString,
        } = {},
      } = {},
      hasSetUpProfile,
      hasLegacyPlan,
      hasBasicPlan,
      hasFreePlan,
      hasProPlan,
      hasNoPlan,
      plan,
      status,
    },
  } = React.useContext(ArtistContext)

  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const anotherProfileHasActiveBudget = organizationArtists.some((artist) => {
    if (artist.id === artistId) return false
    return hasActiveBudget(artist)
  })
  const isDisabled = ! hasSetUpProfile
    || hasNoPlan
    || status !== 'active'
    || (hasFreePlan && anotherProfileHasActiveBudget)

  const { campaignBudget } = targetingState
  const dayAfterEndDate = moment(campaignBudget?.endDate).add(1, 'days')
  const hasActiveCampaignBudget = Boolean(campaignBudget?.endDate) && moment().isBefore(dayAfterEndDate, 'day')

  const [budgetType, setBudgetType] = React.useState(hasActiveCampaignBudget ? 'campaign' : 'daily')
  const [shouldShowWarning, setShouldShowWarning] = React.useState(false)

  const isDailyBudget = budgetType === 'daily'
  const hasBudgetBelowMinRecommendedStories = targetingState.budget < minRecommendedStories
  const [planPrefix] = plan?.split('_') || []
  const mayHitSpendCap = mayExceedSpendCap(planPrefix, targetingState.budget, { code: currencyCode, offset: currencyOffset })

  const budgetData = {
    currency: currencyCode,
    dailyBudget: targetingState.budget / currencyOffset,
    hasBudgetBelowMinRecommendedStories,
    minRecommendedStoriesString,
  }

  React.useEffect(() => {
    if (
      hasSetUpProfile
      && ! isDisabled
      && (hasBudgetBelowMinRecommendedStories || mayHitSpendCap)
    ) {
      setShouldShowWarning(true)
      return
    }

    setShouldShowWarning(false)
  }, [hasBudgetBelowMinRecommendedStories, hasSetUpProfile, isDailyBudget, isDisabled, hasFreePlan, mayHitSpendCap])

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
            hasBudgetBelowMinRecommendedStories && ! mayHitSpendCap ? (
              <ControlsSettingsSectionFooter
                copy={copy.budgetFooter(plan, budgetData, mayHitSpendCap)}
                className="mt-5 text-insta"
              />
            ) : (
              ! hasLegacyPlan && ! hasBasicPlan && (
                <DisabledActionPrompt
                  copy={copy.budgetFooter(plan, budgetData, mayHitSpendCap)}
                  section="budget"
                  version="small"
                  isButton={! hasProPlan}
                  className="mt-5"
                />
              )
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
