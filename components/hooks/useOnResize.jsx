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
    // Run initial callback
    if (runOnMount) callback()
    // Set initial window size
    setWindowSize(getWindowSize())
    // Setup listener
    const debouncedCallback = debounce(() => {
      callback()
      setWindowSize(getWindowSize())
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
