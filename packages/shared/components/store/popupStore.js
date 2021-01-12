import create from 'zustand'

const defaultState = {
  content: null,
  caption: '',
  contentType: '',
}

const usePopupStore = create(set => ({
  content: defaultState.content,
  caption: defaultState.caption,
  contentType: defaultState.contentType,
  setContent: (content) => set({ content }),
  setCaption: (caption) => set({ caption }),
  setContentType: (contentType) => set({ contentType }),
  clear: () => set(defaultState),
}))

export default usePopupStore
