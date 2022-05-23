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
import ControlsContentSection from '@/app/ControlsContentSection'
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
          minHard: minHardBudget,
          minReccomendedStories,
        } = {},
        string: {
          minReccomendedStories: minReccomendedStoriesString,
        },
      } = {},
      hasSetUpProfile,
      dailySpendData,
    },
  } = React.useContext(ArtistContext)

  // TOGGLE CUSTOM BUDGET SETTER
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)
  const [hasBudgetBelowMinRecommendedStories, setHasBudgetBelowMinRecommendedStories] = React.useState(false)

  React.useEffect(() => {
    if (targetingState.budget < minReccomendedStories && !hasBudgetBelowMinRecommendedStories) {
      setHasBudgetBelowMinRecommendedStories(true)
      return
    }

    if (targetingState.budget >= minReccomendedStories && hasBudgetBelowMinRecommendedStories) {
      setHasBudgetBelowMinRecommendedStories(false)
    }
  }, [targetingState.budget, minReccomendedStories, hasBudgetBelowMinRecommendedStories])

  return (
    <section
      className={[
        'flex flex-column justify-between',
        className,
      ].join(' ')}
      style={{ height: '193px', paddingBottom: '0' }}
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
              dailySpendData={dailySpendData}
              className={!isDesktopLayout ? 'mr-12' : null}
            />
          </div>
          <ControlsContentSection action="choose your budget" className="mt-5">
            {/* BUDGET SETTER */}
            <div>
              <TargetingBudgetSetter
                currency={currencyCode}
                currencyOffset={currencyOffset}
                minBase={minBase}
                minHardBudget={minHardBudget}
                initialBudget={hasSetUpProfile ? initialTargetingState.budget : 5}
                targetingState={targetingState}
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
            {hasBudgetBelowMinRecommendedStories && (
              <ControlsSettingsSectionFooter
                copy={copy.budgetFooter(minReccomendedStoriesString)}
                className="mt-5 text-insta"
              />
            )}
          </ControlsContentSection>
        </>
      )}
    </section>
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
