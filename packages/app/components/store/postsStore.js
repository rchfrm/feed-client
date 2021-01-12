import create from 'zustand'

const initialState = {
  togglePromotionGlobal: () => {}, // args: promotionEnabled
  updatePostsWithMissingLinks: () => {}, // args: missingLinkId, defaultLinkId
}

// EXPORT STORE
const usePostsStore = create((set) => ({
  // STATE
  togglePromotionGlobal: initialState.togglePromotionGlobal,
  updatePostsWithMissingLinks: initialState.updatePostsWithMissingLinks,
  // SETTERS
  setTogglePromotionGlobal: (togglePromotionGlobal) => set({ togglePromotionGlobal }),
  setUpdatePostsWithMissingLinks: (updatePostsWithMissingLinks) => set({ updatePostsWithMissingLinks }),
}))

export default usePostsStore
