import React from 'react'

import browserStore from '@/store/browserStore'
import useOnResize from '@/hooks/useOnResize'

const BrowserStoreSetup = () => {
  const [useBrowserStore, browserStoreApi] = browserStore
  const setDimensions = useBrowserStore(state => state.setDimensions)
  const setBreakpoint = useBrowserStore(state => state.setBreakpoint)
  const { width, height } = useOnResize()
  React.useEffect(() => {
    setDimensions(width, height)
    setBreakpoint(width)
  }, [width, height, setDimensions, setBreakpoint])
  // Fetch initial state
  // const browser = React.useRef(browserStoreApi.getState().browser)
  React.useEffect(() => {
    browserStoreApi.subscribe(({ browser }) => console.log('browser', browser))
  }, [browserStoreApi])
  return null
}


export default BrowserStoreSetup
