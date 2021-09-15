import useBrowserStore from '@/hooks/useBrowserStore'

/*
* USE EXAMPLE:

  const isDesktopLayout = useBreakpointTest('md')

*/

const useBreakpointTest = (breakpoint) => {
  const { width: windowWidth, breakpointsKeyedByName } = useBrowserStore()
  const breakpointWidth = breakpointsKeyedByName[breakpoint]
  return windowWidth >= breakpointWidth
}

export default useBreakpointTest
