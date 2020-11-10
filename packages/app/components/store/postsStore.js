import create from 'zustand'

const initialState = {
  togglePromotionGlobal: () => {},
}

// EXPORT STORE
const [postsStore] = create((set) => ({
  // STATE
  togglePromotionGlobal: initialState.togglePromotionGlobal,
  // SETTERS
  setTogglePromotionGlobal: (togglePromotionGlobal) => set({ togglePromotionGlobal }),
}))

export default postsStore
