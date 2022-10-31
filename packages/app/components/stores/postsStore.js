import create from 'zustand'

const initialState = {
  updatePostsWithMissingLinks: () => {}, // args: missingLinkId, defaultLinkId
}

// EXPORT STORE
const usePostsStore = create((set) => ({
  updatePostsWithMissingLinks: initialState.updatePostsWithMissingLinks,
  setUpdatePostsWithMissingLinks: (updatePostsWithMissingLinks) => set({ updatePostsWithMissingLinks }),
}))

export default usePostsStore
