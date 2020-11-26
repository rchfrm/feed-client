import React from 'react'

import useBrowserStore from '@/hooks/useBrowserStore'

/*
* USE EXAMPLE:

  const isDesktopLayout = useBreakpointTest('md')

*/

const testBreakpoint = (breakpointWidth) => {
  return window.matchMedia(`(min-width: ${breakpointWidth}px)`).matches
}

const useBreakpointTest = (breakpoint) => {
  const isClient = typeof window === 'object'
  const { breakpointsKeyedByName, width } = useBrowserStore()
  const breakpointWidth = breakpointsKeyedByName[breakpoint]
  const [matchesBreakpoint, setMatchesBreakpoint] = React.useState(isClient ? testBreakpoint(breakpointWidth) : false)
  React.useEffect(() => {
    setMatchesBreakpoint(testBreakpoint(breakpointWidth))
  }, [width, breakpointWidth])
  return matchesBreakpoint
}

export default useBreakpointTest
