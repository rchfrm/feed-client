import create from 'zustand'
// Built in next.config.js
// eslint-disable-next-line import/no-unresolved
import globalInfo from '@/landing/tempData/globalInfo.json'

// EXPORT
const useGlobalInfoStore = create((set) => ({
  // STATE
  ...globalInfo,
  // SETTERS
  setState: (state) => set(state),
}))

export default useGlobalInfoStore
