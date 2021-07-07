import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBrowserStore from '@/hooks/useBrowserStore'
import useCombinedRefs from '@/hooks/useCombinedRefs'

import Spinner from '@/elements/Spinner'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingBudgetPauseButton from '@/app/TargetingBudgetPauseButton'
import TargetingCustomBudgetButton from '@/app/TargetingCustomBudgetButton'
import TargetingBudgetButtons from '@/app/TargetingBudgetButtons'

const TargetingBudgetBox = React.forwardRef(({
  isFixed,
  isSummaryVersion,
  containerRef,
  columnRef,
  className,
}, ref) => {
  const { width: windowWidth } = useBrowserStore()

  const elRef = React.useRef(ref)
  const budgetRef = useCombinedRefs(ref, elRef)

  // RESIZE AND POSITION
  React.useEffect(() => {
    if (!isFixed) return
    const { current: containerEl } = containerRef
    const { current: columnEl } = columnRef
    if (!columnEl) return
    const containerProps = containerEl.getBoundingClientRect()
    const columnProps = columnEl.getBoundingClientRect()
    const scrollTop = window.scrollY
    // Calc postiion props
    const gap = columnProps.height
    const left = columnProps.right + gap
    const positionProps = {
      top: containerProps.top + scrollTop,
      left,
      width: containerProps.width - columnProps.width - gap,
      opacity: 1,
    }
    // Set position
    const { current: budgetEl } = budgetRef
    gsap.set(budgetEl, positionProps)
  // eslint-disable-next-line
  }, [isFixed, containerRef, columnRef, windowWidth])

  // GET TARGETING CONTEXT
  const {
    minReccBudget,
    targetingState,
    initialTargetingState,
    updateTargetingBudget,
    saveTargetingSettings,
    togglePauseCampaign,
    disableSaving,
    isFirstTimeUser,
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
      ref={budgetRef}
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
          <div className="flex justify-between mb-6">
            {/* PAUSE OR RESUME SPENDING */}
            <TargetingBudgetPauseButton
              togglePauseCampaign={togglePauseCampaign}
              isPaused={!targetingState.status}
            />
            {/* TOGGLE CUSTOM BUDGET */}
            <TargetingCustomBudgetButton
              className={[
                '',
                '',
              ].join(' ')}
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
              isSummaryVersion={isSummaryVersion}
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
            isFirstTimeUser={isFirstTimeUser}
            budgetSlider={budgetSlider}
          />
        </>
      )}
    </section>
  )
})

TargetingBudgetBox.displayName = 'TargetingBudgetBox'

TargetingBudgetBox.propTypes = {
  isFixed: PropTypes.bool,
  isSummaryVersion: PropTypes.bool,
  containerRef: PropTypes.object,
  columnRef: PropTypes.object,
  className: PropTypes.string,
}

TargetingBudgetBox.defaultProps = {
  isFixed: false,
  isSummaryVersion: false,
  containerRef: {},
  columnRef: {},
  className: null,
}


export default TargetingBudgetBox
