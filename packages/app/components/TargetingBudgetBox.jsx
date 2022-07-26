import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useBillingStore from '@/app/stores/billingStore'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingBudgetPauseButton from '@/app/TargetingBudgetPauseButton'
import TargetingCustomBudgetButton from '@/app/TargetingCustomBudgetButton'
import TargetingBudgetButtons from '@/app/TargetingBudgetButtons'
import DisabledSection from '@/app/DisabledSection'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'
import DisabledActionPrompt from '@/app/DisabledActionPrompt'

import { hasAProfileOnGrowthOrPro } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/targetingPageCopy'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const TargetingBudgetBox = ({
  className,
}) => {
  // GET TARGETING CONTEXT
  const {
    targetingState,
    initialTargetingState,
    updateTargetingBudget,
    saveTargetingSettings,
    togglePauseCampaign,
    disableSaving,
    targetingLoading,
    budgetSlider,
    setBudgetSlider,
  } = React.useContext(TargetingContext)

  const isDesktopLayout = useBreakpointTest('md')

  // ARTIST context
  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        minorUnit: {
          minBase,
          minBaseUnrounded,
          minHard: minHardBudget,
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
    },
  } = React.useContext(ArtistContext)

  const { organisationArtists } = useBillingStore(getBillingStoreState)
  const isDisabled = !hasSetUpProfile || (hasLegacyPlan && hasAProfileOnGrowthOrPro(organisationArtists))

  const [budget, setBudget] = React.useState(targetingState.budget)
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)
  const [shouldShowWarning, setShouldShowWarning] = React.useState(false)

  const growthTierMaxDailyBudget = Math.round(minBaseUnrounded * 9)
  const proTierMaxDailyBudget = Math.round(minBaseUnrounded * 72)
  const hasBudgetBelowMinRecommendedStories = targetingState.budget < minRecommendedStories
  const mayHitGrowthTierMaxBudget = hasGrowthPlan && !hasProPlan && targetingState.budget > growthTierMaxDailyBudget
  const mayHitProTierMaxBudget = hasProPlan && !hasLegacyPlan && targetingState.budget > proTierMaxDailyBudget

  const budgetData = {
    currency: currencyCode,
    projectedMonthlyBudget: (targetingState.budget * 31) / currencyOffset,
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
    <>
      <section
        className={[
          'flex flex-column justify-between',
          className,
        ].join(' ')}
        style={{ height: '170px', paddingBottom: '0' }}
      >
        {targetingLoading ? (
          <Spinner width={36} />
        ) : (
          <>
            <div className="flex justify-between items-start">
              <h2 className="mb-0">
                Daily Budget
                {!targetingState.status ? (
                  hasSetUpProfile && <span className="text-red"> Paused</span>
                ) : (
                  hasSetUpProfile && <span className="text-green"> Active</span>
                )}
              </h2>
              {/* PAUSE OR RESUME SPENDING */}
              <TargetingBudgetPauseButton
                togglePauseCampaign={togglePauseCampaign}
                isPaused={!targetingState.status}
                isDisabled={isDisabled}
                className={!isDesktopLayout ? 'mr-12' : null}
              />
            </div>
            <DisabledSection
              section="budget"
              isDisabled={isDisabled}
              className="mt-4"
            >
              {/* BUDGET SETTER */}
              <div>
                <TargetingBudgetSetter
                  budget={budget}
                  setBudget={setBudget}
                  currency={currencyCode}
                  currencyOffset={currencyOffset}
                  minBase={minBase}
                  minHardBudget={minHardBudget}
                  initialBudget={hasSetUpProfile ? initialTargetingState.budget : 5}
                  updateTargetingBudget={updateTargetingBudget}
                  showCustomBudget={showCustomBudget}
                  setBudgetSlider={setBudgetSlider}
                />
              </div>
              <div className="flex items-center justify-between">
                <TargetingBudgetButtons
                  targetingState={targetingState}
                  initialTargetingState={initialTargetingState}
                  updateTargetingBudget={updateTargetingBudget}
                  saveTargetingSettings={saveTargetingSettings}
                  disableSaving={disableSaving}
                  budgetSlider={budgetSlider}
                  showCustomBudget={showCustomBudget}
                />
                {/* TOGGLE CUSTOM BUDGET */}
                <TargetingCustomBudgetButton
                  style={{ zIndex: 2 }}
                  showCustomBudget={showCustomBudget}
                  setShowCustomBudget={setShowCustomBudget}
                  initialBudget={initialTargetingState.budget}
                  minBase={minBase}
                  minHardBudget={minHardBudget}
                />
              </div>
            </DisabledSection>
          </>
        )}
      </section>
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
            className="mt-5"
          />
        )
      )}
    </>
  )
}

TargetingBudgetBox.displayName = 'TargetingBudgetBox'

TargetingBudgetBox.propTypes = {
  className: PropTypes.string,
}

TargetingBudgetBox.defaultProps = {
  className: null,
}


export default TargetingBudgetBox
