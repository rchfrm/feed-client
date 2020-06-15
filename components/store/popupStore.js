import create from 'zustand'

const [popupStore] = create(set => ({
  content: null,
  contentType: '',
  setContent: (content) => set({ content }),
  setContentType: (contentType) => set({ contentType }),
  clear: () => set({ content: null, contentType: '' }),
}))

export default popupStore
