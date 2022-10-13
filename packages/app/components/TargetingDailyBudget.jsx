import React from 'react'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingDailyBudgetSetter from '@/app/TargetingDailyBudgetSetter'
import TargetingDailyBudgetCustomBudgetButton from '@/app/TargetingDailyBudgetCustomBudgetButton'
import TargetingDailyBudgetButtons from '@/app/TargetingDailyBudgetButtons'

const TargetingDailyBudget = () => {
  const {
    targetingState,
    initialTargetingState,
    updateTargetingBudget,
    saveTargetingSettings,
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
    },
  } = React.useContext(ArtistContext)

  const [budget, setBudget] = React.useState(targetingState.budget)
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)

  return (
    <div className="flex flex-column justify-between h-32 mb-8">
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
