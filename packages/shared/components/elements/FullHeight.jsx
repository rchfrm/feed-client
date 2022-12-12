import React from 'react'
import PropTypes from 'prop-types'

import useBrowserStore from '@/hooks/useBrowserStore'
import useCombinedRefs from '@/hooks/useCombinedRefs'

const FullHeight = React.forwardRef(({ id, className, heightPercent, Element, children }, ref) => {
  const elRef = React.useRef(ref)
  const containerRef = useCombinedRefs(ref, elRef)
  // Resize
  const { height: windowHeight } = useBrowserStore()
  const animationFrame = React.useRef()
  React.useEffect(() => {
    const { current: containerEl } = containerRef
    if (! windowHeight || ! containerEl) return
    const height = windowHeight * (heightPercent / 100)
    animationFrame.current = window.requestAnimationFrame(() => {
      containerEl.style.height = `${height}px`
    })
    // Tidy up
    return () => window.cancelAnimationFrame(animationFrame.current)
  }, [windowHeight, heightPercent, containerRef])

  return (
    <Element
      id={id}
      className={className}
      ref={containerRef}
    >
      {children}
    </Element>
  )
})

FullHeight.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  heightPercent: PropTypes.number,
  Element: PropTypes.string,
  children: PropTypes.node,
}

FullHeight.defaultProps = {
  id: '',
  className: '',
  heightPercent: 100,
  Element: 'div',
  children: <></>,
}

FullHeight.displayName = 'FullHeight'

export default FullHeight
