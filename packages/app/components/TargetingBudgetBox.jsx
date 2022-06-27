import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingBudgetPauseButton from '@/app/TargetingBudgetPauseButton'
import TargetingCustomBudgetButton from '@/app/TargetingCustomBudgetButton'
import TargetingBudgetButtons from '@/app/TargetingBudgetButtons'
import DisabledSection from '@/app/DisabledSection'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'

import copy from '@/app/copy/controlsPageCopy'

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
      hasGrowthTier,
      hasProTier,
    },
  } = React.useContext(ArtistContext)

  const [budget, setBudget] = React.useState(targetingState.budget)
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)
  const [shouldShowWarning, setShouldShowWarning] = React.useState(false)

  const growthTierMaxBudget = Math.round(minBaseUnrounded * 10)
  const proTierMaxBudget = Math.round(minBaseUnrounded * 25)
  const hasBudgetBelowMinRecommendedStories = targetingState.budget < minRecommendedStories
  const mayHitGrowthTierMaxBudget = hasGrowthTier && !hasProTier && targetingState.budget > growthTierMaxBudget
  const mayHitProTierMaxBudget = hasProTier && targetingState.budget > proTierMaxBudget


  React.useEffect(() => {
    if (hasBudgetBelowMinRecommendedStories || mayHitGrowthTierMaxBudget || mayHitProTierMaxBudget) {
      setShouldShowWarning(true)
    }

    if (!hasBudgetBelowMinRecommendedStories && !mayHitGrowthTierMaxBudget && !mayHitProTierMaxBudget) {
      setShouldShowWarning(false)
    }
  }, [mayHitGrowthTierMaxBudget, hasBudgetBelowMinRecommendedStories, mayHitProTierMaxBudget])

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
                isDisabled={!hasSetUpProfile}
                className={!isDesktopLayout ? 'mr-12' : null}
              />
            </div>
            <DisabledSection section="budget">
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
        <ControlsSettingsSectionFooter
          copy={copy.budgetFooter(hasBudgetBelowMinRecommendedStories, minRecommendedStoriesString, hasProTier, currencyCode)}
          className="mt-5 text-insta"
        />
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
