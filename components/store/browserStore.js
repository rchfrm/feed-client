import create from 'zustand'

import tailwindConfig from '~/tailwind.config'

const { theme: { screens } } = tailwindConfig

const breakpointsKeyed = Object.entries(screens).reduce((obj, [name, sizeString]) => {
  const size = parseInt(sizeString, 0)
  obj[size] = name
  return obj
}, {})

const breakpointValues = Object.keys(breakpointsKeyed).reduce((arr, size) => {
  return [...arr, parseInt(size, 0)]
}, [])

const [useBrowserStore, browserStoreApi] = create(set => ({
  browser: {
    width: 0,
    height: 0,
    breakpoint: '',
  },
  setDimensions: (width, height) => set((state) =>
    ({ browser: { ...state.browser, width, height } })),
  setBreakpoint: (width) => set((state) => {
    // Find largest matching breakpoint
    let largestMatching
    let currentBreakpoint
    for (let i = 0; i < breakpointValues.length; i += 1) {
      currentBreakpoint = breakpointValues[i]
      if (width > currentBreakpoint) {
        largestMatching = currentBreakpoint
      }
    }
    const breakpoint = breakpointsKeyed[largestMatching]
    return { browser: { ...state.browser, breakpoint } }
  }),
  setDevice: (contentType) => set({ contentType }),
  clear: () => set({ content: null, contentType: '' }),
}))

export default [useBrowserStore, browserStoreApi]
