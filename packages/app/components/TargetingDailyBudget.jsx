import React from 'react'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import TargetingBudgetStatus from '@/app/TargetingBudgetStatus'
import TargetingDailyBudgetPauseButton from '@/app/TargetingDailyBudgetPauseButton'
import TargetingDailyBudgetSetter from '@/app/TargetingDailyBudgetSetter'
import TargetingDailyBudgetCustomBudgetButton from '@/app/TargetingDailyBudgetCustomBudgetButton'
import TargetingDailyBudgetButtons from '@/app/TargetingDailyBudgetButtons'

import { hasAProfileOnGrowthOrPro } from '@/app/helpers/artistHelpers'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const TargetingDailyBudget = () => {
  const {
    targetingState,
    initialTargetingState,
    updateTargetingBudget,
    saveTargetingSettings,
    togglePauseCampaign,
    disableSaving,
    budgetSlider,
    setBudgetSlider,
  } = React.useContext(TargetingContext)

  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        minorUnit: {
          minBase,
          minHard: minHardBudget,
        } = {},
      } = {},
      hasSetUpProfile,
      hasNoPlan,
    },
  } = React.useContext(ArtistContext)

  const { organisationArtists } = useBillingStore(getBillingStoreState)
  const isDisabled = !hasSetUpProfile || (hasNoPlan && hasAProfileOnGrowthOrPro(organisationArtists))

  const [budget, setBudget] = React.useState(targetingState.budget)
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)

  return (
    <div className="flex flex-column justify-between h-44">
      <div className="flex justify-between">
        {hasSetUpProfile && (
          <TargetingBudgetStatus
            status={targetingState.status ? 'active' : 'paused'}
            className={targetingState.status ? 'text-green border-green' : 'text-red border-red'}
          />
        )}
        <TargetingDailyBudgetPauseButton
          togglePauseCampaign={togglePauseCampaign}
          isPaused={!targetingState.status}
          isDisabled={isDisabled}
        />
      </div>
      <TargetingDailyBudgetSetter
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
      <div className="flex items-center justify-between">
        <TargetingDailyBudgetButtons
          targetingState={targetingState}
          initialTargetingState={initialTargetingState}
          updateTargetingBudget={updateTargetingBudget}
          saveTargetingSettings={saveTargetingSettings}
          disableSaving={disableSaving}
          budgetSlider={budgetSlider}
          showCustomBudget={showCustomBudget}
        />
        <TargetingDailyBudgetCustomBudgetButton
          style={{ zIndex: 2 }}
          showCustomBudget={showCustomBudget}
          setShowCustomBudget={setShowCustomBudget}
          initialBudget={initialTargetingState.budget}
          minBase={minBase}
          minHardBudget={minHardBudget}
        />
      </div>
    </div>
  )
}

TargetingDailyBudget.propTypes = {
}

TargetingDailyBudget.defaultProps = {
}

export default TargetingDailyBudget
