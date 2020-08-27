// FOR DEV
// ---------------------------
export const demoCboState = {
  minAge: 23,
  maxAge: 45,
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
