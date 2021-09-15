import React from 'react'

import useAnimateScroll from '@/landing/hooks/useAnimateScroll'

const useScrollToEl = () => {
  // Import animate scroll hook
  const scrollTo = useAnimateScroll()
  // Scroll to el
  const scrollToEl = React.useCallback(({ el, elId, offset = 0, scrollingEl = window }) => {
    const targetEl = el || document.getElementById(elId)
    const elPos = targetEl.offsetTop
    scrollTo({ offset: elPos + offset, scrollingEl })
  }, [scrollTo])

  return scrollToEl
}

export default useScrollToEl
