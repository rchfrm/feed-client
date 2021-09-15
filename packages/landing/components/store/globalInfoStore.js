import create from 'zustand'
// Built in next.config.js
import globalInfo from '@/tempData/globalInfo.json'

// EXPORT
const useGlobalInfoStore = create((set) => ({
  // STATE
  ...globalInfo,
  // SETTERS
  setState: (state) => set(state),
}))

export default useGlobalInfoStore
