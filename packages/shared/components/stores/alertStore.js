import create from 'zustand'

/*
  @param {string} copy (the text that appears above the warning)
  @param {node} children (the elements that appear in the alert)
  @param {array<object>} buttons (array of button configs)
  @param {boolean} isOpen
  @param {function} onClose (function to run when closing the modal)
*/

const defaultState = {
  copy: '',
  children: null,
  buttons: [],
  isOpen: false,
  onClose: () => {},
  isIntegrationError: false,
}

const useAlertStore = create((set) => ({
  copy: defaultState.copy,
  children: defaultState.children,
  buttons: defaultState.buttons,
  isOpen: defaultState.isOpen,
  isIntegrationError: defaultState.isIntegrationError,
  setCopy: (copy) => set({ copy }),
  setChildren: (children) => set({ children }),
  setButtons: (buttons) => set({ buttons }),
  setOnClose: (onClose) => set({ onClose }),
  setIsIntegrationError: (isIntegrationError) => set({ isIntegrationError }),
  open: () => set({ isOpen: true }),
  close: (shouldCallOnClose = true) => {
    set((state) => {
      const { onClose = defaultState.onClose } = state
      if (shouldCallOnClose) {
        onClose()
      }
      return { isOpen: false }
    })
  },
}))

export default useAlertStore
