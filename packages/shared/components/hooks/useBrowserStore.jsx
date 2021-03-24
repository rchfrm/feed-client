import React from 'react'

import browserStore from '@/stores/browserStore'

const useBrowserStore = () => {
  // * Fetch initial state
  const [browser, setBrowser] = React.useState(browserStore.getState().browser)
  // * Update browser when store updates
  // Connect to the store on mount, disconnect on unmount,
  // catch state-changes in a reference
  React.useEffect(() => browserStore.subscribe(
    browser => {
      setBrowser(browser)
    },
    state => state.browser,
  ), [])

  // browser = { width, height, breakpoint, device }
  return browser
}

export default useBrowserStore
