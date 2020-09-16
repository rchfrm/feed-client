import React from 'react'
import PropTypes from 'prop-types'

import useBrowserStore from '@/hooks/useBrowserStore'

const TargetingBudgetDesktop = ({ anchorRef, className }) => {
  const positionProps = React.useRef(null)
  const { width: windowWidth } = useBrowserStore()
  React.useEffect(() => {
    const { current: anchorEl } = anchorRef
    if (!anchorEl) return
    const anchorProps = anchorEl.getBoundingClientRect()
    const scrollTop = window.scrollY
    // Calc postiion props
    const positionProps = {
      top: anchorProps.top + scrollTop,
    }
    positionProps.current = positionProps
  }, [anchorRef, windowWidth])
  return (
    <section
      className={[
        'fixed t-0 r-0',
        'h-20 bg-grey-1',
        className,
      ].join(' ')}
    >
      Budget
    </section>
  )
}

TargetingBudgetDesktop.propTypes = {
  anchorRef: PropTypes.object,
  className: PropTypes.string,
}

TargetingBudgetDesktop.defaultProps = {
  anchorRef: {},
  className: null,
}


export default TargetingBudgetDesktop
