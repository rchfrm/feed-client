import React from 'react'
import debounce from 'lodash/debounce'

const getWindowSize = () => {
  return {
    width: document.documentElement.clientWidth,
    height: window.innerHeight,
  }
}

const useOnResize = (throttle = 100) => {
  const isClient = typeof window === 'object'
  const [windowSize, setWindowSize] = React.useState(isClient ? getWindowSize() : 0)
  React.useEffect(() => {
    const windowSize = getWindowSize()
    // Set initial window size
    setWindowSize(windowSize)
    // Setup listener
    const debouncedCallback = debounce(() => {
      const windowSize = getWindowSize()
      setWindowSize(windowSize)
    }, throttle)
    window.addEventListener('resize', debouncedCallback, { passive: true })
    // Remove listener
    return () => {
      window.removeEventListener('resize', debouncedCallback, { passive: true })
      debouncedCallback.cancel()
    }
  }, [throttle])

  return windowSize
}

export default useOnResize
