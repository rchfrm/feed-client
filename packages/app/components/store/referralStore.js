import create from 'zustand'
import { setLocalStorage, getLocalStorage } from '@/helpers/utils'
import { testReferralCode } from '@/app/helpers/appServer'

const localStorageKey = 'referrer_code'

const initialState = {
  userReferralCode: '',
  hasValidCode: false, // does the code meet the regex pattern?
  hasTrueCode: false, // Is the code for real?
  usedReferralCode: '', // The code that was used to sign up
}


// Test code is valid (matches regex test)
const validityTest = (code) => {
  const codeRegexLong = /^[A-Z]{5}-[0-9]{4}$/
  const regexTestLong = new RegExp(codeRegexLong)
  const codeRegexShort = /^[A-Z]{2}[0-9]{3}$/
  const regexTestShort = new RegExp(codeRegexShort)
  return code.match(regexTestShort) || code.match(regexTestLong)
}

// Query API if code is valid
const truthTest = async (code, hasValidCode) => {
  if (!hasValidCode) return false
  const { error } = await testReferralCode(code)
  if (error) return false
  return true
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

// Store code in local storage
const storeTrueCode = (code) => {
  setLocalStorage(localStorageKey, code)
}

const getStoredReferrerCode = () => {
  return getLocalStorage(localStorageKey)
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
  clearUsedReferralCode: () => set({
    usedReferralCode: '',
    hasValidCode: false,
    hasTrueCode: false,
  }),
  setHasValidCode: (state) => set({ hasValidCode: state }),
  setHasTrueCode: (state) => set({ hasTrueCode: state }),
  // GETTERS
  storeTrueCode,
  getStoredReferrerCode,
}))

export default useReferralStore
