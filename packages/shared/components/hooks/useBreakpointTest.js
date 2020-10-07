import useBrowserStore from '@/hooks/useBrowserStore'

/*
* USE EXAMPLE:

  const isDesktopLayout = useBreakpointTest('md')

*/

const useBreakpointTest = (breakpoint) => {
  const { breakpointsKeyedByName } = useBrowserStore()
  const breakpointWidth = breakpointsKeyedByName[breakpoint]
  return window.matchMedia(`(min-width: ${breakpointWidth}px)`).matches
}

export default useBreakpointTest
