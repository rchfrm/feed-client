import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBrowserStore from '@/hooks/useBrowserStore'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import Button from '@/elements/Button'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'

const TargetingBudgetDesktop = ({ containerRef, columnRef, className }) => {
  const { width: windowWidth } = useBrowserStore()

  const budgetRef = React.useRef(null)

  // RESIZE AND POSITION
  React.useEffect(() => {
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
  }, [containerRef, columnRef, windowWidth])

  // GET TARGETING CONTEXT
  const {
    budgetFormatted,
    currency,
    minReccBudget,
    disableSaving,
    targetingState,
    updateTargetingBudget,
    saveCampaignSettings,
  } = React.useContext(TargetingContext)

  return (
    <section
      ref={budgetRef}
      className={[
        'fixed rounded-dialogue opacity-0',
        'p-5 bg-grey-1',
        'pb-16',
        className,
      ].join(' ')}
    >
      {/* HEADER */}
      <header className="flex justify-between">
        <TargetingSectionHeader header="Set Budget" />
        <TargetingSectionHeader header={budgetFormatted} />
      </header>
      {/* BUDGET SETTER */}
      <TargetingBudgetSetter
        currency={currency}
        minReccBudget={minReccBudget}
        targetingState={targetingState}
        updateTargetingBudget={updateTargetingBudget}
      />
      {/* SAVE CAMPAIGN BUTTON */}
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
        {disableSaving ? 'Budget is too small' : 'Save Campaign Settings'}
      </Button>
    </section>
  )
}

TargetingBudgetDesktop.propTypes = {
  containerRef: PropTypes.object,
  columnRef: PropTypes.object,
  className: PropTypes.string,
}

TargetingBudgetDesktop.defaultProps = {
  containerRef: {},
  columnRef: {},
  className: null,
}


export default TargetingBudgetDesktop
