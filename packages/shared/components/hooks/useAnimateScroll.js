import React from 'react'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

const useAnimateScroll = () => {
  // Setup scrolling plugin
  React.useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
  }, [])

  const scrollTo = React.useCallback((offset, scrollingEl = window) => {
    const x = typeof offset === 'object' ? offset.x : null
    const y = typeof offset === 'object' ? offset.y : offset
    const scrollToProps = x ? { x, y } : { y }
    gsap.to(scrollingEl, { duration: 0.3, scrollTo: scrollToProps })
  }, [])

  return scrollTo
}

export default useAnimateScroll
