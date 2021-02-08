import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBrowserStore from '@/hooks/useBrowserStore'
import useCombinedRefs from '@/hooks/useCombinedRefs'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingCustomBudgetButton from '@/app/TargetingCustomBudgetButton'

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
  } = React.useContext(TargetingContext)

  // ARTIST context
  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        smallestUnit: {
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
        isFixed ? 'fixed opacity-0' : 'relative',
        'rounded-dialogue',
        'p-4 sm:p-5 bg-grey-1',
        isSummaryVersion ? 'pt-14 sm:pt-14' : null,
        className,
      ].join(' ')}
    >
      {/* HEADER */}
      {!isSummaryVersion && (
        <header className="flex justify-between mb-3">
          <TargetingSectionHeader header="Daily Budget" />
        </header>
      )}
      {/* TOGGLE CUSTOM BUDGET */}
      <TargetingCustomBudgetButton
        className={[
          'absolute top-0 right-0',
          'mr-6 sm:mr-7 mt-5',
        ].join(' ')}
        style={{ zIndex: 2 }}
        showCustomBudget={showCustomBudget}
        setShowCustomBudget={setShowCustomBudget}
        initialBudget={initialTargetingState.budget}
        minBase={minBase}
        minHardBudget={minHardBudget}
      />
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
        />
      </div>
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
