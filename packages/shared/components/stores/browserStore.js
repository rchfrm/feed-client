import create from 'zustand'

import tailwindConfig from '~/tailwind.config'

// GET BREAKPOINTS
const { theme: { screens } } = tailwindConfig()
// Define object of keyed breakpoints breakpointName: { width }
const breakpointsKeyedByName = Object.entries(screens).reduce((obj, [name, sizeString]) => {
  const size = parseInt(sizeString, 10)
  obj[name] = size
  return obj
}, {})
const breakpointsKeyedBySize = Object.entries(screens).reduce((obj, [name, sizeString]) => {
  const size = parseInt(sizeString, 10)
  obj[size] = name
  return obj
}, {})

// Define array of size integers
const breakpointValues = Object.values(breakpointsKeyedByName).reduce((arr, size) => {
  return [...arr, size]
}, [])

const browserStore = create((set) => ({
  browser: {
    width: 0,
    height: 0,
    breakpoint: '',
    breakpointsKeyedByName,
    breakpointsKeyedBySize,
    device: {},
  },
  setDimensions: (width, height) => {
    set((state) => {
      return { browser: { ...state.browser, width, height } }
    })
  },
  setBreakpoint: (width) => set((state) => {
    // Find largest matching breakpoint
    let largestMatching
    let currentBreakpoint
    for (let i = 0; i < breakpointValues.length; i += 1) {
      currentBreakpoint = breakpointValues[i]
      if (width >= currentBreakpoint) {
        largestMatching = currentBreakpoint
      }
    }
    const breakpoint = breakpointsKeyedBySize[largestMatching]
    return { browser: { ...state.browser, breakpoint } }
  }),
  setDevice: (device) => set((state) =>
    ({ browser: { ...state.browser, device } })),
}))

export default browserStore
