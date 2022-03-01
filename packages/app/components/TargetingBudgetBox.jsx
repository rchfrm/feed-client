import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingBudgetPauseButton from '@/app/TargetingBudgetPauseButton'
import TargetingCustomBudgetButton from '@/app/TargetingCustomBudgetButton'
import TargetingBudgetButtons from '@/app/TargetingBudgetButtons'

const TargetingBudgetBox = ({
  className,
}) => {
  // GET TARGETING CONTEXT
  const {
    minReccBudget,
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

  // ARTIST context
  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        minorUnit: {
          minBase,
          minHard: minHardBudget,
        },
      },
    },
  } = React.useContext(ArtistContext)

  // TOGGLE CUSTOM BUDGET SETTER
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)

  return (
    <section
      className={[
        'flex flex-column justify-between',
        'rounded-dialogue',
        'p-6 bg-grey-1',
        className,
      ].join(' ')}
      style={{ height: '240px' }}
    >
      {targetingLoading ? (
        <Spinner width={36} />
      ) : (
        <>
          <div className="flex justify-between">
            {/* PAUSE OR RESUME SPENDING */}
            <TargetingBudgetPauseButton
              togglePauseCampaign={togglePauseCampaign}
              isPaused={!targetingState.status}
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
          {/* BUDGET SETTER */}
          <div className="px-2">
            <TargetingBudgetSetter
              currency={currencyCode}
              currencyOffset={currencyOffset}
              minBase={minBase}
              minReccBudget={minReccBudget}
              minHardBudget={minHardBudget}
              initialBudget={initialTargetingState.budget}
              targetingState={targetingState}
              updateTargetingBudget={updateTargetingBudget}
              showCustomBudget={showCustomBudget}
              setBudgetSlider={setBudgetSlider}
            />
          </div>
          <TargetingBudgetButtons
            targetingState={targetingState}
            initialTargetingState={initialTargetingState}
            updateTargetingBudget={updateTargetingBudget}
            saveTargetingSettings={saveTargetingSettings}
            disableSaving={disableSaving}
            budgetSlider={budgetSlider}
            showCustomBudget={showCustomBudget}
          />
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
