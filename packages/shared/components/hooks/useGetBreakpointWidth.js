import useBrowserStore from '@/hooks/useBrowserStore'

/*
* Get width of a given breakpoint
* USE EXAMPLE:

  const breakpointWidth = useGetBreakpointWidth('md') // returns 992

*/

const useGetBreakpointWidth = (breakpointName) => {
  const { breakpointsKeyedByName } = useBrowserStore()
  const breakpointWidth = breakpointsKeyedByName[breakpointName]
  return breakpointWidth
}

export default useGetBreakpointWidth
