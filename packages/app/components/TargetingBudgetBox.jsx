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
        className,
      ].join(' ')}
      style={{ height: '180px' }}
    >
      {targetingLoading ? (
        <Spinner width={36} />
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="mb-0">Daily Budget <span className={['text-green', !targetingState.status ? 'hidden' : null].join(' ')}>Active</span></h2>
            {/* PAUSE OR RESUME SPENDING */}
            <TargetingBudgetPauseButton
              togglePauseCampaign={togglePauseCampaign}
              isPaused={!targetingState.status}
              className={!isDesktopLayout ? 'mr-12' : null}
            />
          </div>
          {/* BUDGET SETTER */}
          <div>
            <TargetingBudgetSetter
              currency={currencyCode}
              currencyOffset={currencyOffset}
              minBase={minBase}
              minHardBudget={minHardBudget}
              initialBudget={initialTargetingState.budget}
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
