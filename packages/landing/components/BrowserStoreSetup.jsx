import React from 'react'

import {
  isMobile,
  isTablet,
  isIOS,
  browserName,
  isWindows,
  isMacOs,
} from 'react-device-detect'

import shallow from 'zustand/shallow'

import useBrowserStore from '@/store/browserStore'
import useOnResize from '@/hooks/useOnResize'

const getBrowserStore = (state) => ({
  setDevice: state.setDevice,
  setDimensions: state.setDimensions,
  setBreakpoint: state.setBreakpoint,
})

const BrowserStoreSetup = () => {
  const {
    setDevice,
    setDimensions,
    setBreakpoint,
  } = useBrowserStore(getBrowserStore, shallow)
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
