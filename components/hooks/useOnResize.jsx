import React from 'react'
import debounce from 'lodash/debounce'

const useOnResize = ({ callback = () => {}, throttle = 100, runOnMount = true }) => {
  const isClient = typeof window === 'object'
  const getWindowSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }
  const [windowSize, setWindowSize] = React.useState(getWindowSize())
  React.useEffect(() => {
    const windowSize = getWindowSize()
    // Run initial callback
    if (runOnMount) callback(windowSize)
    // Set initial window size
    setWindowSize(windowSize)
    // Setup listener
    const debouncedCallback = debounce(() => {
      const windowSize = getWindowSize()
      callback(windowSize)
      setWindowSize(windowSize)
    }, throttle)
    window.addEventListener('resize', debouncedCallback, { passive: true })
    // Remove listener
    return () => {
      window.removeEventListener('resize', debouncedCallback, { passive: true })
    }
  }, [])

  const { width, height } = windowSize
  return [width, height]
}

export default useOnResize
