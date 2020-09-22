import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBrowserStore from '@/hooks/useBrowserStore'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import Button from '@/elements/Button'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'

const TargetingBudgetDesktop = ({
  isFixed,
  isSummaryVersion,
  containerRef,
  columnRef,
  saveButtonText,
  className,
}) => {
  const { width: windowWidth } = useBrowserStore()

  const budgetRef = React.useRef(null)

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
  }, [isFixed, containerRef, columnRef, windowWidth])

  // GET TARGETING CONTEXT
  const {
    currency,
    minReccBudget,
    minHardBudget,
    disableSaving,
    targetingState,
    initialTargetingState,
    updateTargetingBudget,
    saveCampaignSettings,
  } = React.useContext(TargetingContext)

  return (
    <section
      ref={budgetRef}
      className={[
        isFixed ? 'fixed opacity-0' : 'relative',
        isSummaryVersion ? 'rounded-dialogue' : null,
        isSummaryVersion ? 'p-5 bg-grey-1' : null,
        isSummaryVersion ? 'pb-16' : null,
        className,
      ].join(' ')}
    >
      {/* HEADER */}
      {!isSummaryVersion && (
        <header className="flex justify-between">
          <TargetingSectionHeader header="Budget" />
          {/* <TargetingSectionHeader header={budgetFormatted} /> */}
        </header>
      )}
      {/* BUDGET SETTER */}
      <TargetingBudgetSetter
        isSummaryVersion={isSummaryVersion}
        currency={currency}
        minReccBudget={minReccBudget}
        minHardBudget={minHardBudget}
        initialBudget={initialTargetingState.budget}
        targetingState={targetingState}
        updateTargetingBudget={updateTargetingBudget}
      />
      {/* SAVE CAMPAIGN BUTTON */}
      {isSummaryVersion && (
        <Button
          version="green"
          className={[
            'absolute bottom-0 left-0',
            'rounded-t-none',
            'w-full',
            'border-white border-solid',
            disableSaving ? 'border-r-0 border-l-0 border-b-0 border-t-2' : 'border-0',
          ].join(' ')}
          onClick={() => saveCampaignSettings(targetingState)}
          disabled={disableSaving}
        >
          {disableSaving ? 'Budget is too small' : saveButtonText}
        </Button>
      )}
    </section>
  )
}

TargetingBudgetDesktop.propTypes = {
  isFixed: PropTypes.bool,
  isSummaryVersion: PropTypes.bool,
  containerRef: PropTypes.object,
  columnRef: PropTypes.object,
  saveButtonText: PropTypes.string,
  className: PropTypes.string,
}

TargetingBudgetDesktop.defaultProps = {
  isFixed: false,
  isSummaryVersion: false,
  containerRef: {},
  columnRef: {},
  saveButtonText: 'Save Campaign Settings',
  className: null,
}


export default TargetingBudgetDesktop
