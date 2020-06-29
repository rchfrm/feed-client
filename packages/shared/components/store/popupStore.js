import create from 'zustand'

const [popupStore] = create(set => ({
  content: null,
  setContent: (content) => set({ content }),
  clear: () => set({ content: null }),
}))

export default popupStore
