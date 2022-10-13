import React from 'react'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingCustomBudgetButton from '@/app/TargetingCustomBudgetButton'
import TargetingBudgetButtons from '@/app/TargetingBudgetButtons'

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
        <TargetingCustomBudgetButton
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
