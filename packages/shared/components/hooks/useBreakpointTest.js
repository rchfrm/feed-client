import useBrowserStore from '@/hooks/useBrowserStore'

const useBreakpointTest = (breakpoint) => {
  const { width: windowWidth, breakpointsKeyedByName } = useBrowserStore()
  const breakpointWidth = breakpointsKeyedByName[breakpoint]
  return windowWidth >= breakpointWidth
}

export default useBreakpointTest
