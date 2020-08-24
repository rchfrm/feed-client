import React from 'react'
import {
  isMobile,
  isTablet,
  isIOS,
  browserName,
  isWindows,
  isMacOs,
} from 'react-device-detect'

import browserStore from '@/store/browserStore'
import useOnResize from '@/hooks/useOnResize'

const BrowserStoreSetup = () => {
  const [useBrowserStore] = browserStore
  const setDevice = useBrowserStore(state => state.setDevice)
  const setDimensions = useBrowserStore(state => state.setDimensions)
  const setBreakpoint = useBrowserStore(state => state.setBreakpoint)
  const { width, height } = useOnResize()
  // Set device info on mount
  React.useEffect(() => {
    setDevice({
      isMobile,
      isTablet,
      isIOS,
      browserName,
      isWindows,
      isMacOs,
      isDevice: isMobile || isTablet,
    })
  }, [setDevice])
  // Update dimensions on resize
  React.useEffect(() => {
    setDimensions(width, height)
    setBreakpoint(width)
  }, [width, height, setDimensions, setBreakpoint])
  // No render
  return null
}

export default BrowserStoreSetup
