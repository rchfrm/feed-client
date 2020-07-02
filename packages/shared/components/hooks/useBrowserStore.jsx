import React from 'react'

import browserStore from '@/store/browserStore'

const useBrowserStore = () => {
  const [, browserStoreApi] = browserStore
  // Fetch initial state
  const [browser, setBrowser] = React.useState(browserStoreApi.getState().browser)
  // Update browser when store updates
  React.useEffect(() => {
    const unsub = browserStoreApi.subscribe(({ browser }) => {
      setBrowser(browser)
    })
    return unsub
  }, [browserStoreApi, setBrowser])

  // * browser = { width, height, breakpoint, device }
  return browser
}

export default useBrowserStore
