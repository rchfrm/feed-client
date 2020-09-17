import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBrowserStore from '@/hooks/useBrowserStore'

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

  return (
    <section
      ref={budgetRef}
      className={[
        'fixed rounded-dialogue opacity-0',
        'h-20 bg-grey-1',
        className,
      ].join(' ')}
    >
      Budget
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
