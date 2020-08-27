// FOR DEV
// ---------------------------
export const demoCboState = {
  minAge: 23,
  maxAge: 45,
  budget: 3,
  minBudget: 2,
}

export const setCboState = (oldState, newState) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const state = {
        ...oldState,
        ...newState,
      }
      resolve(state)
    }, 500)
  })
}
