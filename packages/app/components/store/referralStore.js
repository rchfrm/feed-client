import create from 'zustand'

const initialState = {
  userReferralCode: '',
  hasValidCode: false, // does the code meet the regex pattern?
  hasTrueCode: false, // Is the code for real?
  usedReferralCode: '', // The code that was used to sign up
}

// TODO define regex test for valid code
const validityTest = (code) => {
  return code.length > 2
}

// TODO query API if code is valid
const truthTest = async (code, hasValidCode) => {
  if (!hasValidCode) return false
  return new Promise((resolve) => {
    setTimeout(() => {
      const isTrue = code.length > 3
      resolve(isTrue)
    }, 600)
  })
}

const testCodeValidity = (set) => (code) => {
  const hasValidCode = validityTest(code)
  set({ hasValidCode })
  return hasValidCode
}

const testCodeTruth = (set, get) => async (code) => {
  const { hasValidCode } = get()
  const hasTrueCode = await truthTest(code, hasValidCode)
  const usedReferralCode = hasTrueCode ? code : ''
  set({ hasTrueCode, usedReferralCode })
  return hasTrueCode
}

const [useReferralStore] = create((set, get) => ({
  userReferralCode: initialState.userReferralCode,
  usedReferralCode: initialState.usedReferralCode,
  hasValidCode: initialState.hasValidCode,
  hasTrueCode: initialState.hasTrueCode,
  // ACTIONS
  testCodeValidity: (code) => testCodeValidity(set)(code),
  testCodeTruth: (code) => testCodeTruth(set, get)(code),
  // SETTERS
  setUserReferralCode: (userReferralCode) => set({ userReferralCode }),
  setUsedReferralCode: (usedReferralCode) => set({ usedReferralCode }),
  setHasValidCode: (state) => set({ hasValidCode: state }),
  setHasTrueCode: (state) => set({ hasTrueCode: state }),
}))

export default useReferralStore
